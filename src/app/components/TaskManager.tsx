import { useState } from 'react';
import { Plus, Filter, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskModal } from './TaskModal';

interface Task {
  id: number;
  title: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  dueDate: string;
}

export function TaskManager() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete Chapter 5 exercises - Differential Equations',
      subject: 'Engineering Mathematics II',
      priority: 'High',
      completed: false,
      dueDate: '2026-04-23',
    },
    {
      id: 2,
      title: 'Design UML diagrams for project',
      subject: 'Fundamentals of Software Engineering',
      priority: 'High',
      completed: false,
      dueDate: '2026-04-24',
    },
    {
      id: 3,
      title: 'Database normalization assignment',
      subject: 'Fundamentals of Database Management Systems',
      priority: 'Medium',
      completed: true,
      dueDate: '2026-04-22',
    },
    {
      id: 4,
      title: 'Practice C++ pointers and arrays',
      subject: 'Principle of Programming',
      priority: 'Low',
      completed: false,
      dueDate: '2026-04-25',
    },
    {
      id: 5,
      title: 'Solve quantitative aptitude problems',
      subject: 'Aptitude',
      priority: 'Medium',
      completed: true,
      dueDate: '2026-04-21',
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        )
      );
      setEditingTask(undefined);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2>Task Manager</h2>
          <p className="text-gray-500 mt-1">Organize and track your study tasks</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-500" />
          <span>Filter</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'completed' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl p-5 border border-border hover:shadow-md transition-shadow group ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`mb-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                      <p className="text-sm text-gray-500">{task.subject}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-sm text-gray-500">{task.dueDate}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(task)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
      />

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-border text-center">
          <p className="text-gray-500">No tasks found</p>
        </div>
      )}
    </div>
  );
}
