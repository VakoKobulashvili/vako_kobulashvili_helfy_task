import { useEffect } from "react";
import { useState } from "react";
import { getTasks } from "../services/tasks.service";
import InfinityCarousel from "./InfinityCarousel";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTasks();
        setTasks(result);
      } catch (err) {
        console.log("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, []);
  return (
    <div>
      <InfinityCarousel tasks={tasks} />
    </div>
  );
};

export default TaskList;
