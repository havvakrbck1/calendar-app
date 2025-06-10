import React, { useState } from "react";
import { CATEGORIES } from "../constants";
import { FiPlus } from 'react-icons/fi';
import Dropdown from './Dropdown'; 

function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !time.trim()) return;
    onAddTask({ text: text.trim(), time, category });
    setText("");
  };

  const inputClasses = "w-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-gray-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <Dropdown 
        label="Kategori"
        options={CATEGORIES}
        selected={category}
        onSelect={setCategory}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Saat</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClasses} required />
        </div>
        <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Görev</label>
            <input type="text" placeholder="Ne yapacaksın?" value={text} onChange={(e) => setText(e.target.value)} className={inputClasses} required />
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-card focus:ring-violet-500 shadow-lg"
      >
        <FiPlus />
        Görev Ekle
      </button>
    </form>
  );
}

export default TaskForm;