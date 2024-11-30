/* eslint-disable react/prop-types */
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTasksChange }) => {
  return (
    <div className="my-8 mx-auto max-w-3xl p-4 bg-white shadow-lg rounded-lg">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem key={task._id} task={task} onTasksChange={onTasksChange} />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks available. Please create a task.</p>
      )}
    </div>
  );
};

export default TaskList;
