import Login from "@/components/login";
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            router.push('/featured');
        }
    }, []);
    
  return (
    <main className="px-6 mx-auto max-w-lg">
      <h1 className="font-bold text-3xl pt-6">Log In</h1>
      <Login />
    </main>
  );
}
