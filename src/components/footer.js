"use client"

import Link from 'next/link'

import { PulseOutline } from 'react-ionicons'
import { MicOutline } from 'react-ionicons'
import { ContrastOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'
import { RadioOutline } from 'react-ionicons'
import useDarkMode from '@/hooks/useDarkmode'

export default function Footer() {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <footer className="dark:bg-purple grid grid-cols-5 mx-auto fixed bottom-0 bg-white w-screen max-w-lg py-4">
            <Link className='mx-auto pt-2' href="/albums">
                <PulseOutline className="mx-auto" />
            </Link>
            <a className='mx-auto pt-2' href="">
                <MicOutline className="mx-auto" />
            </a>
            <div className='bg-gradient-to-r from-pink-600 to-orange-600 justify-center grid rounded-full mx-auto h-10 w-10'>
                <Link className='mx-auto pt-2' href="/featured">
                    <RadioOutline color="white" className="mx-auto" />
                </Link>
            </div>

            <button onClick={toggleTheme} className='mx-auto' href="">
                <ContrastOutline className="mx-auto" />
            </button>
            <Link className='mx-auto pt-2' href="/categories">
                <SettingsOutline className="mx-auto" />
            </Link>
        </footer>
    )
}