import { useState } from "react";
import TaskModal from "./TaskModal";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import SortableTask from "./SortableTask";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function ColumnItem({ column, i }) {
  const [viewTask, setViewTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  const { setNodeRef, isOver } = useDroppable({
    id: `column-${i}`,
  });

  const columnColors = ["#49C4E5", "#8471F2", "#67E2AE"];

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-5 min-h-[88px] ${
        isOver
          ? "bg-[#635FC7]/25 pt-5 rounded-2xl transition-all ease-in-out duration-200"
          : ""
      }`}
    >
      <span className="flex items-center heading-sm text-custom-mediumgrey uppercase gap-[15px] mb-6 xl:mb-0 min-w-[280px]">
        <div
          className="h-[15px] w-[15px] rounded-full"
          style={{ backgroundColor: columnColors[i % columnColors.length] }}
        >
          &nbsp;
        </div>
        <p>
          {column.name} ({column.tasks?.length})
        </p>
      </span>
      <div className="flex flex-col gap-5 xl:gap-6 flex-grow min-h-[300px]">
        <SortableContext
          items={column.tasks.map((task) => `${i}-${task.title}`)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.length > 0 ? (
            column.tasks.map((task, taskIndex) => (
              <SortableTask
                key={`${i}-${task.title}`}
                id={`${i}-${task.title}`}
              >
                <div
                  className="group bg-custom-white dark:bg-custom-darkgrey transition-all duration-300 max-w-[280px] rounded-lg px-4 py-[23px] cursor-pointer box-shadow hover:-translate-y-1.5"
                  onClick={() =>
                    setViewTask({
                      columnIndex: i,
                      taskIndex,
                      title: task.title,
                      description: task.description,
                      subtasks: task.subtasks,
                    })
                  }
                >
                  <h3 className="group-hover:text-custom-mainpurple heading-md mb-2 dark:text-custom-white transition-all duration-300">{task.title}</h3>
                  <p className="body-md-tight text-custom-mediumgrey">
                    {
                      task.subtasks.filter((subtask) => subtask.isCompleted)
                        .length
                    }{" "}
                    of {task.subtasks.length} subtasks
                  </p>
                </div>
              </SortableTask>
            ))
          ) : (
            <div className="min-w-[280px] min-h-[88px]" />
          )}
        </SortableContext>

        {viewTask && (
          <TaskModal
            task={viewTask}
            onClose={() => setViewTask(null)}
            onEdit={() => {
              setViewTask(null);
              setEditTask(viewTask);
            }}
            onDelete={() => {
              setViewTask(null);
              setDeleteTask(viewTask);
            }}
          />
        )}

        {editTask && (
          <AddEditTaskModal
            type="edit"
            task={editTask}
            onClose={() => setEditTask(null)}
          />
        )}

        {deleteTask && (
          <DeleteTaskModal
            onClose={() => setDeleteTask(null)}
            task={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default ColumnItem;
