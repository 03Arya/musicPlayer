import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";

export default function Albums() {
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
        <main className="dark:bg-purple transition duration-500 mx-auto max-w-lg">
            <Header />
            <div>
                <div className="max-w-80 mx-auto py-4">
                    <h1 className="max-w-xs mx-auto font-bold text-3xl Gradient">All Albums</h1>
                </div>
                {albums.map(album => (
                    <div className="" key={album.id}>
                        <img className="rounded-md mx-auto grid justify-center left-0 right-0" src={album.images[0].url} alt={album.name} width="130px" height="130px" loading="lazy" />

                    </div>
                ))}
            </div>
            <Footer />
        </main>

    )
}