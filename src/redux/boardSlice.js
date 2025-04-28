import data from "../data.json"
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    boards: data.boards,
    activeBoardIndex: 0,
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setActiveBoard(state, action) {
            state.activeBoardIndex = action.payload;
        },
        addNewBoard(state, action) {
            state.boards.push(action.payload);
            state.activeBoardIndex = state.boards.length - 1;
        },
        editActiveBoard(state, action) {
            state.boards[state.activeBoardIndex] = action.payload;
        },
        deleteActiveBoard(state) {
            state.boards = state.boards.filter((_, i) => i !== state.activeBoardIndex);
            state.activeBoardIndex = 0;
        },
        toggleSubtaskCompletion(state, action) {
            const { columnIndex, taskIndex, subtaskIndex } = action.payload;
            const subtask = state.boards[state.activeBoardIndex].columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex];
            
            subtask.isCompleted = !subtask.isCompleted;
        },
        moveTasktoColumn(state, action) {
            const { sourceColumnIndex, taskIndex, destinationColumnIndex } = action.payload;
            const taskToMove = state.boards[state.activeBoardIndex].columns[sourceColumnIndex].tasks[taskIndex];

            state.boards[state.activeBoardIndex].columns[sourceColumnIndex].tasks.splice(taskIndex, 1);

            state.boards[state.activeBoardIndex].columns[destinationColumnIndex].tasks.push(taskToMove);
        },
        addNewTask(state, action) {
            state.boards[state.activeBoardIndex].columns.find(col => col.name === action.payload.status).tasks.push({
                ...action.payload,
                subtasks: action.payload.subtasks.map(title => 
                ({title, isCompleted: false}))
            });
        },
        editActiveTask(state, action) {
            const {columnIndex, taskIndex} = action.payload;

            state.boards[state.activeBoardIndex].columns[columnIndex].tasks[taskIndex] =
            action.payload.formattedData;
        },
        deleteTask(state, action) {
            const {columnIndex, taskIndex} = action.payload;
            state.boards[state.activeBoardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
        },
        reorderTasks(state, action) {
            const {columnIndex, from, to} = action.payload;
            const tasks = state.boards[state.activeBoardIndex].columns[columnIndex].tasks;
            const [moved] = tasks.splice(from, 1);
            tasks.splice(to, 0, moved);
        },
    },
});

export const {setActiveBoard, addNewBoard, editActiveBoard, deleteActiveBoard, toggleSubtaskCompletion, moveTasktoColumn, addNewTask, editActiveTask, deleteTask, reorderTasks} = boardSlice.actions;

export const selectBoards = (state) => state.board.boards;
export const selectActiveBoardIndex = (state) => state.board.activeBoardIndex;

export const selectBoardData = createSelector(
  [selectBoards, selectActiveBoardIndex],
  (boards, activeBoardIndex) => ({
    boards,
    activeBoard: boards[activeBoardIndex],
    activeBoardIndex,
  })
);

export default boardSlice.reducer;

