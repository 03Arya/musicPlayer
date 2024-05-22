"use client"

import { ChevronBackOutline } from "react-ionicons"
import { SearchOutline } from "react-ionicons"
import { useState } from "react"

export default function Header() {
    const [token, setToken] = useState("")

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        window.location.href = '/'; // Redirect using window.location.href
    }
    return (
        <header className="pt-4">
            <nav className="grid grid-cols-3">
                <button onClick={logout} href="/">
                    <ChevronBackOutline className="" />
                </button>
                <p className="text-center">Featured</p>
                <SearchOutline className="justify-end grid" />
            </nav>
        </header>
    )
}