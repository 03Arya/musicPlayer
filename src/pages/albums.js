import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
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
                console.log(data);

            }
        }
        fetchData();
    }, []);


    return (
        <main className="dark:bg-purple transition duration-500 mx-auto max-w-lg">
            <Header />
            <div className="max-w-lg mx-5 py-4">
                <h1 className="max-w-xs mx-auto font-bold text-3xl Gradient">All Albums</h1>
            </div>
            <section>
                <div className="max-w-lg mx-5 grid grid-cols-2 py-6">
                    <p className="dark:text-white transition duration-500 font-bold">Featured Albums</p>
                    <Link href="" className="text-end text-pink-600">View All</Link>
                </div>
                <div className="flex gap-4 flex-row overflow-x-auto no-scrollbar mx-5 pb-6">
                    {albums.map(album => (
                        <div className="" key={album.id}>
                            <button>
                            <img className="rounded-md w-40 h-40 max-w-40 mx-auto grid justify-center left-0 right-0" src={album.images[0].url} alt={album.name} loading="lazy" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="max-w-lg mx-5 grid grid-cols-2 py-6">
                    <p className="dark:text-white transition duration-500 font-bold">Best Sellers</p>
                    <Link href="" className="text-end text-pink-600">View All</Link>
                </div>
                <div className="flex gap-4 flex-col overflow-x-auto no-scrollbar mx-5 pb-6">
                    {albums.map(album => (
                        <div className="grid grid-cols-3" key={album.id}>
                            <div className="flex gap-3 col-span-2">
                                <img className="rounded-md w-20 h-20 max-w-40 grid justify-start" src={album.images[0].url} alt={album.name} loading="lazy" />
                                <div className="w-40">
                                    <p className="dark:text-white transition duration-500 font-bold text-sm">{album.artists[0].name}</p>
                                    <p className="dark:text-white transition duration-500 text-xs pt-4">{album.name}</p>
                                </div>
                            </div>
                            <p className="text-end text-xs text-gray-500 col-start-3">{album.total_tracks} Songs</p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    )
}