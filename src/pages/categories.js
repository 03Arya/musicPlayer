import GetCategories from "@/components/GetCategories";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Playlists() {
    return (
        <main className="dark:bg-black transition duration-500 mx-auto max-w-lg">
            <Header />
            <div className="max-w-80 mx-auto py-4">
                <h1 className="max-w-xs mx-auto font-bold text-3xl Gradient">Categories</h1>
            </div>
            <GetCategories />
            <Footer />
        </main>
    );
}