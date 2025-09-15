import { useState } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel.tsx";
import RightPanel from "./components/RightPanel.tsx";
import { Connection } from "./constant/connections";

function App() {
  const [chatSelected,setChatSelected]=useState<Connection | null>(null)

  function handleChatSelect(connection:Connection){
    setChatSelected(connection)
  }
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-row">
        <LeftPanel handleChatSelect={handleChatSelect} chatSelected={chatSelected!}/>
        <RightPanel chatSelected={chatSelected!}/>
      </div>
    </div>
  );
}

export default App;
