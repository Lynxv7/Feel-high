import { createFileRoute } from "@tanstack/react-router";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { GlobalPlayer } from "@/components/player/GlobalPlayer";
import { ScrollSoundtrack } from "@/components/player/ScrollSoundtrack";
import { AudioUnlockOverlay } from "@/components/player/AudioUnlockOverlay";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Artist } from "@/components/sections/Artist";
import { Sound } from "@/components/sections/Sound";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Process } from "@/components/sections/Process";
import { Live } from "@/components/sections/Live";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PlayerProvider>
      <main className="grain relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <Nav />
        <Hero />
        <Artist />
        <Sound />
        <Atmosphere />
        <Process />
        <Live />
        <Contact />
        <Footer />
        <ScrollSoundtrack />
        <GlobalPlayer />
        <div className="h-[calc(7rem+env(safe-area-inset-bottom))] sm:h-32" aria-hidden />
      </main>
      <AudioUnlockOverlay />
    </PlayerProvider>
  );
}
