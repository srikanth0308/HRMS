import { useState, ChangeEvent } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  status: 'New' | 'Old';
  role: string;
  imageUrl?: string;
}

const HREmployeeManager = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'New' | 'Old'>('New');
  const [role, setRole] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const addEmployee = () => {
    if (!name || !email || !role) {
      alert('Please fill all fields');
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      name,
      email,
      status,
      role,
      imageUrl: imagePreview || undefined,
    };

    setEmployees([newEmployee, ...employees]);

    setName('');
    setEmail('');
    setStatus('New');
    setRole('');
    setImage(null);
    setImagePreview(null);
  };

  // Inline styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage:
      'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    padding: 20,
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 0,
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    maxWidth: 900,
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#000',
    borderRadius: 8,
    padding: 20,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    marginBottom: 12,
    borderRadius: 4,
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#15803d',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Add Employee
        </h2>
        <div>
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'New' | 'Old')}
            style={inputStyle}
          >
            <option value="New">New Employee</option>
            <option value="Old">Old Employee</option>
          </select>
          <input
            type="text"
            placeholder="Role / Position"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: '600', display: 'block', marginBottom: 8 }}>
            Upload Photo:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: 16 }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Employee Preview"
              style={{
                width: 96,
                height: 96,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 16,
                border: '1px solid #ccc',
              }}
            />
          )}

          <button onClick={addEmployee} style={buttonStyle}>
            Add Employee
          </button>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
            Employee List
          </h3>
          {employees.length === 0 ? (
            <p>No employees added yet.</p>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: '#000',
                backgroundColor: '#fff',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      padding: 8,
                      textAlign: 'left',
                    }}
                  >
                    Photo
                  </th>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      padding: 8,
                      textAlign: 'left',
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      padding: 8,
                      textAlign: 'left',
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      padding: 8,
                      textAlign: 'left',
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      border: '1px solid #d1d5db',
                      padding: 8,
                      textAlign: 'left',
                    }}
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td
                      style={{
                        border: '1px solid #d1d5db',
                        padding: 8,
                        verticalAlign: 'middle',
                      }}
                    >
                      {emp.imageUrl ? (
                        <img
                          src={emp.imageUrl}
                          alt={emp.name}
                          style={{
                            width: 48,
                            height: 48,
                            objectFit: 'cover',
                            borderRadius: 6,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            backgroundColor: '#e5e7eb',
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9ca3af',
                            fontSize: 12,
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </td>
                    <td
                      style={{ border: '1px solid #d1d5db', padding: 8, verticalAlign: 'middle' }}
                    >
                      {emp.name}
                    </td>
                    <td
                      style={{ border: '1px solid #d1d5db', padding: 8, verticalAlign: 'middle' }}
                    >
                      {emp.email}
                    </td>
                    <td
                      style={{ border: '1px solid #d1d5db', padding: 8, verticalAlign: 'middle' }}
                    >
                      {emp.status}
                    </td>
                    <td
                      style={{ border: '1px solid #d1d5db', padding: 8, verticalAlign: 'middle' }}
                    >
                      {emp.role}
                    </td>
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

export default HREmployeeManager;
