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
            console.log(data)
            if (data.albums) {
                setAlbums(data.albums.items);
            }
        }
        fetchData();
    }, []);

    return (
        <section className="grid grid-cols-1 gap-8 mx-auto max-w-xs">
            {albums.map(album => (
                <div className="h-96 w-full shadow-xl shadow-slate-500/50" key={album.id}>
                    <img className="h-96 absolute rounded-md mx-auto grid justify-center left-0 right-0" src={album.images[0].url} alt={album.name} width="325px" />
                    <div className="relative text-xl font-bold pt-64 pl-6 Gradient">
                        <p className="">{album.name}</p>
                        <p>Soundtrack</p>
                    </div>
                </div>
            ))}
        </section>
    )
}