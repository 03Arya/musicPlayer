// Playlist.js
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/router';
import useSpotify from '@/hooks/useSpotify';
import Link from 'next/link';
import { PlayOutline } from 'react-ionicons';

export default function Playlist() {
    const router = useRouter();
    const { id } = router.query;
    const { playlist, tracks, isPremium } = useSpotify(id);

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="dark:bg-purple transition duration-500 mx-auto max-w-lg">
                <Header />
                <div className=''>
                    <h1 className='dark:text-white transition duration-500 font-bold text-3xl max-w-80 mx-auto py-4'>Playlists</h1>
                    <img className='mx-auto pt-5' src={playlist.images[0].url} alt={playlist.name} width="200px" height="200px" />
                    <h2 className='dark:text-white transition duration-500 text-center font-bold text-lg max-w-56 py-4 mx-auto'>{playlist.name}</h2>
                    <ul className='grid mx-5 gap-8 pt-5'>
                        {tracks.map((trackItem, index) => {
                            const minutes = Math.floor(trackItem.track.duration_ms / 60000);
                            const seconds = ((trackItem.track.duration_ms % 60000) / 1000).toFixed(0);
                            return (
                                <li className='grid' key={index}>
                                    <div className='flex gap-3 w-60'>
                                        <div className='bg-gradient-to-r from-pink-600 to-orange-600 rounded-full w-10 h-10 my-auto'>
                                            <PlayOutline color="white" className='relative left-2.5 top-2' />
                                        </div>
                                        <div className='grid'>
                                            <p className='dark:text-white transition duration-500 text-sm font-bold w-44'>{trackItem.track.name}</p>
                                            <span>
                                                <Link href={`/artists/${trackItem.track.artists[0].id}`}>
                                                    <p className='text-xs text-gray-500'>{trackItem.track.artists[0].name}</p>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                    <p className='col-start-3 justify-end grid text-gray-500'>{minutes} : {seconds < 10 ? '0' : ''}{seconds}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <a className="listenAllButton text-pink-700 rounded-full py-3 text-center grid font-bold w-full my-20 max-w-80 mx-auto">LISTEN ALL</a>
                </div>
                <Footer />
            </main>
        </>
    );
}