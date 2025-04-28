import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./redux/boardSlice";

const loadState = () => {
    try {
      const serializedState = localStorage.getItem("kanban-data");
      if(serializedState === null)
      return undefined;
      
      return JSON.parse(serializedState);
    } catch(err) {
      console.error("Could not load data", err);
      return undefined;
    }
};

const store = configureStore({
    reducer: {
        board: boardReducer,
    },
    preloadedState: {
        board: loadState() || undefined,
    },
    devTools: import.meta.env.DEV,
});

store.subscribe(() => {
    try {
      const state = store.getState();
      const serializedState = JSON.stringify({
        boards: state.board.boards,
        activeBoardIndex: state.board.activeBoardIndex,
      });
      localStorage.setItem("kanban-data", serializedState)
    } catch(err) {
      console.error("Could not save state", err);
    }
});

console.log("Redux Store:", store.getState());

if (import.meta.env.DEV) {
    window.store = store;
  }

export default store;