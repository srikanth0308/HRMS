import { useState } from 'react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  type: 'Fresher' | 'Experienced';
  email: string;
  resumeFile: File | null;
  resumeURL?: string;
  isShortlisted: boolean;
  examDate?: string;
  interviewDate?: string;
  panel?: string;
  meetingLink?: string;
}

const InterviewSchedule = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [form, setForm] = useState({
    name: '',
    position: '',
    type: 'Fresher' as 'Fresher' | 'Experienced',
    email: '',
    resume: null as File | null,
  });

  const handleAddCandidate = () => {
    if (!form.name || !form.position || !form.resume || !form.email) return;

    const reader = new FileReader();
    reader.onload = () => {
      const resumeURL = reader.result as string;
      const newCandidate: Candidate = {
        id: Date.now().toString(),
        name: form.name,
        position: form.position,
        type: form.type,
        email: form.email,
        resumeFile: form.resume,
        resumeURL,
        isShortlisted: false,
      };
      setCandidates(prev => [...prev, newCandidate]);
      setForm({ name: '', position: '', type: 'Fresher', email: '', resume: null });
    };
    reader.readAsDataURL(form.resume);
  };

  const handleShortlist = (id: string) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, isShortlisted: true } : c))
    );
  };

  const handleSchedule = (
    id: string,
    updates: Partial<Omit<Candidate, 'id' | 'name' | 'resumeFile' | 'email'>>
  ) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const createMailToLink = (email: string, meetingLink: string, name: string) => {
    const subject = encodeURIComponent('Interview Meeting Link');
    const body = encodeURIComponent(
      `Hi ${name},\n\nHere is your interview meeting link:\n${meetingLink}\n\nBest Regards,\nHR Team`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Interview Schedule</h2>

      {/* Candidate Form */}
      <div className="p-4 border rounded shadow space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={form.type}
          onChange={e =>
            setForm({ ...form, type: e.target.value as 'Fresher' | 'Experienced' })
          }
          className="border p-2 rounded w-full"
        >
          <option value="Fresher">Fresher</option>
          <option value="Experienced">Experienced</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setForm({ ...form, resume: e.target.files?.[0] || null })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddCandidate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Candidate
        </button>
      </div>

      {/* Candidate List */}
      <div className="space-y-4">
        {candidates.map(candidate => (
          <div key={candidate.id} className="p-4 border rounded shadow space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                <p>Type: {candidate.type}</p>
                <p>Position: {candidate.position}</p>
                <p>Email: {candidate.email}</p>
                {candidate.resumeURL && (
                  <a
                    href={candidate.resumeURL}
                    download={`${candidate.name}-resume`}
                    className="text-sm text-blue-600 underline"
                  >
                    Download Resume
                  </a>
                )}
              </div>
              {!candidate.isShortlisted ? (
                <button
                  onClick={() => handleShortlist(candidate.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Shortlist
                </button>
              ) : (
                <span className="text-green-700 font-semibold">Shortlisted</span>
              )}
            </div>

            {/* Scheduling for shortlisted */}
            {candidate.isShortlisted && (
              <div className="grid md:grid-cols-3 gap-4 mt-2">
                {candidate.type === 'Fresher' && (
                  <div>
                    <label className="block text-sm font-medium">Exam Date</label>
                    <input
                      type="date"
                      className="border p-2 rounded w-full"
                      onChange={e =>
                        handleSchedule(candidate.id, { examDate: e.target.value })
                      }
                    />
                  </div>
                )}
                {candidate.type === 'Experienced' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium">Interview Date</label>
                      <input
                        type="datetime-local"
                        className="border p-2 rounded w-full"
                        onChange={e =>
                          handleSchedule(candidate.id, {
                            interviewDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Panel</label>
                      <input
                        type="text"
                        className="border p-2 rounded w-full"
                        placeholder="e.g. HR + Lead"
                        onChange={e =>
                          handleSchedule(candidate.id, { panel: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Meeting Link (Zoom/Google Meet)</label>
                      <input
                        type="url"
                        className="border p-2 rounded w-full"
                        placeholder="https://zoom.us/ or https://meet.google.com/..."
                        onChange={e =>
                          handleSchedule(candidate.id, { meetingLink: e.target.value })
                        }
                      />
                    </div>
                    {/* Buttons */}
                    {candidate.meetingLink && (
                      <div className="flex space-x-2 mt-2">
                        <a
                          href={candidate.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Join Meeting
                        </a>
                        {candidate.email && (
                          <a
                            href={createMailToLink(candidate.email, candidate.meetingLink, candidate.name)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          >
                            Send Meeting Link via Email
                          </a>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewSchedule;