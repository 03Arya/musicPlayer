import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

export default function Playlist() {
    const router = useRouter();
    const { id } = router.query;
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const token = localStorage.getItem('token');

                // Fetch the user's account data
                const accountResponse = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                const accountData = await accountResponse.json();

                console.log(accountData); // Moved this line here

                // Check if the user is a Premium user
                setIsPremium(accountData.product === 'premium');

                const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                const data = await response.json();
                setPlaylist(data);

                let tracksData = [];
                let nextTracksUrl = data.tracks.href;
                let retryAfter = 1;

                while (nextTracksUrl) {
                    try {
                        const tracksResponse = await fetch(nextTracksUrl, {
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        });

                        if (tracksResponse.status === 429) {
                            // Too Many Requests - retry after waiting for the time specified in the Retry-After header
                            retryAfter = parseInt(tracksResponse.headers.get('Retry-After'));
                            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                            continue;
                        }

                        const pageData = await tracksResponse.json();
                        tracksData = [...tracksData, ...pageData.items];
                        nextTracksUrl = pageData.next;
                    } catch (error) {
                        console.error('Failed to fetch tracks:', error);
                        break;
                    }
                }

                setTracks(tracksData);
            }
            fetchData();
        }
    }, [id]);

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