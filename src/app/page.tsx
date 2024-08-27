import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Motus from "@/components/Motus";
import Ranking from "@/components/Ranking";
import { getSession } from "@auth0/nextjs-auth0";

export default async function page() {
  const session = await getSession();

  return (
    <>
      <Hero />
      {session && <Motus />}
      <Ranking />
      <Footer />
    </>
  );
}
