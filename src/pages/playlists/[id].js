// Playlist.js
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/router';
import useSpotify from '@/hooks/useSpotify';
import Link from 'next/link';

export default function Playlist() {
    const router = useRouter();
    const { id } = router.query;
    const { playlist, tracks, isPremium } = useSpotify(id);

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="mx-auto max-w-lg">
                <Header />
                <div className=''>
                    <img className='mx-auto' src={playlist.images[0].url} alt={playlist.name} width="200px" height="200px" />
                    <h1 className='text-center font-bold text-xl max-w-64 py-4 mx-auto'>{playlist.name}</h1>
                    <ul className='mx-auto grid max-w-96 gap-8'>
                        {tracks.map((trackItem, index) => (
                            <li className='grid' key={index}>
                                <div className='grid'>
                                    <p className='mx-auto'>{trackItem.track.name}</p>{trackItem.track.artists.map((artist, index, array) => (
                                        <span key={index}>
                                            <Link href={`/artists/${artist.id}`}>
                                                <p>{artist.name}</p>
                                            </Link>
                                        </span>
                                    ))}
                                </div>
                                {isPremium ? (
                                    <iframe src={`https://open.spotify.com/embed/track/${trackItem.track.id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                ) : (
                                    <audio className='h-10' controls src={trackItem.track.preview_url}>Your browser does not support the audio element.</audio>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <Footer />
            </main>
        </>
    );
}