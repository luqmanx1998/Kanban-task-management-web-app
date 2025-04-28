import DropdownItem from "./DropdownItem";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { toggleDarkMode } from "../darkmode/theme";
import { useEffect, useState } from "react";

function Dropdown({boards, setBoardModalIsOpen, setDropdownIsOpen}) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()} className="mt-4 bg-custom-white py-4 pr-6 rounded-lg dark:bg-custom-darkgrey transition-colors duration-300">
            <p className="uppercase body-md text-custom-mediumgrey pl-6 mb-[19px]">All boards ({boards.length})</p>
            <DropdownItem />

            <div className="flex items-center heading-md text-custom-mainpurple gap-3 pl-6 pr-17 py-[14.5px] rounded-r-full cursor-pointer"
            onClick={(() =>{
                setDropdownIsOpen(false);
                setBoardModalIsOpen(true);
            })}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#635FC7"/></svg>
            + Create New Board
            </div>
            <div className="ml-6 flex justify-center items-center mt-4 bg-custom-lightgrey rounded-md py-[14px] gap-6 dark:bg-custom-verydarkgrey transition-colors duration-300">
                <img src={lightIcon} alt="light mode icon" />
                <label className="w-10 h-5 bg-custom-mainpurple hover:bg-custom-mainpurple-hover rounded-xl relative cursor-pointer transition-colors duration-300" >
                    <input className="hidden peer" type="checkbox" name="Togglebar" 
                    checked={isDarkMode}
                    onChange={() => {
                    const newTheme = toggleDarkMode();
                    setIsDarkMode(newTheme === "dark")}} />
                    <span className="w-3.5 h-3.5 bg-custom-white rounded-full absolute top-[3px] left-[3px] transition-all duration-300 peer-checked:translate-x-5" />
                </label>
                <img src={darkIcon} alt="dark mode icon" />
            </div>
        </div>
  )
}

export default Dropdown
