// Playlist.js
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/router';
import useSpotify from '@/hooks/useSpotify';

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
                                {trackItem.track.name} by {trackItem.track.artists.map(artist => artist.name).join(', ')}
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