import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';

import { Play } from 'react-ionicons';
import { PlayBack } from 'react-ionicons';
import { PlayForward } from 'react-ionicons';
import { PlaySkipBack } from 'react-ionicons';
import { PlaySkipForward } from 'react-ionicons';

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
        <main className='mx-auto max-w-lg'>
            <Header showSearch={false} />
            <div>
                <audio src=""></audio>
                <img src={song.album.images[0].url} alt={song.name} />
                <div className='mx-auto'>
                    <h1 className='text-center font-bold text-lg'>{song.name}</h1>
                    <p className='text-center text-sm'>{song.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className='mx-auto grid grid-cols-5 gap-2 justify-center max-w-72'>
                    <button className=''>
                        <PlaySkipBack color="black" className='relative left-4' />
                    </button>

                    <button className=''>
                        <PlayBack color="black" className='relative left-4' />
                    </button>

                    <button className='bg-gradient-to-r from-pink-600 to-orange-600 rounded-full w-14 h-14'>
                        <Play color="white" className='relative left-4' />
                    </button>

                    <button className=''>
                        <PlayForward color="black" className='relative left-4' />
                    </button>

                    <button className=''>
                        <PlaySkipForward color="black" className='relative left-4' />
                    </button>
                </div>
            </div>
        </main >
    );
}