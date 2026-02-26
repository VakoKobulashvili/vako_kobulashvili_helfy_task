import { useEffect, useRef } from "react";
import TaskItem from "./TaskItem";

export default function InfinityCarousel({
  tasks,
  onEdit,
  onToggle,
  onDelete,
}) {
  const ref = useRef(null);

  // after research decided to use strategy, cloning first and last tasks
  // and adding last to first and first to last
  const items = [tasks[tasks.length - 1], ...tasks, tasks[0]];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollLeft = el.clientWidth;

    const intervalId = setInterval(() => {
      const { scrollLeft, clientWidth, scrollWidth } = el;

      const nextPos = scrollLeft + clientWidth;
      el.scrollTo({ left: nextPos, behavior: "smooth" });

      setTimeout(() => {
        if (el.scrollLeft >= scrollWidth - clientWidth - 5) {
          el.scrollTo({ left: clientWidth, behavior: "auto" });
        }
      }, 600);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [tasks]);

  return (
    <div className="carousel-wrapper">
      <div ref={ref} className="carousel-track">
        {items.map((t, index) => (
          // two indexing to avoid duplicates
          <div key={`${t?.id}-${index}`} className="carousel-slide">
            <TaskItem
              task={t}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
