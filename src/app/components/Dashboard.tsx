import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todaySchedule = [
    { time: '09:00 AM', subject: 'Engineering Mathematics II', color: 'bg-blue-400' },
    { time: '11:00 AM', subject: 'Fundamentals of Software Engineering', color: 'bg-purple-400' },
    { time: '02:00 PM', subject: 'Database Management Systems', color: 'bg-pink-400' },
    { time: '04:00 PM', subject: 'Principle of Programming', color: 'bg-green-400' },
  ];

  const subjectProgress = [
    { subject: 'Engineering Mathematics II', progress: 75, color: 'bg-blue-500' },
    { subject: 'Software Engineering', progress: 60, color: 'bg-purple-500' },
    { subject: 'Database Management Systems', progress: 85, color: 'bg-pink-500' },
    { subject: 'Principle of Programming', progress: 90, color: 'bg-green-500' },
    { subject: 'Aptitude', progress: 70, color: 'bg-orange-500' },
  ];

  const upcomingTasks = [
    { task: 'Complete Chapter 5 exercises', subject: 'Engineering Mathematics II', due: 'Today' },
    { task: 'Design UML diagrams', subject: 'Software Engineering', due: 'Tomorrow' },
    { task: 'Database normalization assignment', subject: 'DBMS', due: 'Apr 25' },
  ];

  return (
    <div className="p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white"
      >
        <h1 className="mb-2">{getGreeting()}, Lavany</h1>
        <p className="text-purple-100">Let's make today productive!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
            <h3>Study Time</h3>
          </div>
          <p className="text-3xl mt-4">4.5 hrs</p>
          <p className="text-sm text-gray-500 mt-1">Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="text-purple-600" size={24} />
            </div>
            <h3>Subjects</h3>
          </div>
          <p className="text-3xl mt-4">4/5</p>
          <p className="text-sm text-gray-500 mt-1">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <h3>Tasks Done</h3>
          </div>
          <p className="text-3xl mt-4">12/15</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-1 h-12 ${item.color} rounded-full`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{item.time}</p>
                  <p>{item.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="mb-4">Progress Tracker</h3>
          <div className="space-y-4">
            {subjectProgress.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{item.subject}</span>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border">
        <h3 className="mb-4">Upcoming Tasks</h3>
        <div className="space-y-3">
          {upcomingTasks.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p>{item.task}</p>
                  <p className="text-sm text-gray-500">{item.subject}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{item.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
