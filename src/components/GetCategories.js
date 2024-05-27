import { useEffect, useState } from "react";
import { EllipsisHorizontal } from "react-ionicons";
import { ChevronForwardOutline } from "react-ionicons"
import Link from "next/link";

export default function GetCategories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch("https://api.spotify.com/v1/browse/categories", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setCategories(data.categories.items);
        }
        fetchData();
    }, []);

    const fetchPlaylists = async (categoryId) => {
        if (categoryId === selectedCategory) {
            setSelectedCategory(null);
            setPlaylists([]);
        } else {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setPlaylists(data.playlists.items);
            setSelectedCategory(categoryId);
        }
    }

    return (
        <>
            <section className="grid gap-2 px-2">
                {categories.map(category => (
                    <div className="max-w-80 mx-auto w-80" key={category.id}>
                        <p className="max-w-80 mx-auto bg-pink-600 rounded-md font-bold text-white py-6 pl-6 grid grid-cols-2 grid-rows-1" onClick={() => fetchPlaylists(category.id)}>{category.name}<EllipsisHorizontal color="white" className="mx-auto pl-10" /></p>
                        <div className="px-6 gap-2 grid">
                            {selectedCategory === category.id && playlists.map(playlist => (
                                <div className="grid grid-cols-2 my-2" key={playlist.id}>
                                    <Link className="w-64 text-sm" href={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                                    <ChevronForwardOutline className="justify-end grid" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}