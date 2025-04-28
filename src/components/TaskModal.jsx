import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import chevDownIcon from "../assets/icon-chevron-down.svg";
import { moveTasktoColumn, selectBoardData, toggleSubtaskCompletion } from "../redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


function TaskModal({ task, onClose, onEdit, onDelete }) {

  const {activeBoard} = useSelector(selectBoardData);
  const column = activeBoard.columns[task.columnIndex];
  const liveTask = column.tasks[task.taskIndex];
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState(column.name);
  const [ellipsisMenuIsOpen, setEllipsisMenuisOpen] = useState(false);


  return (
    <div onClick={() => {
        onClose();
        if (currentStatus !== column.name) {
            const destinationColumnIndex = activeBoard.columns.findIndex(col => col.name === currentStatus);

            dispatch(moveTasktoColumn({
                sourceColumnIndex: task.columnIndex,
                taskIndex: task.taskIndex,
                destinationColumnIndex,
            }));
        }
    }} 
        className="fixed inset-0 w-[100%] min-h-screen flex justify-center bg-black/50 items-center z-1000 p-4">
        <div onClick={(e) => {
            e.stopPropagation()
            if(ellipsisMenuIsOpen)
            setEllipsisMenuisOpen(false);
        }} className="bg-custom-white dark:bg-custom-darkgrey p-6 rounded-md flex flex-col gap-6 min-w-[343px] max-w-120 relative">
            <div className="flex justify-between items-center">
                <h2 className="heading-lg max-w-[274px] dark:text-custom-white">{task.title}</h2>
                <img className="w-1 h-5 cursor-pointer" src={ellipsis} alt="Ellipsis icon" 
                onClick={() => setEllipsisMenuisOpen(prev => !prev)}/>
            </div>
            <p className="body-lg text-custom-mediumgrey">
                {task.description || `This description is empty, edit task to enter description.`}
            </p>
            <div>
                <h4 className="body-md-tight text-custom-mediumgrey dark:text-custom-white mb-4">
                    Subtasks ({liveTask.subtasks.filter(subtask => subtask.isCompleted).length} of {liveTask.subtasks.length})
                </h4>
                <div className="space-y-2">
                    {liveTask.subtasks.map((subtask, subtaskIndex) => (
                        <div className="flex gap-5 px-3 py-[14.5px] bg-custom-lightgrey  items-center dark:bg-custom-verydarkgrey" key={subtaskIndex}>
                            <input className="custom-checkbox peer" type="checkbox" 
                            checked={subtask.isCompleted} name="Subtask"
                            onChange={() => {
                                dispatch(toggleSubtaskCompletion({
                                    columnIndex: task.columnIndex,
                                    taskIndex: task.taskIndex,
                                    subtaskIndex
                                }));
                            }} id={`subtask-${subtaskIndex}`} />
                            <label
                            className={`body-md-tight text-custom-mediumgrey ${subtask.isCompleted ? "line-through" : ""} max-w-[243px]`} htmlFor={`subtask-${subtaskIndex}`}>{subtask.title}</label>
                  </div>
                    ))}
                  {/* <div className="flex gap-5 px-3 py-[14.5px] bg-custom-lightgrey">
                        <input className="custom-checkbox peer" type="checkbox" name="Subtask" id="subtask-key" />
                        <label
                        className="body-md-tight text-custom-mediumgrey peer-checked:line-through" htmlFor="subtask-key">Subtask name</label>
                  </div> */}
                  
                </div>
                
            </div>
            <div className="relative">
                <h4 className="body-md-tight text-custom-mediumgrey dark:text-custom-white mb-2">Current Status</h4>
                <select
                    name="currentStatus"
                    id="currentStatus"
                    className="w-full bg-white text-custom-black dark:text-custom-white dark:bg-custom-darkgrey body-lg ring-inset ring-[#828FA3]/25 ring-1 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-custom-mainpurple focus:ring-2 relative"
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    value={currentStatus}
                >
                    {activeBoard.columns.map(column => (
                        <option className="text-custom-black dark:text-custom-white text-xs semi-bold p-0 inherit" value={column.name} key={column.name}>{column.name}</option>
                    ))}
                </select>
                <img className="absolute bottom-[25%] right-3 w-2.5 h-1.5" src={chevDownIcon} alt="chevron Down icon" />
            </div>

            {ellipsisMenuIsOpen && <div className="p-4 absolute z-100 top-[55px] -right-6 bg-custom-white dark:bg-custom-darkgrey rounded-lg ring-1 ring-inset ring-custom-lightgrey">
            <p className="text-custom-mediumgrey body-lg mb-4 w-40 cursor-pointer hover:text-custom-mainpurple dark:text-custom-white dark:hover:text-custom-mediumgrey transition-all duration-200" onClick={() => {
                setEllipsisMenuisOpen(false);
                onEdit();
                }}>
                Edit Task
            </p>
            <p onClick={() => {
                setEllipsisMenuisOpen(false);
                onDelete();
            }} className="text-custom-red hover:text-custom-red-hover transition-all duration-200 body-lg w-40 cursor-pointer">Delete Task</p>
        </div>}

        </div>
    </div>
  )
}

export default TaskModal
