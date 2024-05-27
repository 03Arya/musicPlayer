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
                <div>
                    <h1>{playlist.name}</h1>
                    <ul>
                        {tracks.map((trackItem, index) => (
                            <li key={index}>
                                <p>{trackItem.track.name}</p> by {trackItem.track.artists.map((artist, index, array) => (
                                    <span key={index}>
                                        <Link href={`/artists/${artist.id}`}>
                                            <p>{artist.name}</p>
                                        </Link>
                                        {index < array.length - 1 && ', '}
                                    </span>
                                ))}
                                {isPremium ? (
                                    <iframe src={`https://open.spotify.com/embed/track/${trackItem.track.id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                ) : (
                                    <audio controls src={trackItem.track.preview_url}>Your browser does not support the audio element.</audio>
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