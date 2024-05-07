import Image from "next/image";
import Login from "@/components/login";
import "./globals.css"
import "../styles/login.css"
import "../styles/footer.css"
import Footer from "@/components/footer";
import Header from "@/components/header";


export default function Home() {
  return (
    <main className="px-6">
      <Header />
      <Login />
      <Footer />
    </main>
  );
}
