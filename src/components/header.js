"use client"

import { ChevronBackOutline } from "react-ionicons"
import { SearchOutline } from "react-ionicons"

export default function Header() {
    return (
        <header className="pt-4">
            <h1 className="font-bold text-3xl py-2">Log in</h1>
            <nav className="grid grid-cols-3">
                <ChevronBackOutline className="" />
                <p className="text-center">Featured</p>
                <SearchOutline className="justify-end grid" />
            </nav>
        </header>
    )
}