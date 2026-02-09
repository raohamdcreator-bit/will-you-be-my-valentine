import { useState } from "react";
import ValentineCard from "./components/ValentineCard";
import FinalYes from "./components/YesScreen";

function App() {
  const [saidYes, setSaidYes] = useState(false);

  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #fbcfe8, #fca5a5)',
    overflow: 'hidden'
  };

  return (
    <div style={appStyle}>
      {!saidYes ? (
        <ValentineCard onYes={() => setSaidYes(true)} />
      ) : (
        <FinalYes />
      )}
    </div>
  );
}

export default App;
