import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
   
      router.push("/admin/dashboard");
   
   
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Task-2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600  ">Welcome to Droame </h1>
      </div>
    </div>
  );
};

export default Home;
