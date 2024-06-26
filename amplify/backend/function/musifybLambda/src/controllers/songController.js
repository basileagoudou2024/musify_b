const asyncHandler = require("express-async-handler");
const {graphQLQuery} = require("../helpers/graphQLQuery");

const executeQuery = async (query, dataObject, variables, req, res) => {
    console.log(req.query)
    const response = await graphQLQuery(
        query, variables,
    );


    if (response.data.errors) {
        console.log(response.data.errors);

        return res.json({
            errors: response.data.errors
        })
    }
    console.log(response.data.data)
    res.json({
        data: response.data.data[dataObject],
        body: req.body
    });
}

exports.song_detail = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `query GetSong($id: ID!){
  getSong(id: $id) {
    artist
    duration
    id
    releaseDate
    title
    createdAt
    owner
  }
}`,
        "getSong",
        {id: req.params.id},
        req, res);

});



 //Handle message create on POST.

exports.song_create = asyncHandler(async (req, res, next) => {
    await executeQuery(`mutation CreateSong($title: String!, $artist: String!, $duration: Int!, $releaseDate: AWSDateTime!, $owner: String!) {
      createSong(input: {title: $title, artist: $artist, duration: $duration, releaseDate: $releaseDate, owner: $owner}) {
        id,
        title,
        artist,
        duration,
        releaseDate,
        owner
      }
    }`,  "createSong",
        {
            title: req.body.title,
            artist: req.body.artist,
            duration: req.body.duration,
            releaseDate: req.body.releaseDate,
            owner: req.body.owner
        }, req, res)
});

//exports.song_list = asyncHandler(async (req, res, next) => {
//    await executeQuery(`query ListSongs($artist: String!){
//      listSongs(filter: {{artist: {eq: $artist}}}) {
//        items {
//          createdAt
//          id
//          title
//          artist
//          updatedAt
//          duration
//          releaseDate
//        }
//      }
//    }
//    `,  "listSongs", {...req.query}, req, res)
//})

 exports.song_list = asyncHandler(async (req, res, next) => {
     await executeQuery(`query GetSong {
          listSongs {
            items {
            artist
            createdAt
            duration
            id
            releaseDate
            title
            updatedAt
            owner
    }
  }
}`,  "listSongs", {}, req, res)
 });


exports.message_create = asyncHandler(async (req, res, next) => {
    await executeQuery(`mutation CreateMessage($input: CreateMessageInput!) {
      createMessage(input: $input) {
        id
        message
        name
        userId1
        userId2
        username1
        username2
      }
    }`,  "createMessage",
        {
            input: req.body
        }, req, res)
});
//       listMessages {
//         items {
//           createdAt
//           id
//           message
//           name
//           updatedAt
//           userId1
//           userId2
//           username1
//           username2
//         }
//       }
//     }
//     `,  "listMessages", {}, req, res)
// })

exports.song_update = asyncHandler(async (req, res, next) => {
    const songId = req.params.id;
    const owner = req.user.owner;  // Assurez-vous que req.user.username contient le nom d'utilisateur authentifié

    // Query to get the song details
    const getSongQuery = `
      query GetSong($id: ID!) {
        getSong(id: $id) {
          id
          owner
        }
      }
    `;

    // Execute the query to get the song details
    const songData = await executeQuery(getSongQuery, "getSong", { id: songId });

    // Check if the song exists
    if (!songData || !songData.data || !songData.data.getSong) {
        return res.status(404).json({ message: 'Song not found' });
    }

    const song = songData.data.getSong;

    // Check if the authenticated user is the owner of the song
    if (song.owner !== owner) {
        return res.status(403).json({ message: 'You are not authorized to update this song' });
    }

    // Mutation to update the song
    const updateSongMutation = `
      mutation UpdateSong($input: UpdateSongInput!) {
        updateSong(input: $input) {
          artist
          title
          duration
          releaseDate
          owner
        }
      }
    `;

    // Execute the mutation to update the song
    const updateResult = await executeQuery(updateSongMutation, "updateSong", {
        input: {
            id: songId,
            ...req.body
        }
    });

    // Return updated song data
    res.status(200).json({ message: 'Song updated successfully', updatedSong: updateResult.data.updateSong });
});

exports.song_delete = asyncHandler(async (req, res, next) => {
    const songId = req.params.id;
    const owner = req.user.owner;  // Assurez-vous que req.user.username contient le nom d'utilisateur authentifié

    // Query to get the song details
    const getSongQuery = `
      query GetSong($id: ID!) {
        getSong(id: $id) {
          id
          owner
        }
      }
    `;

    // Execute the query to get the song details
    const songData = await executeQuery(getSongQuery, "getSong", { id: songId });

    // Check if the song exists
    if (!songData || !songData.data || !songData.data.getSong) {
        return res.status(404).json({ message: 'Song not found' });
    }

    const song = songData.data.getSong;

    // Check if the authenticated user is the owner of the song
    if (song.owner !== owner) {
        return res.status(403).json({ message: 'You are not authorized to delete this song' });
    }

    // Mutation to delete the song
    const deleteSongMutation = `
      mutation DeleteSong($id: ID!) {
        deleteSong(input: {id: $id}) {
          id
        }
      }
    `;

    // Execute the mutation to delete the song
    const deleteResult = await executeQuery(deleteSongMutation, "deleteSong", { id: songId });

    // Return success response
    res.status(200).json({ message: 'Song deleted successfully', id: deleteResult.data.deleteSong.id });
});