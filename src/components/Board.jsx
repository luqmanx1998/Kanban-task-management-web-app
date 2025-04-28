// import data from "../data.json"
// import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Columns from "./Columns";
import EmptyBoard from "./EmptyBoard";

import showSideBarIcon from "../assets/icon-show-sidebar.svg";

import { useDispatch, useSelector } from "react-redux";
import { moveTasktoColumn, reorderTasks, selectBoardData } from "../redux/boardSlice";
import { useState } from "react";
import AddEditBoardModal from "./AddEditBoardModal";

function Board({ setOpenSideBar, openSideBar }) {
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {activeBoard} = useSelector(selectBoardData);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const currentBoard = activeBoard;

  if (!currentBoard) return null;

  const columns = currentBoard.columns;
  const isEmpty = !columns.length;

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const [srcCol, ...srcTitleParts] = active.id.split("-");
    const srcTitle = srcTitleParts.join("-");
    const sourceColumnIndex = Number(srcCol);
  
    let destinationColumnIndex;
    let to;
  
    if (over.id.startsWith("column-")) {
      // Case: Dropped into empty column
      destinationColumnIndex = Number(over.id.split("-")[1]);
      to = 0; // Insert at beginning
    } else {
      // Case: Dropped onto a task
      const [destCol, ...destTitleParts] = over.id.split("-");
      const destTitle = destTitleParts.join("-");
      destinationColumnIndex = Number(destCol);
  
      to = activeBoard.columns[destinationColumnIndex].tasks.findIndex(
        (task) => task.title === destTitle
      );
    }
  
    const from = activeBoard.columns[sourceColumnIndex].tasks.findIndex(
      (task) => task.title === srcTitle
    );
  
    if (sourceColumnIndex === destinationColumnIndex) {
      dispatch(
        reorderTasks({
          columnIndex: sourceColumnIndex,
          from,
          to,
        })
      );
    } else {
      dispatch(
        moveTasktoColumn({
          sourceColumnIndex,
          taskIndex: from,
          destinationColumnIndex,
          toIndex: to, // add this if your reducer supports it
        })
      );
    }
  }
  
  

  if (isEmpty) return <EmptyBoard />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columns.map((_, idx) => idx)}
        strategy={rectSortingStrategy}
      >
        <div className={`flex gap-6 min-h-[calc(100vh-64px)] xl:min-h-[calc(100%-71px)] bg-custom-lightgrey dark:bg-custom-verydarkgrey transition-all duration-300 pl-4 md:pl-6 py-6 md:min-h-[1024px] min-w-[100vw] ${openSideBar ? "xl:min-w-[calc(100vw-302px)]" : "xl:min-w-screen"} overflow-y-auto relative`}>
          <Columns activeBoard={activeBoard} />
          <div onClick={() => setBoardModalIsOpen(true)} className="group hidden xl:flex w-70 h-[814px] mt-[35px] bg-[#E9EFFA] dark:bg-[#2B2C37] rounded-md xl:items-center justify-center cursor-pointer transition-all duration-300">
            <span className="heading-xl text-custom-mediumgrey group-hover:text-custom-mainpurple transition-all duration-300">+ New Column</span>
          </div>
          <div onClick={() => setOpenSideBar(true)} className={`hidden ${openSideBar ? "hidden" : "md:block"} px-5 py-[19px] bg-custom-mainpurple absolute bottom-8 left-0 rounded-r-full hover:bg-custom-mainpurple-hover transition-colors duration-300 cursor-pointer`}
            >
            <img className="h-2.5 w-4" src={showSideBarIcon} alt="show sidebar icon" />
          </div>
          {boardModalIsOpen && <AddEditBoardModal setEditBoardIsOpen={setBoardModalIsOpen} type="editBoard"/>}
        </div>

      </SortableContext>
    </DndContext>
  );
}

export default Board;
