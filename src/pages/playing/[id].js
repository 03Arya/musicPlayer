import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';

export default function SongPlayer() {
    const router = useRouter();
    const { id } = router.query;

    const [song, setSong] = useState(null);

    useEffect(() => {
        if (id) { // Only run if id is defined
            const fetchSong = async () => {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setSong(response.data);
            };
            console.log(song)
            fetchSong();
        }
    }, [id]);

    if (!song) {
        return <div>Loading...</div>;
    }

    return (

        <main>
            <Header showSearch={false}/>
            <div>
                <audio src=""></audio>
                <h1>{song.name}</h1>
                <p>{song.artists.map(artist => artist.name).join(', ')}</p>
                <img src={song.album.images[0].url} alt={song.name} />
            </div>
        </main>
    );
}