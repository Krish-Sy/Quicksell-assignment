import React from 'react';
import TaskCard from './TaskCard';

const priorityLabels = {
  '4': 'Urgent',
  '3': 'High',
  '2': 'Medium',
  '1': 'Low',
  '0': 'No priority'
};

const groupTasks = (tasks, users, grouping) => {
  switch (grouping) {
    case 'status':
      return tasks.reduce((acc, task) => {
        (acc[task.status] = acc[task.status] || []).push(task);
        return acc;
      }, {});
    case 'user':
      return tasks.reduce((acc, task) => {
        const userName = users.find(user => user.id === task.userId)?.name || 'Unknown';
        (acc[userName] = acc[userName] || []).push(task);
        return acc;
      }, {});
      case 'priority':
        return tasks.reduce((acc, task) => {
          const priorityLabel = priorityLabels[task.priority.toString()] || `Priority ${task.priority}`;
          (acc[priorityLabel] = acc[priorityLabel] || []).push(task);
          return acc;
        }, {});
    default:
      return {};
  }
};

const sortTasks = (tasks, ordering) => {
    const tasksCopy = [...tasks];
    return tasksCopy.sort((a, b) => {
      if (ordering === 'priority') {
        // Sorting by priority, descending
        return b.priority - a.priority;
      } else {
        // Sorting by title, ascending
        return a.title.localeCompare(b.title);
      }
    });
  };

  const TasksBoard = ({ tasks, users, grouping, ordering }) => {
    const groupedTasks = groupTasks(tasks, users, grouping);
    const sortedGroupedTasks = Object.entries(groupedTasks).reduce((acc, [group, tasks]) => {
      acc[group] = sortTasks(tasks, ordering);
      return acc;
    }, {});
  
    const renderGroupedTasks = () => {
        return Object.keys(sortedGroupedTasks).map((group) => (
          <div key={group} className="task-group-column">
            <h3 className='card-title'>{group}</h3>
            {sortedGroupedTasks[group].map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ));
      };
  
    return (
      <div className="tasks-board">
        {renderGroupedTasks()}
      </div>
    );
  };
  
export default TasksBoard;
