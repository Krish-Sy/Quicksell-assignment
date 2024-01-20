import React from 'react';
import TaskCard from './TaskCard';

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
        const priority = `Priority ${task.priority}`;
        (acc[priority] = acc[priority] || []).push(task);
        return acc;
      }, {});
    default:
      return {};
  }
};

const sortTasks = (tasks, ordering) => {
    // Create a copy of the tasks array to avoid mutating the original state
    const tasksCopy = [...tasks];
    return tasksCopy.sort((a, b) => {
      if (ordering === 'priority') {
        // Sort by priority, descending
        return b.priority - a.priority;
      } else {
        // Sort by title, ascending
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
  
    // Render the sorted and grouped tasks
    const renderGroupedTasks = () => {
        return Object.keys(sortedGroupedTasks).map((group) => (
          <div key={group} className="task-group-column">
            <h3>{group}</h3>
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
