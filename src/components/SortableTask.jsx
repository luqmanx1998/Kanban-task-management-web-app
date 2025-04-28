import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTask({ children, id, dragHandleProps}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: "grab",
        boxShadow: isDragging ? '0 4px 10px rgba(0,0,0,0.15)' : '',
        scale: isDragging ? 1.03 : 1,
        zIndex: isDragging ? 50 : "auto",
    };


    return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          {...dragHandleProps}
        >
          {children}
        </div>
      );
}