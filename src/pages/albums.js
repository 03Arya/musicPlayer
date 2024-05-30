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
        <main>
            <Header />
            <div>
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