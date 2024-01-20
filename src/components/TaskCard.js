import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle, faExclamationTriangle, faArrowCircleDown, faCircle, faFlag } from '@fortawesome/free-solid-svg-icons';

const getPriorityIcon = (priority) => {
  const priorityIcons = {
    4: faExclamationCircle, // Urgent - Red
    3: faExclamationTriangle, // High - Orange
    2: faCircle, // Medium - Yellow
    1: faArrowCircleDown, // Low - Green, replaced faCheckCircle
    0: faFlag, // No Priority - Grey
  };
  return priorityIcons[priority] || faFlag; // Default icon if priority is not found
};

const getStatusIcon = (status) => {
  const statusIcons = {
    'Todo': faCheckCircle,
    'In progress': faSpinner, // Assuming 'In Progress' can use the same icon, or choose a different one
    'Backlog': faCircleNotch,
    // Add more statuses and their corresponding icons as needed
  };
  return statusIcons[status] || faCircleNotch; // Default icon if status is not found
};


const TaskCard = ({ task }) => {
  //const hasFeatureRequest = task.tag.includes('Feature request');
    return (
      <div className="task-card">
        <div className="task-title">
          <FontAwesomeIcon icon={getStatusIcon(task.status)} spin={task.status === 'In progress'} />
          <h4>{task.title}</h4>
        </div>
        <p className="task-id">ID: {task.id}</p>
        <FontAwesomeIcon icon={getPriorityIcon(task.priority)} className={`priority-icon priority-${task.priority}`} />
        <span className="feature-request-tag">Feature Request</span>
        {/* More details or controls for each task */}
      </div>
    );
  };

export default TaskCard;
