import {SongInfoProvider} from "@/contexts";
import {SongInfo} from "./components/SongInfo";

export default function Home() {
  return (
    <SongInfoProvider>
      <main className="flex min-h-svh flex-col items-center justify-center">
        <SongInfo />
      </main>
    </SongInfoProvider>
  );
}
