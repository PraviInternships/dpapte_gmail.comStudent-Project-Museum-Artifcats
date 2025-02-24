// ArtifactPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtifactPage = ({ match }) => {
    const [artifact, setArtifact] = useState({});
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [audio, setAudio] = useState([]);

    const artifactId = match.params.id;

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/artifacts/${artifactId}`);
                setArtifact(response.data);
                setImages(response.data.multimediaLinks.images);
                setVideos(response.data.multimediaLinks.videos);
                setAudio(response.data.multimediaLinks.audio);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArtifact();
    }, [artifactId]);

    return (
        <div>
            <h1>{artifact.title}</h1>
            <p>{artifact.description}</p>
            <h2>Images</h2>
            <div>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index + 1}`} />
                ))}
            </div>
            <h2>Videos</h2>
            <div>
                {videos.map((video, index) => (
                    <video key={index} controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
            </div>
            <h2>Audio</h2>
            <div>
                {audio.map((audioFile, index) => (
                    <audio key={index} controls>
                        <source src={audioFile} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                ))}
            </div>
        </div>
    );
};

export default ArtifactPage;
