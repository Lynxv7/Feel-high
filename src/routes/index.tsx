import { createFileRoute } from "@tanstack/react-router";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { GlobalPlayer } from "@/components/player/GlobalPlayer";
import { ScrollSoundtrack } from "@/components/player/ScrollSoundtrack";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Sound } from "@/components/sections/Sound";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Live } from "@/components/sections/Live";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PlayerProvider>
      <main className="grain relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <Nav />
        <Hero />
        <Sound />
        <Atmosphere />
        <Live />
        <Process />
        <Contact />
        <Footer />
        <ScrollSoundtrack />
        <GlobalPlayer />
        <div className="h-32" aria-hidden />
      </main>
    </PlayerProvider>
  );
}
