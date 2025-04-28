import { useDispatch } from "react-redux"
import Button from "./Button"
import { deleteTask } from "../redux/boardSlice";

function DeleteTaskModal({onClose, task}) {

  const dispatch = useDispatch();

  return (
    <div onClick={() => onClose()} className="fixed inset-0 w-[100%] min-h-screen flex justify-center bg-black/50 items-center z-1000 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-custom-white dark:bg-custom-darkgrey p-6 rounded-md flex flex-col gap-6 min-w-[343px] max-w-120">
        <h2 className="heading-lg text-custom-red">Delete Task</h2>
        <p className="body-lg text-custom-mediumgrey">Are you sure you want to delete the '{task.title}' task and its subtasks? This action cannot be reversed.</p>
        <div className="space-y-4">
        <Button onClick={() => {
            dispatch(deleteTask({
            columnIndex: task.columnIndex,
            taskIndex: task.taskIndex}));
            onClose();
        }}type="deleteBoard">Delete</Button>
        <Button onClick={() => onClose()} type="addNewCol">Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTaskModal
