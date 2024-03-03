import {SongInfoProvider} from "@/contexts";
import {SongInfo} from "./components/SongInfo";
import {ArtworkBackground} from "./components/ArtworkBackground";

export default function Home() {
  return (
    <SongInfoProvider>
      <main className="flex min-h-svh flex-col items-center justify-center">
        <ArtworkBackground>
          <SongInfo />
        </ArtworkBackground>
      </main>
    </SongInfoProvider>
  );
}
