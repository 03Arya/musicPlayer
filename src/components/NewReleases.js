import { useEffect, useState } from "react";

export default function NewReleases() {
    const [data, setData] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setData(data);
            if (data.albums) {
                setAlbums(data.albums.items);
            }
        }
        fetchData();
    }, []);

    return (
        <section className="grid grid-cols-1 gap-8 mx-auto max-w-xs">
            {albums.map(album => (
                <div className="    w-full shadow-xl shadow-slate-500/50 bg-contain bg-center bg-no-repeat" style={{backgroundImage: `url(${album.images[0].url})`}} key={album.id}>
                    <button className="w-full">
                        <div className="relative pt-72 pl-6 ">
                            <p className="text-white text-xl font-bold text-start">{album.name}</p>
                            <p className="text-gray-300 text-start">Soundtrack</p>
                        </div>
                    </button>
                </div>
            ))}
        </section>
    )
}