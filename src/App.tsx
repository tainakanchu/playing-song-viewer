import "./App.css";
import { MarqueeText } from "./components";
import { useSongInfo } from "./hooks";

const App = () => {
  const songInfo = useSongInfo();

  const labelOfMusic = songInfo
    ? songInfo.artist + " - " + songInfo.title
    : "Wait for a minute";

  return (
    <div className="App">
      <MarqueeText text={labelOfMusic} />
    </div>
  );
};

export default App;
