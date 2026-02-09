import { useState } from "react";
import ValentineCard from "./components/ValentineCard";
import FinalYes from "./components/YesScreen";

function App() {
  const [saidYes, setSaidYes] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-red-300">
      {!saidYes ? (
        <ValentineCard onYes={() => setSaidYes(true)} />
      ) : (
        <FinalYes />
      )}
    </div>
  );
}

export default App;
