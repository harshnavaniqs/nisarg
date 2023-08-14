// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TicketCard from './TicketCard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  const groupOptions = ['status', 'user', 'priority'];

  useEffect(() => {
    fetch('https://apimocha.com/quicksell/data') // Replace with the actual API endpoint
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const groupedTickets = tickets.reduce((groups, ticket) => {
    const groupValue =
      selectedGroup === 'user' ? ticket.userId : ticket[selectedGroup];
    if (!groups[groupValue]) {
      groups[groupValue] = [];
    }
    groups[groupValue].push(ticket);
    return groups;
  }, {});

  const handleGroupSelect = (groupOption) => {
    setSelectedGroup(groupOption);
    if (groupOption === 'priority') {
      setSortBy('priority');
    }
  };

  const sortedTickets = Object.keys(groupedTickets).map(groupValue => {
    const ticketsInGroup = groupedTickets[groupValue];
    return {
      groupValue,
      tickets: groupValue === 'priority'
        ? ticketsInGroup.slice().sort((a, b) => b.priority - a.priority)
        : ticketsInGroup // No need to sort other groups
    };
  });

  const handleDisplayClick = () => {
    if (selectedGroup === 'priority') {
      setSortBy('priority');
    }
  };
  const priorityHeadings = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };

  return (
    <div className="App">
      <div className="controls">
        {/* <label htmlFor="groupSelect">Group by:</label> */}
        <select
          id="groupSelect"
          value={selectedGroup}
          onChange={(e) => handleGroupSelect(e.target.value)}
        >
          <option disabled value="">
            Display
          </option>
          {groupOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="kanban-board">
  {sortedTickets.map(group => (
    <div key={group.groupValue} className="column">
      <h2 className="column-heading">
        {selectedGroup === 'user' ? users.find(user => user.id === group.groupValue).name : 
          selectedGroup === 'priority' ? priorityHeadings[group.groupValue] : group.groupValue}
        <span className="card-count">{group.tickets.length}</span>
      </h2>
      {group.tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} users={users} />
      ))}
    </div>
  ))}
</div>






    </div>
  );
}

export default App;