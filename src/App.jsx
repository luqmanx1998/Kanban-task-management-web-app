import Board from "./components/Board"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [openSideBar, setOpenSideBar] = useState(true);

  return (
    <div className="font-display min-h-screen overflow-x-scroll flex">
    <Sidebar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar}/>
      <div className="flex-1 flex flex-col">
        <Header openSideBar={openSideBar}/>
        <Board setOpenSideBar={setOpenSideBar} openSideBar={openSideBar}/>
      </div>

    </div>
  )
}

export default App
