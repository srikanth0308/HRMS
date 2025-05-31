import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const teamMembers = [
  
  { id: 'm1', name: 'Alice (Manager)' },
  { id: 'm2', name: 'Bob (Lead)' },
  { id: 'm3', name: 'Charlie (Team Member)' },
];

interface Ticket {
  id: number;
  title: string;
  description: string;
  assignee: string;
  sendTo: string;
  issueType: string;
  severity: string;
  status: string;
  createdAt: string;
  attachmentName?: string | null;
}

const HRTicketIssue = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(teamMembers[0].id);
  const [sendTo, setSendTo] = useState('Team Member');
  const [issueType, setIssueType] = useState('');
  const [severity, setSeverity] = useState('Normal');
  const [attachment, setAttachment] = useState<File | null>(null);

  const createTicket = () => {
    if (!title || !description || !issueType || !sendTo) {
      toast.error('Please fill all required fields.');
      return;
    }

    const newTicket: Ticket = {
      id: Date.now(),
      title,
      description,
      assignee,
      sendTo,
      issueType,
      severity,
      status: 'Open',
      createdAt: new Date().toLocaleString(),
      attachmentName: attachment?.name || null,
    };

    setTickets(prev => [newTicket, ...prev]);

    setTitle('');
    setDescription('');
    setAssignee(teamMembers[0].id);
    setSendTo('Team Member');
    setIssueType('');
    setSeverity('Normal');
    setAttachment(null);

    toast.success(`Ticket sent to ${sendTo} - ${teamMembers.find(t => t.id === assignee)?.name}`);
  };

  const updateStatus = (id: number, newStatus: string) => {
    setTickets(prev =>
      prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/modern-dynamic-motion-curvy-light-trail-dark-banner-design_1017-59036.jpg?semt=ais_hybrid&w=740')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      <div className="max-w-3xl w-full relative z-10">
        <ToastContainer />
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg text-center">
          HR Ticket Issue
        </h2>

        <div className="bg-white bg-opacity-20 rounded-xl shadow-md p-5 mb-8 text-white">
          <input
            type="text"
            placeholder="Ticket Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-3 border border-white rounded mb-3 bg-transparent text-white placeholder-white"
          />

          <textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-white rounded mb-3 bg-transparent text-white placeholder-white"
          />

          <select
            value={issueType}
            onChange={e => setIssueType(e.target.value)}
            className="w-full p-3 border border-white rounded mb-3 bg-transparent text-white"
          >
            <option value="">Select Issue Type</option>
            <option value="Payroll">Payroll</option>
            <option value="Leave">Leave</option>
            <option value="Compliance">Compliance</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={severity}
            onChange={e => setSeverity(e.target.value)}
            className="w-full p-3 border border-white rounded mb-3 bg-black text-white"
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <select
            value={sendTo}
            onChange={e => setSendTo(e.target.value)}
            className="w-full p-3 border border-white rounded mb-3 bg-black text-white"
          >
            <option value="Team Member">Team Member</option>
            <option value="Lead">Lead</option>
            <option value="Manager">Manager</option>
          </select>

          <select
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            className="w-full p-3 border border-white rounded mb-3 bg-transparent text-white"
          >
            {teamMembers.map(member => (
              <option key={member.id} value={member.id} className="text-black">
                {member.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)}
            className="w-full p-3 border border-white rounded mb-3 bg-transparent text-white"
          />

          <button
            onClick={createTicket}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Send Ticket
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg text-center">Tickets</h3>
          {tickets.length === 0 ? (
            <p className="text-gray-300 text-center">No tickets created yet.</p>
          ) : (
            <ul className="space-y-4">
              {tickets.map(ticket => (
                <li key={ticket.id} className="border p-4 rounded shadow-sm bg-white">
                  <h4 className="text-lg font-bold mb-1">{ticket.title}</h4>
                  <p className="text-gray-700 mb-2">{ticket.description}</p>
                  <div className="text-sm text-black space-y-1">
                    <p>
                      <strong>Send To:</strong> {ticket.sendTo}
                    </p>
                    <p>
                      <strong>Assigned to:</strong> {teamMembers.find(m => m.id === ticket.assignee)?.name}
                    </p>
                    <p>
                      <strong>Issue Type:</strong> {ticket.issueType}
                    </p>
                    <p>
                      <strong>Severity:</strong> {ticket.severity}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <select
                        value={ticket.status}
                        onChange={e => updateStatus(ticket.id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </p>
                    <p>
                      <strong>Created At:</strong> {ticket.createdAt}
                    </p>
                    {ticket.attachmentName && (
                      <p>
                        <strong>Attachment:</strong> {ticket.attachmentName}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRTicketIssue;
