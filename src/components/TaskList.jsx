import React, { useState } from 'react';
import { CATEGORY_COLORS, CATEGORIES } from '../constants';
import { FiEdit2, FiTrash2, FiSave, FiX, FiCheckSquare, FiSquare } from 'react-icons/fi';

function TaskItem({ task, onDeleteTask, onUpdateTask, onToggleTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    onUpdateTask(task.id, { text: editedTask.text, time: editedTask.time, category: editedTask.category });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };
  
  const inputClasses = "w-full bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-1 focus:ring-primary-500 focus:border-transparent rounded-md px-2 py-1 transition-colors text-sm";

  if (isEditing) {
    return (
      <li className="bg-white dark:bg-dark-card p-3 rounded-lg shadow-sm space-y-2">
        <div className="flex gap-2">
          <input name="time" type="time" value={editedTask.time} onChange={handleInputChange} className={inputClasses} />
          <select name="category" value={editedTask.category} onChange={handleInputChange} className={inputClasses}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <input name="text" type="text" value={editedTask.text} onChange={handleInputChange} className={inputClasses} />
        <div className="flex justify-end gap-2 pt-1">
            <button onClick={handleSave} className="p-1 text-green-500 hover:text-green-400"><FiSave size={18}/></button>
            <button onClick={() => setIsEditing(false)} className="p-1 text-gray-500 hover:text-gray-400"><FiX size={18}/></button>
        </div>
      </li>
    );
  }

  return (
    <li className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm flex items-center group gap-4">
      <button onClick={() => onToggleTask(task.id)} className="flex-shrink-0">
        {task.isCompleted 
          ? <FiCheckSquare size={22} className="text-primary-500" />
          : <FiSquare size={22} className="text-gray-400 dark:text-gray-500" />
        }
      </button>

      <div className="flex-grow">
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${CATEGORY_COLORS[task.category] || ""}`}>
          {task.category}
        </span>
        <p className={`text-gray-800 dark:text-gray-100 mt-1 transition-all ${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
          {task.text}
        </p>
        <p className={`text-xs text-gray-500 dark:text-gray-400 font-mono transition-all ${task.isCompleted ? 'line-through' : ''}`}>
          {task.time} 
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
        <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-500">
          <FiEdit2 size={16} />
        </button>
        <button onClick={() => onDeleteTask(task.id)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">
          <FiTrash2 size={16} />
        </button>
      </div>
    </li>
  );
}

function TaskList({ tasks, onDeleteTask, onUpdateTask, onToggleTask }) {
    if (!tasks || tasks.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Bugüne ait görev yok.</p>;
    }

    return (
        <ul className="space-y-3">
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                    onToggleTask={onToggleTask}
                />
            ))}
        </ul>
    );
}

export default TaskList;