import React from 'react';

const TicketCard = ({ ticket, users }) => {
  const user = users.find(user => user.id === ticket.userId);

  return (
    <div className="card">
        <h2>{ticket.id}</h2>
      <h2>{ticket.title}</h2>
      {/* <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p> */}
      <p>Assigned to: {user ? user.name : 'Unknown'}</p>
    </div>
  );
};

export default TicketCard;