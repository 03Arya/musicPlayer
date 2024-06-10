import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '@/components/header';

import { Play } from 'react-ionicons';
import { Pause } from 'react-ionicons';
import { PlayBack } from 'react-ionicons';
import { PlayForward } from 'react-ionicons';
import { PlaySkipBack } from 'react-ionicons';
import { PlaySkipForward } from 'react-ionicons';

export default function SongPlayer() {
    const router = useRouter();
    const { id } = router.query;

    const [song, setSong] = useState(null);
    const [album, setAlbum] = useState(null);
    const [trackIndex, setTrackIndex] = useState(null);
    const [progress, setProgress] = useState(0); // Progress of the song
    const [isPlaying, setIsPlaying] = useState(false); // Whether the song is playing

    const audioRef = useRef(); // Reference to the audio element

    const playSong = () => {
        const audio = audioRef.current;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true); // Step 3
        } else {
            audio.pause();
            setIsPlaying(false); // Step 3
        }
    };

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

                // Fetch the album
                const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${response.data.album.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setAlbum(albumResponse.data);

                // Find the index of the current track in the album
                const trackIndex = albumResponse.data.tracks.items.findIndex(track => track.id === id);
                setTrackIndex(trackIndex);
            };
            fetchSong();
        }
    }, [id]);

    useEffect(() => {
        if (song) {
            playSong();
        }
    }, [song]);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) { // Only run if audio is defined
            // Update progress every time the currentTime updates
            const updateProgress = () => {
                setProgress((audio.currentTime / audio.duration) * 100);
            };

            audio.addEventListener('timeupdate', updateProgress);

            return () => {
                // Clean up event listener
                audio.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, []);

    const skipForward = () => {
        const audio = audioRef.current;
        audio.currentTime += 10; // Skip forward 10 seconds
    };

    const skipBackward = () => {
        const audio = audioRef.current;
        audio.currentTime -= 10; // Skip backward 10 seconds
    };

    const playNextSong = () => {
        if (album && trackIndex !== null && trackIndex < album.tracks.items.length - 1) {
            // Get the next track
            const nextTrack = album.tracks.items[trackIndex + 1];

            // Navigate to the next track
            router.push(`/playing/${nextTrack.id}`);
        }
    };

    const playPreviousSong = () => {
        if (album && trackIndex !== null && trackIndex > 0) {
            // Get the previous track
            const previousTrack = album.tracks.items[trackIndex - 1];

            // Navigate to the previous track
            router.push(`/playing/${previousTrack.id}`);
        }
    };

    if (!song) {
        return <div>Loading...</div>;
    }
    const minutes = Math.floor(song.duration_ms / 60000);
    const seconds = ((song.duration_ms % 60000) / 1000).toFixed(0);

    return (
        <main className='mx-auto max-w-lg h-screen'>
            <Header showSearch={false} />
            <audio ref={audioRef} src={song.preview_url} hidden></audio>
            <img src={song.album.images[0].url} alt={song.name} />

            <section className='pt-14 bottom-0 mx-auto'>
                <div className='mx-auto'>
                    <h1 className='text-center font-bold text-xl'>{song.name}</h1>
                    <p className='text-center text-sm'>{song.artists.map(artist => artist.name).join(', ')}</p>
                </div>

                <div className='w-80 mx-auto py-4'>
                    <progress className='mx-auto grid w-80 bg-pink-600 h-1' max="100" value={progress}></progress>
                    <div className='grid grid-cols-2'>
                        <p>0:00</p>
                        <p className='text-end'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                    </div>
                </div>

                <div className='mx-auto grid grid-cols-5 gap-2 justify-center max-w-72'>
                    <button onClick={playPreviousSong}>
                        <PlaySkipBack color="black" className='relative left-4' />
                    </button>

                    <button onClick={skipBackward}>
                        <PlayBack color="black" className='relative left-4' />
                    </button>

                    <button className='bg-gradient-to-r from-pink-600 to-orange-600 rounded-full w-14 h-14' onClick={playSong}>
                        {isPlaying ? <Pause color="white" className='relative left-4' /> : <Play color="white" className='relative left-[18px]' />} {/* Step 4 */}
                    </button>

                    <button onClick={skipForward}>
                        <PlayForward color="black" className='relative left-4' />
                    </button>

                    <button onClick={playNextSong}>
                        <PlaySkipForward color="black" className='relative left-4' />
                    </button>
                </div>
            </section>
        </main >
    );
}