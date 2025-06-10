import React from "react";
import { formatDateKey } from "../utils/dateUtils";
import { DAYS_OF_WEEK } from "../constants";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Prop'lar sadeleşti
function Calendar({ currentMonthDate, onMonthChange, selectedDate, onDateSelect, tasks }) {
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOfWeek = new Date(year, month, 1).getDay();
  const firstDayOfMonth = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;

  return (
    <div className="p-6 bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-black/10 dark:border-white/10 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {currentMonthDate.toLocaleString("tr-TR", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => onMonthChange(-1)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"><FiChevronLeft size={20} /></button>
          <button onClick={() => onMonthChange(1)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"><FiChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
        {DAYS_OF_WEEK.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const dayKey = formatDateKey(date);
          
          // Seçili gün mantığı sadeleşti
          const isSelected = selectedDate && formatDateKey(selectedDate) === dayKey;
          const isToday = new Date().toDateString() === date.toDateString();
          const hasTasks = tasks[dayKey]?.length > 0;

          const cellClasses = `
            relative h-14 w-full flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200
            ${isSelected ? "bg-violet-500 text-white font-bold shadow-lg" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            ${isToday && !isSelected ? "text-violet-500 font-bold" : ""}
          `;

          return (
            // Tıklama olayı sadeleşti: Sadece App'e haber veriyor.
            <div key={dayKey} onClick={() => onDateSelect(date)} className={cellClasses}>
              <span>{day}</span>
              {hasTasks && <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-violet-500'}`}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;