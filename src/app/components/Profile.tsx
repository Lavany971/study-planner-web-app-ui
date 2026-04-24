import { useState } from 'react';
import { User, Target, Moon, Sun } from 'lucide-react';

export function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(6);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="mb-6">Profile & Settings</h2>

      <div className="bg-white rounded-xl p-6 border border-border mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
            L
          </div>
          <div className="flex-1">
            <h3>Lavany</h3>
            <p className="text-gray-500">Student</p>
            <p className="text-sm text-gray-400 mt-1">lavany@studyplanner.com</p>
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-purple-600" size={24} />
          <h3>Study Goals</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label>Daily Study Hours Target</label>
              <span className="text-purple-600">{dailyGoal} hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Weekly Target</p>
              <p className="text-2xl text-purple-600">{dailyGoal * 7} hrs</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Current Streak</p>
              <p className="text-2xl text-blue-600">12 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border mb-6">
        <h3 className="mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-gray-600" />}
              <div>
                <p>Theme</p>
                <p className="text-sm text-gray-500">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                darkMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-600" />
              <div>
                <p>Notifications</p>
                <p className="text-sm text-gray-500">Task reminders and updates</p>
              </div>
            </div>
            <button className="relative w-14 h-8 rounded-full transition-colors bg-purple-600">
              <div className="absolute w-6 h-6 bg-white rounded-full top-1 translate-x-7 transition-transform"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border">
        <h3 className="mb-4">Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl text-blue-600 mb-1">156</p>
            <p className="text-sm text-gray-600">Total Study Hours</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl text-purple-600 mb-1">42</p>
            <p className="text-sm text-gray-600">Tasks Completed</p>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <p className="text-2xl text-pink-600 mb-1">89%</p>
            <p className="text-sm text-gray-600">Goal Achievement</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl text-green-600 mb-1">12</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
