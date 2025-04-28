import { useState } from "react";
import crossIcon from "../assets/icon-cross.svg";
import Button from "./Button";
import chevDownIcon from "../assets/icon-chevron-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, editActiveTask, moveTasktoColumn, selectBoardData } from "../redux/boardSlice";

function AddEditTaskModal({type, task, onClose}) {

  const [taskTitle, setTaskTitle] = useState(type === "edit" ? task.title : "");
  const [description, setDescription] = useState(type === "edit" ? task.description : "");
  const [subtasks, setSubtasks] = useState(type === "edit" ? task.subtasks.map(st => st.title) : [""]);
  const {activeBoard} = useSelector(selectBoardData);
  const [currentStatus, setCurrentStatus] = useState(activeBoard.columns[0]?.name || "");
  const [titleError, setTitleError] = useState(false);
const [subtaskErrors, setSubtaskErrors] = useState([]);

  const dispatch = useDispatch();

  const formattedData = {
    title: taskTitle,
    description,
    status: currentStatus,
    subtasks,
  }

   const formattedEditedData = {
    columnIndex : task.columnIndex,
    taskIndex: task.taskIndex,
    formattedData: {
        title: taskTitle,
        description,
        status: currentStatus,
        subtasks: subtasks.map(st => ({
            title: st,
            isCompleted: false,
        }))
    }
  }

  const validateForm = () => {
    let isValid = true;
  
    // Check title
    if (taskTitle.trim() === "") {
      setTitleError(true);
      isValid = false;
    }
  
    // Check subtasks
    const newSubtaskErrors = subtasks.map(subtask => subtask.trim() === "");
    setSubtaskErrors(newSubtaskErrors);
    
    if (newSubtaskErrors.some(error => error)) {
      isValid = false;
    }
  
    return isValid;
  };


  return (
    <div onClick={() => onClose()} 
        className="fixed inset-0 w-[100%] min-h-screen flex justify-center bg-black/50 items-center z-1000 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-custom-white dark:bg-custom-darkgrey p-6 rounded-md flex flex-col gap-6 min-w-[343px] max-h-[659px] overflow-y-auto">
        <h2 className="heading-lg dark:text-custom-white">{type === "edit" ? "Edit Task" : "Add New Task"}</h2>
        <div>
          <h4 className="body-md-tight text-custom-mediumgrey dark:text-custom-white mb-2">Title</h4>
          <div className="body-lg py-2 px-4 ring-inset ring-1 ring-[#828FA340] rounded-lg w-full flex justify-between">
            <input
              className="placeholder-[#828FA380] dark:text-custom-white w-full"
              type="text"
              name="Task-title"
              value={taskTitle}
              placeholder="e.g. Take a coffee break"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <span className={`text-red-600 w-[159px] ${titleError ? "block" : "hidden"}`}>
              Can't be empty
            </span>
          </div>
        </div>
        <div>
          <h4 className="body-md-tight text-custom-mediumgrey dark:text-custom-white mb-2">
            Description
          </h4>
          <textarea
            className="body-lg py-2 px-4 ring-inset ring-1 ring-[#828FA340] rounded-lg w-full min-h-[112px] placeholder-[#828FA380] dark:text-custom-white"
            name="Task-description"
            id="task-description"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <h4 className="body-md-tight text-custom-mediumgrey dark:text-custom-white mb-2">
            Subtasks
          </h4>

          <div className="flex flex-col gap-3">
            {subtasks.map((subtask, i) => (
                <div 
                key={i}
                className="flex items-center gap-4 grow-1">
                <div className="body-lg py-2 px-4 ring-inset ring-1 ring-[#828FA340] rounded-lg w-full flex justify-between">
                <input
                    className="placeholder-[#828FA380] dark:text-custom-white w-full"
                    type="text"
                    name="Subtask"
                    placeholder="e.g. Take a coffee break"
                    value={subtask}
                    onChange={(e) => setSubtasks(prev => prev.map((s, j) => {
                        return j === i ? e.target.value : s;
                      }))}
                />
                <span className={`text-red-600 w-[159px] ${subtaskErrors[i] ? "block" : "hidden"}`}>
                    Can't be empty
                </span>
                </div>
                <img
                onClick={() => setSubtasks(prev => prev.filter((_, j) => j !== i))}
                className="h-[15px] w-[15px] ml-auto cursor-pointer"
                src={crossIcon}
                alt="Cross icon"
                />
            </div>
            ))}
            <Button onClick={() => setSubtasks(prev => [...prev, ""])} type="addNewCol">+ Add New Subtask</Button>
          </div>
        </div>
        <div className="relative">
            <h4 className="body-md-tight text-custom-mediumgrey mb-2">
            Status
            </h4>
            <select name="currentStatus" id="currentStatus"
            className="w-full bg-white text-custom-black dark:bg-custom-darkgrey dark:text-custom-white body-lg ring-inset ring-[#828FA3]/25 ring-1 rounded-md px-3 py-2 appearance-none focus:ring-custom-mainpurple focus:ring-2 focus:outline-none relative"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}>
                {activeBoard.columns.map((column, i) => (
                     <option 
                     key={i}
                     className="text-custom-black dark:text-custom-white text-xs semi-bold p-0 inherit" value={column.name}>{column.name}</option> 
                ))}  
            </select>
            <img className="absolute bottom-[25%] right-3 w-2.5 h-1.5" src={chevDownIcon} alt="chevron Down icon" />
        </div>
        <Button onClick={() => {
            if (!validateForm()) return;

            type === "edit" 
    ? dispatch(editActiveTask(formattedEditedData))
    : dispatch(addNewTask(formattedData));

            type === "edit" ? dispatch(editActiveTask(formattedEditedData)) :
            dispatch(addNewTask(formattedData));

            const activeColName = activeBoard.columns[task.columnIndex].name;
            
            if(type === "edit" && currentStatus !== activeColName) {
                const destinationColumnIndex = activeBoard.columns.findIndex(col => col.name === currentStatus);

                dispatch(moveTasktoColumn({
                    sourceColumnIndex: task.columnIndex,
                    taskIndex: task.taskIndex,
                    destinationColumnIndex,
                }));
            }
            onClose();
            }} type="addEditNewBoard">{type === "edit" ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
