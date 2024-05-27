// pages/artists/[id].js
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Artist({ id }) {
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            const token = localStorage.getItem('spotify_access_token');
            const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setArtist(response.data);
        };

        fetchArtist();
    }, [id]);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{artist.name}</h1>
            <img src={artist.images[0]?.url} alt={artist.name} />
            {/* Add more artist details here */}
        </div>
    );
}

Artist.getInitialProps = ({ query }) => {
    return { id: query.id };
};  