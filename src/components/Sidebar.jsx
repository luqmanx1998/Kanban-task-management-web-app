import { useEffect, useState } from "react";
import darkLogo from "../assets/logo-dark.svg";
import lightLogo from "../assets/logo-light.svg";
import DropdownItem from "./DropdownItem";
import AddEditBoardModal from "./AddEditBoardModal";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import hideSideBarIcon from "../assets/icon-hide-sidebar.svg";
import { toggleDarkMode } from "../darkmode/theme";
import { useSelector } from "react-redux";
import { selectBoardData } from "../redux/boardSlice";

function Sidebar({setOpenSideBar, openSideBar}) {
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const {boards} = useSelector(selectBoardData);
  
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      setIsDarkMode(storedTheme === "dark");
    }, []);

  return (
    <>
    <aside className={`hidden md:flex md:flex-col py-8 ${openSideBar ? "pr-6.5" : "pr-0"} min-h-[calc(100vh+150px)] dark:bg-custom-darkgrey transition-all duration-300 ${openSideBar ? "w-[260px] xl:w-[302px]" : "w-0"}`}>
        <img className="dark:hidden h-[25px] w-[152px] ml-6.5 mb-[54px]" src={darkLogo} alt="Kanban dark logo" />
        <img className="hidden dark:block h-[25px] w-[152px] ml-6.5 mb-[54px]" src={lightLogo} alt="Kanban light logo" />
        <div className={`flex-1 overflow-y-auto transition-opacity duration-300 ${openSideBar ? "opacity-100 w-full" : "w-0 opacity-0 pointer-events-none"}`}> 
          <p className="uppercase body-md text-custom-mediumgrey pl-6 xl:pl-8 mb-[19px]">All boards ({boards.length})</p>
          <DropdownItem />
          <div className="flex items-center heading-md text-custom-mainpurple gap-3 pl-6 xl:pl-8 py-[14.5px] rounded-r-full cursor-pointer hover:scale-110 transition-scale duration-200">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#635FC7"/></svg>
            <span onClick={() => setBoardModalIsOpen(true)}>+ Create New Board</span>
            </div>
        </div>
        <div className={`ml-[13px] xl:ml-6 mt-auto xl:w-[251px] flex justify-center items-center bg-custom-lightgrey rounded-md py-[14px] gap-6 dark:bg-custom-verydarkgrey transition-all duration-300 overflow-hidden ${openSideBar ? "opacity-100 w-full" : "w-0 opacity-0 pointer-events-none"}`}>
                        <img src={lightIcon} alt="light mode icon" />
                        <label className="w-10 h-5 bg-custom-mainpurple hover:bg-custom-mainpurple-hover rounded-xl relative cursor-pointer transition-colors duration-300" htmlFor="Togglebar">
                            <input className="hidden peer" type="checkbox" name="Togglebar" id="Togglebar"
                            checked={isDarkMode}
                            onChange={() => {
                            const newTheme = toggleDarkMode();
                            setIsDarkMode(newTheme === "dark")}} />
                            <span className="w-3.5 h-3.5 bg-custom-white rounded-full absolute top-[3px] left-[3px] transition-all duration-300 peer-checked:translate-x-5" />
                        </label>
                        <img src={darkIcon} alt="dark mode icon" />
                    </div>
                    <div onClick={() => setOpenSideBar(false)} className={`group pl-6 flex mt-4 xl:mt-2 gap-2.5 hover:bg-[#635FC7]/25 dark:hover:bg-custom-white py-[14.5px] rounded-r-full cursor-pointer transition-all duration-300 ${openSideBar ? "opacity-100 w-full" : "w-0 opacity-0 pointer-events-none"}`}>
                        <img src={hideSideBarIcon} alt="hide sidebar icon" />
                        <p className="heading-md text-custom-mediumgrey group-hover:text-custom-mainpurple">Hide Sidebar</p>
                    </div>
    </aside>
    {boardModalIsOpen && <AddEditBoardModal setBoardModalIsOpen={setBoardModalIsOpen}/>}
    </>
  )
}

export default Sidebar
