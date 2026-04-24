import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleModal } from './ScheduleModal';

interface Task {
  id: number;
  day: string;
  time: string;
  subject: string;
  color: string;
}

export function WeeklyPlanner() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['09:00', '11:00', '14:00', '16:00', '18:00'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [prefilledSlot, setPrefilledSlot] = useState<{ day?: string; time?: string }>({});
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, day: 'Monday', time: '09:00', subject: 'Engineering Mathematics II', color: 'bg-blue-400' },
    { id: 2, day: 'Monday', time: '14:00', subject: 'Software Engineering', color: 'bg-purple-400' },
    { id: 3, day: 'Tuesday', time: '09:00', subject: 'Database Management Systems', color: 'bg-pink-400' },
    { id: 4, day: 'Wednesday', time: '11:00', subject: 'Principle of Programming', color: 'bg-green-400' },
    { id: 5, day: 'Thursday', time: '09:00', subject: 'Aptitude', color: 'bg-orange-400' },
    { id: 6, day: 'Friday', time: '14:00', subject: 'Engineering Mathematics II', color: 'bg-blue-400' },
  ]);

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task))
      );
      setEditingTask(undefined);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setPrefilledSlot({});
    setIsModalOpen(true);
  };

  const openAddModal = (day: string, time: string) => {
    setEditingTask(undefined);
    setPrefilledSlot({ day, time });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
    setPrefilledSlot({});
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2>Weekly Planner</h2>
          <p className="text-gray-500 mt-1">April 21 - April 27, 2026</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-4 bg-gray-50">
            <span className="text-sm text-gray-500">Time</span>
          </div>
          {days.map((day) => (
            <div key={day} className="p-4 bg-gray-50 border-l border-border">
              <p className="text-sm">{day}</p>
            </div>
          ))}
        </div>

        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b border-border min-h-24">
            <div className="p-4 bg-gray-50">
              <span className="text-sm text-gray-500">{time}</span>
            </div>
            {days.map((day) => {
              const task = tasks.find((t) => t.day === day && t.time === time);
              return (
                <div key={day} className="p-2 border-l border-border relative group">
                  <AnimatePresence>
                    {task ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${task.color} text-white rounded-lg p-3 h-full flex items-center justify-between hover:opacity-90 transition-opacity cursor-pointer`}
                      >
                        <span className="text-sm">{task.subject}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(task)}
                            className="p-1 hover:bg-white/20 rounded"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1 hover:bg-white/20 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openAddModal(day, time)}
                          className="p-1 text-gray-400 hover:text-purple-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span className="text-sm text-gray-600">Engineering Mathematics II</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-400 rounded"></div>
          <span className="text-sm text-gray-600">Software Engineering</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-400 rounded"></div>
          <span className="text-sm text-gray-600">Database Management Systems</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span className="text-sm text-gray-600">Principle of Programming</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <span className="text-sm text-gray-600">Aptitude</span>
        </div>
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
        prefilledDay={prefilledSlot.day}
        prefilledTime={prefilledSlot.time}
      />
    </div>
  );
}
