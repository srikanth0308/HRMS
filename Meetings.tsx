import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';

const Meetings = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    location: '',
    attendees: ''
  });

  // Handle input changes for the new meeting form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({ ...prev, [name]: value }));
  };

  // Add a new meeting to the meetings list
  const addMeeting = () => {
    if (!newMeeting.title || !newMeeting.date) {
      alert('Please enter title and date');
      return;
    }
    // Convert attendees string to array by splitting on commas and trimming
    const attendeesArr = newMeeting.attendees
      ? newMeeting.attendees.split(',').map(a => a.trim())
      : [];

    setMeetings(prev => [...prev, { ...newMeeting, attendees: attendeesArr }]);

    // Reset form
    setNewMeeting({
      title: '',
      date: format(currentDate, 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      location: '',
      attendees: ''
    });
  };

  // Filter meetings for the currently selected date
  const filteredMeetings = meetings.filter(
    (m) => m.date === format(currentDate, 'yyyy-MM-dd')
  );

  // Get previous 3 meetings before currentDate
  const prevMeetings = meetings
    .filter((m) => new Date(m.date) < currentDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Get next 3 meetings after currentDate
  const nextMeetings = meetings
    .filter((m) => new Date(m.date) > currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-cyan-50 p-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">

      {/* Left side: Main planner */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">HR Meeting Planner</h1>

        {/* Date navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentDate(subDays(currentDate, 1))}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Previous Day
          </button>
          <div className="text-xl font-semibold text-gray-700">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </div>
          <button
            onClick={() => setCurrentDate(addDays(currentDate, 1))}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Next Day
          </button>
        </div>

        {/* Add meeting form */}
        <div className="mb-8 border border-indigo-200 rounded-lg p-6 bg-indigo-50 shadow-inner">
          <h2 className="font-semibold text-indigo-800 text-xl mb-4">Add New Meeting</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Meeting Title"
              value={newMeeting.title}
              onChange={handleInputChange}
              className="p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="date"
              name="date"
              value={newMeeting.date}
              onChange={handleInputChange}
              className="p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="time"
              name="startTime"
              value={newMeeting.startTime}
              onChange={handleInputChange}
              className="p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="time"
              name="endTime"
              value={newMeeting.endTime}
              onChange={handleInputChange}
              className="p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="location"
              placeholder="Location (Zoom / Office)"
              value={newMeeting.location}
              onChange={handleInputChange}
              className="p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 col-span-2"
            />
            <input
              name="attendees"
              placeholder="Attendees (comma separated)"
              value={newMeeting.attendees}
              onChange={handleInputChange}
              className="p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 col-span-2"
            />
          </div>
          <button
            onClick={addMeeting}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg shadow"
          >
            Add Meeting
          </button>
        </div>

        {/* Meetings list */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="font-semibold text-indigo-800 text-2xl mb-4">
            Meetings on {format(currentDate, 'MMMM d, yyyy')}
          </h2>
          {filteredMeetings.length === 0 ? (
            <p className="text-gray-600">No meetings scheduled for this day.</p>
          ) : (
            filteredMeetings.map((meeting, i) => (
              <div
                key={i}
                className="mb-4 p-4 rounded-lg bg-white shadow-md border border-indigo-200 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">{meeting.title}</h3>
                <p className="text-indigo-600 font-medium">
                  {meeting.startTime} - {meeting.endTime}
                </p>
                <p className="text-gray-700">Location: {meeting.location}</p>
                <p className="text-gray-700">Attendees: {meeting.attendees.join(', ')}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right side: Previous & Upcoming Meetings */}
      <aside className="w-full md:w-96 bg-white rounded-xl shadow-lg p-6 sticky top-8 h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">HR Overview</h2>

        <section className="mb-8">
          <h3 className="text-indigo-800 font-semibold text-xl mb-3">Previous Meetings</h3>
          {prevMeetings.length === 0 ? (
            <p className="text-gray-500">No previous meetings.</p>
          ) : (
            prevMeetings.map((m, i) => (
              <div
                key={i}
                className="mb-3 p-3 border border-indigo-200 rounded hover:bg-indigo-50 cursor-pointer transition"
              >
                <p className="font-semibold text-indigo-700">{m.title}</p>
                <p className="text-sm text-indigo-600">{format(new Date(m.date), 'MMM d, yyyy')}</p>
              </div>
            ))
          )}
        </section>

        <section>
          <h3 className="text-indigo-800 font-semibold text-xl mb-3">Upcoming Meetings</h3>
          {nextMeetings.length === 0 ? (
            <p className="text-gray-500">No upcoming meetings.</p>
          ) : (
            nextMeetings.map((m, i) => (
              <div
                key={i}
                className="mb-3 p-3 border border-indigo-200 rounded hover:bg-indigo-50 cursor-pointer transition"
              >
                <p className="font-semibold text-indigo-700">{m.title}</p>
                <p className="text-sm text-indigo-600">{format(new Date(m.date), 'MMM d, yyyy')}</p>
              </div>
            ))
          )}
        </section>
      </aside>
    </div>
  );
};

export default Meetings;
