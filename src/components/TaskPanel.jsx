import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { formatDateKey } from '../utils/dateUtils';
import { FiCalendar } from 'react-icons/fi';

function TaskPanel({ selectedDate, tasks, onAddTask, onDeleteTask, onUpdateTask, onToggleTask }) {
  
  // Eğer hiçbir gün seçilmemişse, bir karşılama ekranı gösterelim.
  if (!selectedDate) {
    return (
      <div className="p-6 bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-black/10 dark:border-white/10 h-full flex flex-col items-center justify-center text-center">
        <FiCalendar size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300">Bir gün seçin</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Görevleri görüntülemek veya yeni bir görev eklemek için takvimden bir güne tıklayın.</p>
      </div>
    );
  }

  const tasksForDay = tasks[formatDateKey(selectedDate)] || [];

  return (
    <div className="p-6 bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-black/10 dark:border-white/10 h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {selectedDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {selectedDate.toLocaleDateString("tr-TR", { weekday: 'long' })}
        </p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
         <TaskList 
           tasks={tasksForDay} 
           onDeleteTask={(taskId) => onDeleteTask(selectedDate, taskId)} 
           onUpdateTask={(taskId, data) => onUpdateTask(selectedDate, taskId, data)} 
           onToggleTask={(taskId) => onToggleTask(selectedDate, taskId)} 
          />
      </div>
     
      <div className="border-t border-gray-200 dark:border-white/10 mt-4 pt-4 flex-shrink-0">
         <TaskForm onAddTask={(taskData) => onAddTask(selectedDate, taskData)} />
      </div>
    </div>
  );
}

export default TaskPanel;