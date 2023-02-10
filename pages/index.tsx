import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Showcase from "../components/Showcase";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center py-2 bg-slate-100 font-sans">
      <Head>
        <title>Prompt Image Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Showcase />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
