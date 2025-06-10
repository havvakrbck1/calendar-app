import { useState, useEffect } from "react";
import { formatDateKey } from "../utils/dateUtils";

export const useTasks = () => {
  const [tasks, setTasks] = useState({});
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("calendarTasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
    } finally {
      setIsInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoadComplete) return;
    try {
      localStorage.setItem("calendarTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks, isInitialLoadComplete]);

  const addTask = (date, taskData) => {
    const dateKey = formatDateKey(date);
    const newEntry = { id: Date.now(), ...taskData, isCompleted: false }; 
    
    setTasks((prev) => {
      const dayTasks = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...dayTasks, newEntry],
      };
    });
  };

  const deleteTask = (date, taskId) => {
    const dateKey = formatDateKey(date);
    setTasks((prev) => {
      const updatedDayTasks = (prev[dateKey] || []).filter(task => task.id !== taskId);
      return {
        ...prev,
        [dateKey]: updatedDayTasks,
      };
    });
  };
  
  const updateTask = (date, taskId, updatedData) => {
    const dateKey = formatDateKey(date);
    setTasks((prev) => {
        const dayTasks = prev[dateKey] || [];
        const updatedDayTasks = dayTasks.map(task => 
            task.id === taskId ? { ...task, ...updatedData } : task
        );
        return {
            ...prev,
            [dateKey]: updatedDayTasks,
        };
    });
  };


  return { tasks, addTask, deleteTask, updateTask };
};