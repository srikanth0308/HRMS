import { useState } from 'react';
import { format } from 'date-fns';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'New' | 'In Progress' | 'Completed';
  startDateTime: string;
  endDateTime: string;
  deadline: string;
  team: { name: string; role: string }[];
  document?: File;
  alertSent?: boolean;
  projectType: 'Contract' | 'Short-Term' | 'Long-Term';
  timezone: string;
  clientName: string;
}

const HRProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'New' as 'New' | 'In Progress' | 'Completed',
    startDateTime: '',
    endDateTime: '',
    deadline: '',
    team: '',
    document: null as File | null,
    projectType: 'Contract' as 'Contract' | 'Short-Term' | 'Long-Term',
    timezone: '',
    clientName: '',
  });

  const handleAddProject = () => {
    if (!form.title || !form.description || !form.deadline || !form.team) return;

    const newProject: Project = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      status: form.status,
      startDateTime: form.startDateTime,
      endDateTime: form.endDateTime,
      deadline: form.deadline,
      team: form.team.split(',').map(t => {
        const [name, role] = t.split(':').map(s => s.trim());
        return { name, role };
      }),
      document: form.document || undefined,
      alertSent: false,
      projectType: form.projectType,
      timezone: form.timezone,
      clientName: form.clientName,
    };

    setProjects(prev => [...prev, newProject]);
    setForm({
      title: '', description: '', status: 'New', startDateTime: '', endDateTime: '', deadline: '', team: '',
      document: null, projectType: 'Contract', timezone: '', clientName: ''
    });
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdate = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleAlert = (id: string) => {
    alert('Alert sent to assigned employees!');
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, alertSent: true } : p)));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 max-w-8xl mx-auto text-white"
      style={{ backgroundImage: "url('https://manybackgrounds.com/images/hd/mix-color-dark-purple-0hzlwzpjmpyxbms0.jpg')" }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">HR Project Manager</h2>

      {/* Form */}
      <div className="max-w-4xl grid grid-cols-2 gap-8 p-4 bg-black bg-opacity-20 rounded-md backdrop-blur">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Project Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value as Project['status'] })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <label className="text-xs">Start Date & Time</label>
          <input
            type="datetime-local"
            value={form.startDateTime}
            onChange={e => setForm({ ...form, startDateTime: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
          <label className="text-xs">End Date & Time</label>
          <input
            type="datetime-local"
            value={form.endDateTime}
            onChange={e => setForm({ ...form, endDateTime: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
          <label className="text-xs">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={e => setForm({ ...form, deadline: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
          <input
            type="text"
            placeholder="Client Name"
            value={form.clientName}
            onChange={e => setForm({ ...form, clientName: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
        </div>

        <div className="space-y-3">
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
            rows={3}
          />
          <select
            value={form.projectType}
            onChange={e => setForm({ ...form, projectType: e.target.value as any })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          >
            <option value="Contract">Contract</option>
            <option value="Short-Term">Short-Term</option>
            <option value="Long-Term">Long-Term</option>
          </select>
          <input
            type="text"
            placeholder="Team Members (e.g. John:Dev, Alice:UI)"
            value={form.team}
            onChange={e => setForm({ ...form, team: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
          <input
            type="text"
            placeholder="Timezone"
            value={form.timezone}
            onChange={e => setForm({ ...form, timezone: e.target.value })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
          <input
            type="file"
            onChange={e => setForm({ ...form, document: e.target.files?.[0] || null })}
            className="bg-black bg-opacity-40 text-white p-2 rounded w-full text-sm hover:bg-opacity-60 transition"
          />
        </div>

        <div className="col-span-2 text-right">
          <button
            onClick={handleAddProject}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-900 transition"
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-4 mt-6">
        {projects.map(project => (
          <div key={project.id} className="p-4 rounded bg-black bg-opacity-30 text-white shadow">
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm">{project.description}</p>
                <p>Status: {project.status}</p>
                <p>Start: {project.startDateTime} | End: {project.endDateTime}</p>
                <p>Deadline: {format(new Date(project.deadline), 'PPP')}</p>
                <p>Team: {project.team.map(t => `${t.name} (${t.role})`).join(', ')}</p>
                <p>Type: {project.projectType}</p>
                <p>Timezone: {project.timezone}</p>
                <p>Client: {project.clientName}</p>
                {project.document && <p>📎 Document attached</p>}
              </div>
              <div className="space-y-1 flex flex-col items-end">
                <button onClick={() => handleUpdate(project.id, { status: 'Completed' })} className="bg-green-600 text-white text-xs px-2 py-1 rounded">Mark Complete</button>
                <button onClick={() => handleAlert(project.id)} className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  {project.alertSent ? 'Alert Sent' : 'Send Alert'}
                </button>
                <button onClick={() => handleDelete(project.id)} className="bg-red-600 text-white text-xs px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRProjectManager;
