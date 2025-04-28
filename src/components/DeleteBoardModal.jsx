import { useDispatch, useSelector } from "react-redux";
import { deleteActiveBoard, selectBoardData } from "../redux/boardSlice";
import Button from "./Button";

function DeleteBoardModal({setDeleteBoardIsOpen}) {

  const boardData = useSelector(selectBoardData);
  const dispatch = useDispatch();

  return (
    <div onClick={() => setDeleteBoardIsOpen(false)} className="fixed inset-0 w-[100%] min-h-screen flex justify-center bg-black/50 items-center z-1000 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-custom-white dark:bg-custom-darkgrey p-6 rounded-md flex flex-col gap-6 min-w-[343px] max-w-120">
        <h2 className="heading-lg text-custom-red">Delete this board?</h2>
        <p className="body-lg text-custom-mediumgrey">
           Are you sure you want to delete the '{boardData.activeBoard.name}' board? This action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="space-y-4">
        <Button onClick={() => {
            dispatch(deleteActiveBoard());
            setDeleteBoardIsOpen(false);
            }} type="deleteBoard">Delete</Button>
        <Button onClick={() => setDeleteBoardIsOpen(false)} type="addNewCol">Cancel</Button>
        </div>     
      </div>
    </div>
  )
}

export default DeleteBoardModal
