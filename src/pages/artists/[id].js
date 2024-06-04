// pages/artists/[id].js
import Footer from '@/components/footer';
import Header from '@/components/header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlayOutline } from 'react-ionicons';

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
                        <h1 className='text-white font-bold text-3xl pl-5 pt-10'>{artist.name}</h1>
                    </div>
                    <img className='relative mx-auto' src={artist.images[0]?.url} alt={artist.name} />
                </div>
                <p className='dark:text-white transition duration-500 mx-5 pt-5 font-bold'>All Songs</p>
                <ul className='grid mx-5 gap-8 pt-5'>
                    {topTracks.map((trackItem, index) => {
                        const minutes = Math.floor(trackItem.duration_ms / 60000);
                        const seconds = ((trackItem.duration_ms % 60000) / 1000).toFixed(0);
                        return (
                            <li className='grid' key={index}>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2 flex gap-3 w-72'>
                                        <div className='bg-gradient-to-r from-pink-600 to-orange-600 rounded-full w-10 h-10 my-auto'>
                                            <PlayOutline color="white" className='relative left-2.5 top-2' />
                                        </div>
                                        <div className='col-start-2'>
                                            <p className='dark:text-white transition duration-500 text-sm font-bold w-44'>{trackItem.name}</p>
                                            <p className='text-xs text-gray-500'>{artist.name}</p>
                                        </div>
                                    </div>
                                    <p className='col-start-3 justify-end grid text-gray-500'>{minutes} : {seconds < 10 ? '0' : ''}{seconds}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>

                <Footer />
            </main>
        </>
    );
}

Artist.getInitialProps = ({ query }) => {
    return { id: query.id };
};  