"use client"

import { PulseOutline } from 'react-ionicons'
import { MicOutline } from 'react-ionicons'
import { ContrastOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'
import { RadioOutline } from 'react-ionicons'

export default function Footer() {
    return (
        <footer className="grid grid-cols-5 mx-auto">
            <PulseOutline className="mx-auto" color="pink to right purple"/>
            <MicOutline className="mx-auto"/>
            <RadioOutline className="mx-auto text-pink-800"/>
            <ContrastOutline className="mx-auto text-pink-200"/>
            <SettingsOutline className="footerIcons"/>
        </footer>
    )
}