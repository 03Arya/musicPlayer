"use client"

import { ChevronBackOutline } from "react-ionicons"
import { SearchOutline } from "react-ionicons"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function Header() {
    const router = useRouter();
    const [token, setToken] = useState("")

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        window.location.href = '/'; // Redirect using window.location.href
    }

    // Extract the page name from the URL
    const pageName = router.pathname.split("/").pop();

    return (
        <header className="py-4 mx-auto">
            <nav className="grid grid-cols-3 px-2">
                <button onClick={logout} href="/">
                    <ChevronBackOutline className="" />
                </button>
                <p className="text-center uppercase">{pageName}</p>
                <SearchOutline className="justify-end grid" />
            </nav>
        </header>
    )
}