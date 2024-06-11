"use client"

import { useEffect, useState } from "react"

export default function Login() {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = ""
            window.localStorage.setItem("token", token)
            window.location.href = '/featured'; 
        }
        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        window.location.href = '/';
    }

    return (
        <div>
            {!token ?
                <a className="loginLink rounded-full py-3 text-center grid font-bold w-full mt-80" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>LOG IN</a>
                : <button onClick={logout}>Logout</button>}
        </div>
    );
}