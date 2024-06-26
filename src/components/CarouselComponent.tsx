import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent: React.FC = () => {
    return (
        <Carousel
            autoPlay    // Active le défilement automatique
            infiniteLoop // Active le défilement en boucle
            interval={1000} // Définit l'intervalle de défilement en millisecondes (3 secondes ici)
            showThumbs={false} // Masque les miniatures
            showStatus={false} // Masque le statut de l'image actuelle
        >
            <div>
                <img src="/images/image1.jpg" height="600px" alt="First slide" /> {/* Assurez-vous que l'extension est correcte */}
                <p className="legend">First Slide</p>
            </div>

            <div>
                <img src="/images/image2.jpg" alt="Second slide" />
                <p className="legend">Second Slide</p>
            </div>

            <div>
                <img src="/images/image3.jpg" alt="Third slide" />
                <p className="legend">Third Slide</p>
            </div>
        </Carousel>
    );
};

export default CarouselComponent;