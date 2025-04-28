import logo from "../assets/logo-mobile.svg"
import chevDownLogo from "../assets/icon-chevron-down.svg"
import chevUpLogo from "../assets/icon-chevron-up.svg"
import ellipsis from "../assets/icon-vertical-ellipsis.svg"
import addTaskIcon from "../assets/icon-add-task-mobile.svg";
import darkLogo from "../assets/logo-dark.svg";
import lightLogo from "../assets/logo-light.svg";

import Button from "./Button"
import Dropdown from "./Dropdown"
import AddEditBoardModal from "./AddEditBoardModal.jsx"

import { useEffect, useState } from "react"
import DeleteBoardModal from "./DeleteBoardModal.jsx"
import AddEditTaskModal from "./AddEditTaskModal.jsx"
import { selectBoardData } from "../redux/boardSlice.js";
import { useSelector } from "react-redux";

function Header({openSideBar}) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);
  const [ellipsisMenuIsOpen, setEllipsisMenuisOpen] = useState(false);
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [deleteBoardIsOpen, setDeleteBoardIsOpen] = useState(false);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);
  const {boards, activeBoard} = useSelector(selectBoardData);

  useEffect(function() {
     const handleKeyDown = (e) => {
        if(dropdownIsOpen && (e.key === 'Escape')) setDropdownIsOpen(false);

        if(boardModalIsOpen && (e.key === 'Escape')) setBoardModalIsOpen(false);         
     }
    document.addEventListener('keydown', handleKeyDown);
    return function() {
        document.removeEventListener('keydown', handleKeyDown);
    }
  })

  function onClose() {
    setAddTaskModalIsOpen(false);
  }

  return (
    <nav className="sticky top-0 z-100 flex px-4 md:px-6 lg:px-0 lg:pl-6 lg:pr-8.5 py-4 xl:py-6 items-center bg-custom-white dark:bg-custom-darkgrey transition-all duration-300 dark:border-l-1 border-custom-lines-dark">
        <div className="mr-4 md:mr-0">
          <img className="md:hidden" src={logo} alt="kanban logo" />
          <img className={`hidden ${openSideBar ? "" : "md:dark:block"} md:mr-[25px]`} src={lightLogo} alt="kanban light logo" />
          <img className={`hidden ${openSideBar ? "hidden" : "md:block"} dark:hidden md:mr-[25px]`} src={darkLogo} alt="kanban dark logo" />
        </div>
        <div className={`flex items-center gap-2 pl-0 ${openSideBar ? "pl-0" : "md:pl-6"}`}>
          <h2 className="heading-lg xl:text-custom-xl xl:leading-custom-header-xl  dark:text-custom-white ">{activeBoard.name}</h2>
          {
            <button className="focus:outline-3 focus:outline-offset-3 focus:outline-custom-mainpurple md:hidden">
                <img 
                onClick={() => setDropdownIsOpen(prev => !prev)} 
                src={dropdownIsOpen ? chevDownLogo : chevUpLogo}
                className="cursor-pointer"
            />
          </button>
          }
        </div>
        <div className="flex items-center ml-auto gap-4">
          <Button type={!activeBoard.columns.length ? "emptyBoard" : "board"} onClick={() => {setAddTaskModalIsOpen(true);
            setDropdownIsOpen(false);
          }} disabled={!activeBoard.columns.length}>
            {/* <svg className="rotate-45" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g fill="#FFFFFF" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg> */}
            <img className="md:hidden" src={addTaskIcon} alt="Add Task Icon" />
            <p className="hidden md:block">+ Add New Task</p>
          </Button>
          <div className="relative group">
            <div className="group-hover:opacity-100 opacity-0 w-4 h-8 rounded-full bg-gray-600 absolute -bottom-1.75 -left-1.5 -z-1 transition-all duration-200">&nbsp;</div>
            <img className="cursor-pointer" src={ellipsis} alt="Ellipsis icon"  onClick={() => setEllipsisMenuisOpen(prev => !prev)}/>
          </div>
          
        </div>
        {dropdownIsOpen && <div onClick={() => setDropdownIsOpen(prev => !prev)} className="fixed top-16 left-0 w-[100%] h-[calc(100vh-64px)] flex justify-center bg-black/50 items-start z-100">
          <Dropdown boards={boards} setBoardModalIsOpen={setBoardModalIsOpen}
          setDropdownIsOpen={setDropdownIsOpen}/>
        </div>}
        {boardModalIsOpen && <AddEditBoardModal setBoardModalIsOpen={setBoardModalIsOpen} />}

        {ellipsisMenuIsOpen && <div className="p-4 absolute z-100 top-[100%] right-4 bg-custom-white ring-1 ring-inset ring-custom-lightgrey dark:bg-custom-darkgrey rounded-lg">
            <p className="text-custom-mediumgrey dark:text-custom-white body-lg mb-4 w-40 cursor-pointer hover:text-custom-mainpurple transition-colors duration-200" onClick={() => {
                setEllipsisMenuisOpen(false);
                setEditBoardIsOpen(true);}
                }>Edit Board</p>
            <p onClick={() => {
                setEllipsisMenuisOpen(false);
                setDeleteBoardIsOpen(true);
            }} className="text-custom-red hover:text-custom-red-hover body-lg w-40 cursor-pointer">Delete Board</p>
        </div>}

        {editBoardIsOpen && <AddEditBoardModal
        setBoardModalIsOpen={setBoardModalIsOpen}
        setEditBoardIsOpen={setEditBoardIsOpen} type="editBoard"/>}
        {deleteBoardIsOpen && <DeleteBoardModal setDeleteBoardIsOpen={setDeleteBoardIsOpen}/>}
        {addTaskModalIsOpen && <AddEditTaskModal onClose={onClose}
        task={{
            columnIndex: 0,
            taskIndex: 0,
            title: "",
            description: "",
            subtasks: [],
            status: activeBoard.columns[0].name,
          }}/>}
      </nav>
  )
}

export default Header
