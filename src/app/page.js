import Image from "next/image";
import Login from "@/components/login";
import "./globals.css"
import "../styles/login.css"


export default function Home() {
  return (
    <main className="px-6">
                  <header className="pt-4">
                <h1 className="font-bold text-3xl">Log in</h1>
            </header>
      <Login />
    </main>
  );
}
