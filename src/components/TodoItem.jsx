
const TodoItem = ({ task, completeTask, deleteTask }) => {



  
  return (
    <div className={`group relative bg-gradient-to-r ${task.complete ? 'from-gray-800/50 to-gray-900/50' : 'from-purple-900/30 to-indigo-900/30'} backdrop-blur-sm border ${task.complete ? 'border-gray-700' : 'border-purple-500/30'} rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            checked={task.complete}
            onChange={() => completeTask(task.id)}
            className="w-5 h-5 sm:w-6 sm:h-6 appearance-none border-2 border-purple-400 rounded-lg cursor-pointer transition-all duration-300 checked:bg-gradient-to-br checked:from-purple-500 checked:to-pink-500 checked:border-transparent"
          />
          {task.complete && (
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        <span className={`flex-1 text-sm sm:text-base transition-all duration-300 ${task.complete ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.text}
        </span>
        
        <button
          onClick={() => deleteTask(task.id)}
          className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;