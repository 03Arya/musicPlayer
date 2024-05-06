"use client"

import { PulseOutline } from 'react-ionicons'
import { MicOutline } from 'react-ionicons'
import { ContrastOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'

export default function Footer() {
    return (
        <footer className="grid grid-cols-4">
            <PulseOutline />
            <MicOutline />
            <ContrastOutline />
            <SettingsOutline />
        </footer>
    )
}