import { useState, useEffect } from "react";
import iconCross from "../assets/icon-cross.svg";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard, editActiveBoard, selectBoardData } from "../redux/boardSlice";

function AddEditBoardModal({ setBoardModalIsOpen, setEditBoardIsOpen, type }) {
  const dispatch = useDispatch();

  const boardData = useSelector(selectBoardData);
  const isEdit = type === "editBoard";

  const [columns, setColumns] = useState(isEdit ? [] : ["Todo", "Doing"]);
  const [boardName, setBoardName] = useState(isEdit ? "" : "");
  const [boardNameError, setBoardNameError] = useState(false);
  const [colErrors, setColErrors] = useState([]);

  useEffect(() => {
    if (isEdit && boardData?.activeBoard?.name && boardData?.activeBoard?.columns) {
      setBoardName(boardData.activeBoard.name);
      setColumns(boardData.activeBoard.columns.map(col => col.name));
    }
  }, [isEdit, boardData]);

  function handleRemoveColumn(i) {
    const newColumns = [...columns];
    const filteredCols = newColumns.filter((_, index) => index !== i);
    setColumns(filteredCols);
  }

  function handleEditColumn(e, i) {
    const newColumns = [...columns];
    newColumns[i] = e.target.value;
    setColumns(newColumns);
  }

  function handleSubmit() {
    const columnErrors = columns.map(col => col.trim() === "");
    setColErrors(columnErrors);
    const hasColErrors = columnErrors.some(err => err);
    const isBoardNameInvalid = boardName.trim() === "";
    setBoardNameError(isBoardNameInvalid);

    if (hasColErrors || isBoardNameInvalid) return;

    const formattedBoard = {
      name: boardName,
      columns: columns.map((name, i) => {
        if (isEdit && boardData.activeBoard.columns[i]) {
          return {
            name,
            tasks: boardData.activeBoard.columns[i].tasks || [],
          };
        }
        return {
          name,
          tasks: [],
        };
      }),
    };

    if (isEdit) {
      dispatch(editActiveBoard(formattedBoard));
    } else {
      dispatch(addNewBoard(formattedBoard));
    }

    // Reset after action
    setBoardName("");
    setColumns(["Todo", "Doing"]);

    if (isEdit) {
      setEditBoardIsOpen(false);
    } else {
      setBoardModalIsOpen(false);
    }
  }

  return (
    <div onClick={() => {
      isEdit ? setEditBoardIsOpen(false) :
      setBoardModalIsOpen(false); 
      }} className="fixed inset-0 w-[100%] min-h-screen flex justify-center bg-black/50 items-center z-1000 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-custom-white dark:bg-custom-darkgrey p-6 rounded-md flex flex-col gap-6 min-w-[343px] transition-all duration-300">
        <h2 className="heading-lg dark:text-custom-white transition-all duration-300">{isEdit ? "Edit Board" : "Add New Board"}</h2>

        <div className="flex flex-col">
          <label className="text-custom-mediumgrey dark:text-custom-white body-md-tight mb-2 transition-all duration-300" htmlFor="Board Name">Board Name</label>
          <div className={`body-lg py-2 px-4 ring-inset ring-1 ${boardNameError ? "ring-red-600" : "ring-[#828FA340]"} rounded-lg flex justify-between`}>
            <input
              className="placeholder-[#828FA380] dark:text-custom-white"
              type="text"
              name="Board Name"
              placeholder="e.g. Web Design"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <span className={`text-red-600 w-[97px] ${boardNameError ? "block" : "hidden"}`}>Can't be empty</span>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-custom-mediumgrey dark:text-custom-white body-md-tight mb-2 transition-all duration-300" htmlFor="Board columns">Board Columns</label>
          <div className="flex flex-col gap-3">
            {columns.map((column, i) => (
              <div key={i} className="flex items-center gap-4 grow-1">
                <div className={`body-lg py-2 px-4 ring-inset ring-1 ${colErrors[i] ? "ring-red-600" : "ring-[#828FA340]"} rounded-lg w-full flex justify-between`}>
                  <input
                    className="placeholder-[#828FA380] dark:text-custom-white w-full"
                    type="text"
                    name="Board columns"
                    value={column}
                    onChange={(e) => handleEditColumn(e, i)}
                  />
                  <span className={`text-red-600 w-[160px] ${colErrors[i] ? "block" : "hidden"}`}>Can't be empty</span>
                </div>
                <img
                  onClick={() => handleRemoveColumn(i)}
                  className="h-[15px] w-[15px] ml-auto cursor-pointer"
                  src={iconCross}
                  alt="Cross icon"
                />
              </div>
            ))}
            <Button onClick={() => setColumns((prevCols) => (!prevCols.length ? [""] : [...prevCols, ""]))} type="addNewCol">+ Add New Column</Button>
          </div>
        </div>

        <Button onClick={handleSubmit} type="addEditNewBoard">
          {isEdit ? "Save Changes" : "Create New Board"}
        </Button>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
