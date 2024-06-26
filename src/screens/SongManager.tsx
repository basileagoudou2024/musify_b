import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { listSongs } from '../graphql/queries';
import { createSong, deleteSong, updateSong } from '../graphql/mutations';
import { Song } from "../API";

// Configuration d'Amplify
Amplify.configure(amplifyconfig);

interface FormState {
    id?: string;
    title: string;
    artist: string;
    duration: number;
    releaseDate: string;
    file: File | null;
}

// État initial du formulaire
const initialFormState = { title: '', artist: '', duration: 0, releaseDate: '', file: null };

const SongManager: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

    // Création du client GraphQL
    const client = generateClient({});

    useEffect(() => {
        // Chargement des chansons au montage du composant
        fetchSongs();
    }, []);

    // Fonction pour récupérer les chansons depuis la base de données
    const fetchSongs = async () => {
        try {
            const response = await client.graphql({ query: listSongs });
            setSongs(response.data.listSongs.items);
        } catch (error) {
            console.log('Error fetching songs:', error);
        }
    };

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files) {
            setFormState({ ...formState, file: files[0] });
        } else {
            setFormState({ ...formState, [name]: value });
        }
    };

    // Fonction pour créer ou mettre à jour une chanson
    const handleCreateOrUpdateSong = async () => {
        try {
            if (formState.file) {
                const fileName = `${Date.now()}_${formState.title}.mp3`;

                // Téléchargement du fichier dans S3
                try {
                    const result = await uploadData({
                        path: fileName,
                        data: formState.file,
                    }).result;
                    console.log('Succeeded: ', result);
                } catch (error) {
                    console.log('Error uploading file: ', error);
                }

                // Obtention de l'URL du fichier téléchargé
                const getUrlResult = await getUrl({ path: fileName });
                console.log('Signed URL: ', getUrlResult.url);
                console.log('URL expires at: ', getUrlResult.expiresAt);

                // Préparation de l'objet à envoyer à l'API GraphQL
                const input = {
                    title: formState.title,
                    artist: formState.artist,
                    duration: formState.duration,
                    releaseDate: formState.releaseDate,
                    fileUrl: getUrlResult.url.toString()
                };

                // Mise à jour ou création de la chanson
                if (isUpdateMode && formState.id) {
                    await client.graphql({
                        query: updateSong,
                        variables: { input: { id: formState.id, ...input } }
                    });
                } else {
                    await client.graphql({
                        query: createSong,
                        variables: { input }
                    });
                }

                // Réinitialisation du formulaire et du mode de mise à jour
                setFormState(initialFormState);
                setIsUpdateMode(false);
                fetchSongs();
            }
        } catch (error) {
            console.log(`Error ${isUpdateMode ? 'updating' : 'creating'} song:`, error);
        }
    };

    // Fonction pour éditer une chanson
    const handleEditSong = (song: Song) => {
        setFormState({
            id: song.id,
            title: song.title,
            artist: song.artist,
            duration: song.duration,
            releaseDate: song.releaseDate,
            file: null
        });
        setIsUpdateMode(true);
    };

    // Fonction pour supprimer une chanson
    const handleDeleteSong = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this song?')) {
            try {
                await client.graphql({
                    query: deleteSong,
                    variables: { input: { id } }
                });
                fetchSongs();
            } catch (error) {
                console.log('Error deleting song:', error);
            }
        }
    };

    // Fonction pour jouer une chanson
    const handlePlaySong = async (fileUrl: string) => {
        console.log(`Playing song with URL: ${fileUrl}`);
        setCurrentSongUrl(fileUrl);
    };

    return (
        <div>
            <h2>Song Manager</h2>
            <form onSubmit={e => {
                e.preventDefault();
                handleCreateOrUpdateSong();
            }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formState.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="artist"
                    placeholder="Artist"
                    value={formState.artist}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration"
                    value={formState.duration}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="releaseDate"
                    placeholder="Release Date"
                    value={formState.releaseDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    required={!isUpdateMode}
                />
                <button type="submit">{isUpdateMode ? 'Update Song' : 'Create Song'}</button>
                {isUpdateMode && (
                    <button type="button" onClick={() => { setFormState(initialFormState); setIsUpdateMode(false); }}>
                        Cancel Update
                    </button>
                )}
            </form>
            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        <p>{song.title} by {song.artist}</p>
                        <button onClick={() => handlePlaySong(song.fileUrl)}>Play</button>
                        <button onClick={() => handleEditSong(song)}>Edit</button>
                        <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {currentSongUrl && (
                <audio controls autoPlay>
                    <source src={currentSongUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default SongManager;
