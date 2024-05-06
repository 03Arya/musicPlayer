"use client"

import { useEffect, useState } from "react"
import axios from "axios"


export default function App() {
    const CLIENT_ID = "bcb27557f96842b4914445c663b4cb7f"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            console.log(token);

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        setArtists(data.artists.items)
    }


    return (
        <div>
            {!token ?
                <a className="loginLink rounded-full py-3 text-center grid font-bold w-full mt-80" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>LOG IN</a>
                : <button onClick={logout}>Logout</button>}

            {token ?
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>
                : null
            }
            {
                artists.map(artist => (
                    <div key={artist.id}>
                        <h2>{artist.name}</h2>
                        <img src={artist.images[0].url} alt={artist.name} width="100px" height="100px" />
                    </div>
                ))
            }

        </div>
    );
}