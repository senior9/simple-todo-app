import { useEffect, useState } from "react";
import TodoItem from './TodoItem'

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!todo?.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: todo.trim(), complete: false }]);
    setTodo("");
  };

  const completedTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, complete: !t.complete } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const clearAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  const completedCount = tasks.filter(t => t.complete).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-block">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-2xl">
              ✨ Todo Progress
            </h1>
            <div className="h-1 sm:h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            Track your tasks, visualize your progress, and boost your productivity
          </p>
        </header>

        {/* Todo Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
            
            {/* Stats Card */}
            {totalCount > 0 && (
              <div className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Your Progress</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {completedCount} of {totalCount} tasks completed
                    </p>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Section */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                type="text"
                placeholder="What's on your mind today?"
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-gray-900/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
              <button
                onClick={addTask}
                disabled={!todo?.trim()}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none text-sm sm:text-base whitespace-nowrap"
              >
                Add Task
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-3 max-h-[50vh] sm:max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
              {tasks.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="text-6xl sm:text-7xl mb-4">📝</div>
                  <p className="text-gray-400 text-base sm:text-lg italic">
                    No tasks yet. Start by adding one above!
                  </p>
                </div>
              ) : (
                <>
                  {tasks.map((task) => (
                    <TodoItem
                      key={task.id}
                      task={task}
                      completeTask={completedTask}
                      deleteTask={deleteTask}
                    />
                  ))}
                  
                  {/* Clear All Button */}
                  <button
                    onClick={clearAll}
                    className="w-full mt-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 text-red-400 hover:from-red-600 hover:to-red-700 hover:text-white font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    🗑️ Clear All Tasks
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 sm:mt-16 pb-8">
          <p className="text-gray-400 text-xs sm:text-sm">
            Built with ⚡ React & 💜 Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Todo;