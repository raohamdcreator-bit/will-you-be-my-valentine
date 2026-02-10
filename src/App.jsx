import { useEffect, useState } from "react";
import UnlockScreen from "./components/UnlockScreen";
import ValentineExperience from "./components/ValentineExperience";

function App() {
  const [route, setRoute] = useState('loading');

  useEffect(() => {
    const path = window.location.pathname;
    
    if (path === '/valentine') {
      setRoute('valentine');
    } else {
      setRoute('unlock');
    }
  }, []);

  if (route === 'loading') {
    return null;
  }

  if (route === 'valentine') {
    return <ValentineExperience />;
  }

  return <UnlockScreen />;
}

export default App;
