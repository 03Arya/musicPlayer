// pages/artists/[id].js
import Footer from '@/components/footer';
import Header from '@/components/header';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Artist({ id }) {
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);



    useEffect(() => {
        const fetchArtistAlbums = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const albums = response.data.items;
            setAlbums(albums);
            console.log(albums);

            const tracksPromises = albums.map(album =>
                axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            );

            const tracksResponses = await Promise.all(tracksPromises);
            const tracks = tracksResponses.map(response => response.data.items).flat();
            setTopTracks(tracks);
            console.log(tracks);  
        };
        fetchArtistAlbums();
    }, [id]);



    useEffect(() => {
        const fetchArtist = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setArtist(response.data);
            console.log(response.data);
        };

        fetchArtist();
    }, [id]);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className='dark:bg-purple transition duration-500 mx-auto max-w-lg'>
                <Header />
                <div className=''>
                    <div className='absolute z-10'>
                        <h1 className='text-white font-bold'>{artist.name}</h1>
                    </div>
                    <img className='relative' src={artist.images[0]?.url} alt={artist.name} />
                </div>
                <ul className='mx-auto grid max-w-80 gap-8 pt-5'>
                    {topTracks.map((trackItem, index) => (
                        <li className='grid' key={index}>
                            <div className='grid'>
                                <p className='mx-auto'>{trackItem.name}</p>
                            </div>
                            <audio className='h-10 mx-auto' controls src={trackItem.preview_url}>Your browser does not support the audio element.</audio>
                        </li>
                    ))}
                </ul>

                <Footer />
            </main>
        </>
    );
}

Artist.getInitialProps = ({ query }) => {
    return { id: query.id };
};  