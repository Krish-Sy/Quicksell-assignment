import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TasksBoard from './components/TasksBoard';
import './App.css'

const App = () => {
  // Initialize state from local storage, or set default if not available
  const [grouping, setGrouping] = useState(
    localStorage.getItem('grouping') || 'status'
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem('ordering') || 'priority'
  );

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('ordering', ordering);
  }, [ordering]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Fault with the network api');
        }
        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
    <div className='AppContainer'>
      <Header 
        grouping={grouping} 
        onGroupingChange={setGrouping} 
        ordering={ordering}
        onOrderingChange={setOrdering}
      />
      <TasksBoard 
        tasks={tasks} 
        users={users} 
        grouping={grouping} 
        ordering={ordering}
      />
    </div>
    </div>
  );
};

export default App;
