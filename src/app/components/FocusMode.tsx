import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

export function FocusMode() {
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(WORK_TIME);
      } else {
        setIsBreak(true);
        setTimeLeft(BREAK_TIME);
        setSessions((s) => s + 1);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak
    ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100
    : ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

  const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "The expert in anything was once a beginner.",
    "Education is not the filling of a pail, but the lighting of a fire.",
    "The beautiful thing about learning is that nobody can take it away from you.",
  ];

  const currentQuote = quotes[sessions % quotes.length];

  return (
    <div className="p-8 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-12 text-white text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
              {isBreak ? (
                <>
                  <Coffee size={20} />
                  <span>Break Time</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Focus Session</span>
                </>
              )}
            </div>
          </div>

          <div className="relative mb-8">
            <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="white"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">{formatTime(timeLeft)}</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={toggleTimer}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              {isActive ? (
                <>
                  <Pause size={24} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={24} />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="px-8 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={24} />
              Reset
            </button>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-lg italic mb-2">"{currentQuote}"</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <p className="text-3xl text-purple-600 mb-2">{sessions}</p>
            <p className="text-sm text-gray-500">Sessions Completed</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <p className="text-3xl text-blue-600 mb-2">{Math.floor((sessions * 25) / 60)}h {(sessions * 25) % 60}m</p>
            <p className="text-sm text-gray-500">Total Focus Time</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <p className="text-3xl text-green-600 mb-2">{sessions * 5}m</p>
            <p className="text-sm text-gray-500">Break Time Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
