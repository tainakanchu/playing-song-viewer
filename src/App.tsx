import "./App.css";
import { MarqueeText } from "./components/MarqueeText";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <MarqueeText text="hogefuga" />
      </header>
    </div>
  );
};

export default App;
