"use client"

import Link from 'next/link'

import { PulseOutline } from 'react-ionicons'
import { MicOutline } from 'react-ionicons'
import { ContrastOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'
import { RadioOutline } from 'react-ionicons'

export default function Footer() {
    return (
        <footer className="grid grid-cols-5 mx-auto fixed bottom-0 bg-white w-screen max-w-lg py-4">
            <a className='mx-auto' href="">
                <PulseOutline className="mx-auto" />
            </a>
            <a className='mx-auto' href="">
                <MicOutline className="mx-auto" />
            </a>
            <Link className='mx-auto' href="/featured">
                <RadioOutline className="mx-auto" />
            </Link>
            <a className='mx-auto' href="">
                <ContrastOutline className="mx-auto" />
            </a>
            <Link className='mx-auto' href="/categories">
                <SettingsOutline className="mx-auto" />
            </Link>
        </footer>
    )
}