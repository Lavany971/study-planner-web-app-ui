import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScheduleTask {
  id: number;
  day: string;
  time: string;
  subject: string;
  color: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<ScheduleTask, 'id'>) => void;
  task?: ScheduleTask;
  prefilledDay?: string;
  prefilledTime?: string;
}

export function ScheduleModal({ isOpen, onClose, onSave, task, prefilledDay, prefilledTime }: ScheduleModalProps) {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('09:00');
  const [subject, setSubject] = useState('');
  const [color, setColor] = useState('bg-blue-400');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const colors = [
    { name: 'Blue', value: 'bg-blue-400' },
    { name: 'Purple', value: 'bg-purple-400' },
    { name: 'Pink', value: 'bg-pink-400' },
    { name: 'Green', value: 'bg-green-400' },
    { name: 'Orange', value: 'bg-orange-400' },
    { name: 'Red', value: 'bg-red-400' },
  ];

  useEffect(() => {
    if (task) {
      setDay(task.day);
      setTime(task.time);
      setSubject(task.subject);
      setColor(task.color);
    } else if (prefilledDay || prefilledTime) {
      setDay(prefilledDay || 'Monday');
      setTime(prefilledTime || '09:00');
      setSubject('');
      setColor('bg-blue-400');
    } else {
      setDay('Monday');
      setTime('09:00');
      setSubject('');
      setColor('bg-blue-400');
    }
  }, [task, isOpen, prefilledDay, prefilledTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject) {
      onSave({ day, time, subject, color });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>{task ? 'Edit Schedule' : 'Add to Schedule'}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Day</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Color</label>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setColor(c.value)}
                        className={`${c.value} h-10 rounded-lg transition-all ${
                          color === c.value ? 'ring-4 ring-gray-800 scale-110' : 'hover:scale-105'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {task ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
