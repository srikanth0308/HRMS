import { useState } from 'react';

interface TerminationForm {
  employeeId: string;
  name: string;
  role: string;
  reason: string;
  description: string;
  noticePeriod: string;
  finalSettlement: string;
}

const TerminationManager = () => {
  const [form, setForm] = useState<TerminationForm>({
    employeeId: '',
    name: '',
    role: '',
    reason: '',
    description: '',
    noticePeriod: '',
    finalSettlement: '',
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (field: keyof TerminationForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSendTermination = () => {
    if (
      !form.employeeId ||
      !form.name ||
      !form.role ||
      !form.reason ||
      !form.noticePeriod ||
      !form.finalSettlement
    ) {
      setMessage('Please fill all required fields.');
      return;
    }

    // Simulate email sending
    setMessage(
      `Termination email sent to ${form.name} (ID: ${form.employeeId}) with notice period ${form.noticePeriod}.`
    );

    // Reset form if needed
    // setForm({ employeeId: '', name: '', role: '', reason: '', description: '', noticePeriod: '', finalSettlement: '' });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-2xl font-bold">Employee Termination Manager</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Employee ID *"
          value={form.employeeId}
          onChange={e => handleChange('employeeId', e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Employee Name *"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Role *"
          value={form.role}
          onChange={e => handleChange('role', e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Termination Reason *"
          value={form.reason}
          onChange={e => handleChange('reason', e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Description (Optional)"
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
          className="border p-2 rounded w-full"
          rows={3}
        />
        <input
          type="text"
          placeholder="Notice Period (e.g. 30 days) *"
          value={form.noticePeriod}
          onChange={e => handleChange('noticePeriod', e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Final Settlement Amount *"
          value={form.finalSettlement}
          onChange={e => handleChange('finalSettlement', e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleSendTermination}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Send Termination Email
        </button>

        {message && (
          <p className="mt-2 text-green-700 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default TerminationManager;
