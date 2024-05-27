import NewReleases from "@/components/NewReleases";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Featured() {

    return (
        <main className="dark:bg-black mx-auto max-w-lg">
            <Header />
            <div className="max-w-80 mx-auto py-4">
                <h1 className="max-w-xs mx-auto font-bold text-3xl Gradient">Featured</h1>
            </div>
            <NewReleases />
            <Footer />
        </main>
    );
}