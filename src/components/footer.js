"use client"

import { PulseOutline } from 'react-ionicons'
import { MicOutline } from 'react-ionicons'
import { ContrastOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'
import { RadioOutline } from 'react-ionicons'

export default function Footer() {
    return (
        <footer className="grid grid-cols-5 mx-auto fixed bottom-0 bg-white w-screen max-w-lg py-4">
            <PulseOutline className="mx-auto"/>
            <MicOutline className="mx-auto"/>
            <RadioOutline className="mx-auto"/>
            <ContrastOutline className="mx-auto"/>
            <SettingsOutline className="mx-auto"/>
        </footer>
    )
}