import React, { useState } from "react";
import Calendar from "./components/Calendar";
import TaskPanel from "./components/TaskPanel"; // TaskPanel'i geri getiriyoruz
import { useTasks } from "./hooks/useTasks";
import { useTheme } from "./hooks/useTheme";
import { FiSun, FiMoon } from 'react-icons/fi';
import "./index.css";

function App() {
  // State'leri App bileşenine taşıyoruz
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  
  const { tasks, addTask, deleteTask, updateTask, toggleTaskCompletion } = useTasks();
  const { theme, toggleTheme } = useTheme();

  const handleMonthChange = (change) => {
    setCurrentMonthDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + change, 1));
  };
  
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Takvim<span className="text-violet-500">.</span>
          </h1>
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-300 bg-black/5 dark:bg-white/10 hover:dark:bg-white/20 backdrop-blur-sm border border-black/5 dark:border-white/10 transition-colors">
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </header>

        {/* NİHAİ YERLEŞİM: İki sütunlu grid */}
        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-3">
            <Calendar 
              currentMonthDate={currentMonthDate}
              onMonthChange={handleMonthChange}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate} // Gün seçildiğinde state'i günceller
              tasks={tasks}
            />
          </div>
          
          <div className="lg:col-span-2">
            <TaskPanel
              selectedDate={selectedDate} // Seçili günü panele gönderiyoruz
              tasks={tasks}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
              onToggleTask={toggleTaskCompletion}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;