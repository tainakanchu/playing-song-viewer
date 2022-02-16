import "./App.css";
import { MarqueeText } from "./components/MarqueeText";
import { useIceCastStats } from "./hooks/useSongInfo";

const App = () => {
  const iceCastStats = useIceCastStats();

  const songInfo = iceCastStats
    ? iceCastStats.icestats.source.artist +
      " - " +
      iceCastStats.icestats.source.title
    : "Wait for a minute";

  return (
    <div className="App">
      <MarqueeText text={songInfo} />
    </div>
  );
};

export default App;
