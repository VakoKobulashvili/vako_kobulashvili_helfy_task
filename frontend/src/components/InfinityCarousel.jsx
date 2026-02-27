import { useEffect, useState, useRef } from "react";
import TaskItem from "./TaskItem";

export default function InfinityCarousel({
  tasks,
  onEdit,
  onToggle,
  onDelete,
}) {
  if (!tasks || tasks.length === 0)
    return <div className="no-tasks">Tasks do not exist!</div>;

  const [index, setIndex] = useState(tasks.length >= 2 ? 1 : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);

  // after research decided to use strategy, cloning first and last tasks
  // and adding last to first and first to last
  const displayItems =
    tasks.length >= 2 ? [tasks[tasks.length - 1], ...tasks, tasks[0]] : tasks;

  useEffect(() => {
    setIsAnimating(false);

    if (tasks.length < 2) {
      setIndex(0);
    } else {
      setIndex(1);
    }
  }, [tasks.length]);

  useEffect(() => {
    if (tasks.length < 2) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks.length]);

  const handleTransitionEnd = () => {
    setIsAnimating(false);

    if (index === displayItems.length - 1) {
      setIndex(1);
    }

    if (index === 0) {
      setIndex(displayItems.length - 2);
    }
  };

  const transformValue = `translateX(-${index * 100}%)`;

  return (
    <div className="carousel-container">
      <div className="carousel-viewport">
        <div
          ref={trackRef}
          className={`carousel-track ${isAnimating ? "animating" : ""}`}
          style={{ transform: transformValue }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayItems.map((task, i) => (
            <div key={`${task.id}-${i}`} className="carousel-slide">
              <TaskItem
                task={task}
                onEdit={onEdit}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
