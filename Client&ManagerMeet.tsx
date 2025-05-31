import { useState } from 'react';

interface Manager {
  id: string;
  name: string;
  email: string;
}

const managers: Manager[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@company.com' },
  { id: '2', name: 'Bob Smith', email: 'bob.smith@company.com' },
  // Add more managers as needed
];

const HRMeetingScheduler = () => {
  const [hrEmail, setHrEmail] = useState('');
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleScheduleMeeting = () => {
    if (!hrEmail || !selectedManagerId || !meetingDateTime || !meetingLink) {
      setMessage('Please fill all fields.');
      return;
    }

    const manager = managers.find(m => m.id === selectedManagerId);
    if (!manager) {
      setMessage('Selected manager not found.');
      return;
    }

    setMessage(
      `Meeting scheduled.\n
       HR Email: ${hrEmail}\n
       Manager Email: ${manager.email}\n
       Date & Time: ${new Date(meetingDateTime).toLocaleString()}\n
       Meeting Link: ${meetingLink}\n
       (Emails would be sent here in a real app)`
    );

    setHrEmail('');
    setSelectedManagerId('');
    setMeetingDateTime('');
    setMeetingLink('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto flex items-stretch gap-8 bg-white/10 rounded-xl shadow-2xl backdrop-blur-lg border border-white/20 p-6">
        {/* Left image section */}
        <div
          className="w-96 h-[32rem] rounded-lg shadow-lg bg-cover bg-center flex-shrink-0"
          style={{
            backgroundImage: `url('https://spin.atomicobject.com/wp-content/uploads/client-meeting.jpg')`,
          }}
        />

        {/* Right form section */}
        <div className="flex-1 rounded-xl shadow-lg p-6 overflow-auto bg-white/20 backdrop-blur-md border border-white/30">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Schedule Meeting (HR & Manager)
          </h2>

          <label className="block font-semibold mb-1 text-white">HR Email</label>
          <input
            type="email"
            placeholder="Enter HR Email"
            value={hrEmail}
            onChange={e => setHrEmail(e.target.value)}
            className="border border-white/30 bg-white/10 text-white placeholder-white/70 p-2 rounded w-full mb-4 hover:bg-white/20 transition"
          />

          <label className="block font-semibold mb-1 text-white">Select Manager</label>
          <select
            value={selectedManagerId}
            onChange={e => setSelectedManagerId(e.target.value)}
            className="border border-white/30 bg-white/10 text-white p-2 rounded w-full mb-4 hover:bg-white/20 transition"
          >
            <option value="">-- Select Manager --</option>
            {managers.map(m => (
              <option key={m.id} value={m.id} className="text-black">
                {m.name} ({m.email})
              </option>
            ))}
          </select>

          <label className="block font-semibold mb-1 text-white">
            Meeting Date & Time
          </label>
          <input
            type="datetime-local"
            value={meetingDateTime}
            onChange={e => setMeetingDateTime(e.target.value)}
            className="border border-white/30 bg-white/10 text-white p-2 rounded w-full mb-4 hover:bg-white/20 transition"
          />

          <label className="block font-semibold mb-1 text-white">
            Meeting Link (Zoom/Google Meet)
          </label>
          <input
            type="url"
            placeholder="https://meet.link/..."
            value={meetingLink}
            onChange={e => setMeetingLink(e.target.value)}
            className="border border-white/30 bg-white/10 text-white placeholder-white/70 p-2 rounded w-full mb-6 hover:bg-white/20 transition"
          />

          <button
            onClick={handleScheduleMeeting}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold px-4 py-2 rounded hover:from-purple-700 hover:to-blue-600 w-full transition"
          >
            Send Meeting Link
          </button>

          {message && (
            <pre className="mt-4 p-3 bg-green-100/80 text-green-900 whitespace-pre-wrap rounded">
              {message}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRMeetingScheduler;
