import { useState } from 'react';

interface JobPost {
  id: string;
  title: string;
  department: string;
  description: string;
  jd: string;
  experience: string;
  salary: string;
  deadline: string;
  postedOn: string;
  naukriURL?: string;
  linkedinURL?: string;
}

const dummyEmployeeEmails = [
  'employee1@company.com',
  'employee2@company.com',
  'employee3@company.com',
];

const HRJobPostManager = () => {
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    description: '',
    jd: '',
    experience: '',
    salary: '',
    deadline: '',
    naukriURL: '',
    linkedinURL: '',
  });

  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  const handlePostJob = async () => {
    const {
      title,
      department,
      description,
      jd,
      experience,
      salary,
      deadline,
      naukriURL,
      linkedinURL,
    } = jobForm;

    if (!title || !department || !description || !jd || !experience || !salary || !deadline)
      return alert('Please fill in all required fields.');

    const newJob: JobPost = {
      id: Date.now().toString(),
      title,
      department,
      description,
      jd,
      experience,
      salary,
      deadline,
      postedOn: new Date().toLocaleString(),
      naukriURL,
      linkedinURL,
    };

    setJobPosts(prev => [newJob, ...prev]);
    await sendJobPostEmail(newJob);

    setJobForm({
      title: '',
      department: '',
      description: '',
      jd: '',
      experience: '',
      salary: '',
      deadline: '',
      naukriURL: '',
      linkedinURL: '',
    });
  };

  const sendJobPostEmail = async (job: JobPost) => {
    dummyEmployeeEmails.forEach(email => {
      console.log(`\uD83D\uDCE8 Sent job "${job.title}" to ${email}`);
    });
    alert('Job post sent to all employees!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Post New Job Role</h2>

      {/* Job Form */}
      <div className="bg-white p-4 shadow border rounded space-y-3">
        <input
          type="text"
          placeholder="Job Title"
          value={jobForm.title}
          onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Department"
          value={jobForm.department}
          onChange={e => setJobForm({ ...jobForm, department: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Short Description"
          value={jobForm.description}
          onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
          className="border p-2 rounded w-full h-16"
        />
        <textarea
          placeholder="Job Responsibilities / JD"
          value={jobForm.jd}
          onChange={e => setJobForm({ ...jobForm, jd: e.target.value })}
          className="border p-2 rounded w-full h-24"
        />
        <input
          type="text"
          placeholder="Experience Required (e.g. 3+ Years)"
          value={jobForm.experience}
          onChange={e => setJobForm({ ...jobForm, experience: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Salary Expectations (e.g. 6-8 LPA)"
          value={jobForm.salary}
          onChange={e => setJobForm({ ...jobForm, salary: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={jobForm.deadline}
          onChange={e => setJobForm({ ...jobForm, deadline: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="url"
          placeholder="Naukri Job Post Link"
          value={jobForm.naukriURL}
          onChange={e => setJobForm({ ...jobForm, naukriURL: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="url"
          placeholder="LinkedIn Job Post Link"
          value={jobForm.linkedinURL}
          onChange={e => setJobForm({ ...jobForm, linkedinURL: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handlePostJob}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job & Notify Employees
        </button>
      </div>

      {/* Job Board */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Internal Job Board</h3>
        {jobPosts.map(job => (
          <div key={job.id} className="border p-4 rounded bg-gray-50 shadow space-y-2">
            <h4 className="font-bold text-lg">{job.title}</h4>
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Job Responsibilities:</strong> {job.jd}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Apply Before:</strong> {job.deadline}</p>
            <p className="text-xs text-gray-500">Posted on: {job.postedOn}</p>

            {/* External Job Portal Links */}
            <div className="flex gap-4 mt-2">
              {job.naukriURL && (
                <a
                  href={job.naukriURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on Naukri
                </a>
              )}
              {job.linkedinURL && (
                <a
                  href={job.linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRJobPostManager;
