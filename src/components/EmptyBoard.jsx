import { useState } from "react"
import Button from "./Button"
import AddEditBoardModal from "./AddEditBoardModal";

function EmptyBoard() {

  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);

  return (
    <>
    <div className="bg-custom-lightgrey dark:bg-custom-verydarkgrey transition-all duration-300">
      <div className="min-h-[calc(100vh-64px)] flex flex-col gap-[25px] justify-center text-center mx-4 items-center">
        <p className="heading-lg text-custom-mediumgrey">This board is empty. Create a new column to get started.</p>
        <Button onClick={() => {
            setEditBoardIsOpen(true)
            console.log("editBoardIsOpen:", editBoardIsOpen);}} type="secondary">+ Add New Column</Button>
      </div>
    </div>
    {editBoardIsOpen && (<AddEditBoardModal setEditBoardIsOpen={setEditBoardIsOpen}
    type="editBoard"/>)
    }
    </>
  )
}

export default EmptyBoard
