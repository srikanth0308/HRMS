import { useState, ChangeEvent } from 'react';

interface EmployeeID {
  id: string;
  name: string;
  role: 'Sr' | 'Jr';
  companyName: string;
  companyAddress: string;
  bloodGroup: string;
  mobileNumber: string;
  imageUrl?: string;
  doorAccessLink: string;
}

const CreateIDAndAccess = () => {
  const [employees, setEmployees] = useState<EmployeeID[]>([]);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Sr' | 'Jr'>('Jr');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [doorAccessLink, setDoorAccessLink] = useState('');

  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generated = '';
    for (let i = 0; i < 8; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setId(generated);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const addEmployeeID = () => {
    if (!id || !name || !companyName || !companyAddress || !doorAccessLink || !bloodGroup || !mobileNumber) {
      alert('Please fill all required fields and generate ID.');
      return;
    }

    const newEmployee: EmployeeID = {
      id,
      name,
      role,
      companyName,
      companyAddress,
      bloodGroup,
      mobileNumber,
      imageUrl: imagePreview || undefined,
      doorAccessLink,
    };

    setEmployees([newEmployee, ...employees]);

    // Reset form
    setId('');
    setName('');
    setRole('Jr');
    setCompanyName('');
    setCompanyAddress('');
    setBloodGroup('');
    setMobileNumber('');
    setImage(null);
    setImagePreview(null);
    setDoorAccessLink('');
  };

  return (
    <div
      className="max-w-8xl mx-auto p-6 rounded-lg shadow-lg"
      style={{
        backgroundImage:
          "url('https://manybackgrounds.com/images/hd/mix-color-dark-purple-0hzlwzpjmpyxbms0.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
      }}
    >
      <div className="bg-black bg-opacity-70 p-6 rounded-lg max-w-3xl mx-auto h-full overflow-auto">
        <h2 className="text-1xl font-bold mb-6 text-white">Create Employee ID & Access</h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Employee ID (Generate below)"
              value={id}
              readOnly
              className="flex-grow p-2 rounded bg-gray-200 text-black"
            />
            <button
              onClick={generateRandomId}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Generate ID
            </button>
          </div>

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 rounded"
          />

          <select
            value={role}
            onChange={e => setRole(e.target.value as 'Sr' | 'Jr')}
            className="w-full p-2 rounded"
          >
            <option value="Jr">Jr</option>
            <option value="Sr">Sr</option>
          </select>

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            className="w-full p-2 rounded"
          />

          <textarea
            placeholder="Company Address"
            value={companyAddress}
            onChange={e => setCompanyAddress(e.target.value)}
            className="w-full p-2 rounded"
            rows={3}
          />

          <input
            type="text"
            placeholder="Blood Group (e.g., A+, B-, O+)"
            value={bloodGroup}
            onChange={e => setBloodGroup(e.target.value)}
            className="w-full p-2 rounded"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={e => setMobileNumber(e.target.value)}
            className="w-full p-2 rounded"
          />

          <label className="block font-medium mb-1 text-white">Upload Employee Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Employee Preview"
              className="w-24 h-24 object-cover rounded mt-2 border"
            />
          )}

          <input
            type="text"
            placeholder="Door Access Link / Code"
            value={doorAccessLink}
            onChange={e => setDoorAccessLink(e.target.value)}
            className="w-full p-2 rounded"
          />

          <button
            onClick={addEmployeeID}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create ID & Access
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-white">Created Employee IDs</h3>
          {employees.length === 0 ? (
            <p className="text-white">No employee IDs created yet.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 text-sm bg-white text-black rounded overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Company</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Blood Group</th>
                  <th className="border p-2">Mobile</th>
                  <th className="border p-2">Photo</th>
                  <th className="border p-2">Door Access</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td className="border p-2 font-mono">{emp.id}</td>
                    <td className="border p-2">{emp.name}</td>
                    <td className="border p-2">{emp.role}</td>
                    <td className="border p-2">{emp.companyName}</td>
                    <td className="border p-2 whitespace-pre-line">{emp.companyAddress}</td>
                    <td className="border p-2">{emp.bloodGroup}</td>
                    <td className="border p-2">{emp.mobileNumber}</td>
                    <td className="border p-2">
                      {emp.imageUrl ? (
                        <img
                          src={emp.imageUrl}
                          alt={emp.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="border p-2 break-words">{emp.doorAccessLink}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateIDAndAccess;
