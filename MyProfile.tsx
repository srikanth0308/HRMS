import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit,
  Save,
  User,
  Book,
  FileText,
  CreditCard
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const MyProfile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for personal information
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91-9876543210',
    dob: '15-May-1988',
    bloodGroup: 'O+',
    gender: 'Female',
    officialEmail: user?.email || '',
    personalEmail: 'personal@example.com',
    emergencyContact: '+91-9876543219',
    personalPhone: '+91-9876543210',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setIsEditing(false);
    // In a real app, would save to API here
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        {!isEditing && (
          <button 
            className="btn btn-outline flex items-center"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>
      
      {/* Profile navigation tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <User className="w-4 h-4 mr-2" />
              Personal Info
            </button>
            <button
              className={`tab ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <Book className="w-4 h-4 mr-2" />
              Education
            </button>
            <button
              className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </button>
            <button
              className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
              onClick={() => setActiveTab('bank')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Bank Details
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img 
                      src={user?.profileImage || "https://via.placeholder.com/150"} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full">
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-gray-500">{user?.role}</p>
                  </div>
                  
                  {/* Contact Info */}
                  {!isEditing && (
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span>+91-9876543210</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <span>DOB: 15-May-1988</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <span>Bangalore</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Form Fields */}
                <div className="flex-1">
                  {isEditing ? (
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="input-field"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                            Date Of Birth
                          </label>
                          <input
                            type="text"
                            id="dob"
                            name="dob"
                            className="input-field"
                            value={formData.dob}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <input
                            type="text"
                            id="gender"
                            name="gender"
                            className="input-field"
                            value={formData.gender}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                            Blood Group
                          </label>
                          <input
                            type="text"
                            id="bloodGroup"
                            name="bloodGroup"
                            className="input-field"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-800 mt-6 mb-4">Contact Info</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="officialEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Official Email ID
                          </label>
                          <input
                            type="email"
                            id="officialEmail"
                            name="officialEmail"
                            className="input-field"
                            value={formData.officialEmail}
                            onChange={handleChange}
                            disabled
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="personalEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Personal Email ID
                          </label>
                          <input
                            type="email"
                            id="personalEmail"
                            name="personalEmail"
                            className="input-field"
                            value={formData.personalEmail}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                            Emergency Contact Number
                          </label>
                          <input
                            type="text"
                            id="emergencyContact"
                            name="emergencyContact"
                            className="input-field"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="personalPhone" className="block text-sm font-medium text-gray-700 mb-1">
                            Personal Number
                          </label>
                          <input
                            type="text"
                            id="personalPhone"
                            name="personalPhone"
                            className="input-field"
                            value={formData.personalPhone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button 
                          type="button" 
                          className="btn btn-outline mr-3"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary flex items-center"
                          onClick={handleSave}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                        <div>
                          <p className="text-gray-500 text-sm">Name</p>
                          <p className="font-medium">{user?.name}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">ID</p>
                          <p className="font-medium">EMP001</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Department</p>
                          <p className="font-medium">Human Resources</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Gender</p>
                          <p className="font-medium">Female</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Date of Birth</p>
                          <p className="font-medium">15-May-1988</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Blood Group</p>
                          <p className="font-medium">O+</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-800 mt-6 mb-4">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                        <div>
                          <p className="text-gray-500 text-sm">Official Email</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Personal Email</p>
                          <p className="font-medium">personal@example.com</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Phone Number</p>
                          <p className="font-medium">+91-9876543210</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Emergency Contact</p>
                          <p className="font-medium">+91-9876543219</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Current Address</p>
                          <p className="font-medium">123 Main Street, Bangalore, 560001</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm">Permanent Address</p>
                          <p className="font-medium">456 Park Avenue, Bangalore, 560002</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Education Details</h2>
                <button className="btn btn-outline flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              </div>
              
              <div className="space-y-6">
                {educationDetails.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h3 className="font-medium text-lg">{edu.degree}</h3>
                        <p className="text-gray-500">{edu.institute}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Specialization:</span> {edu.specialization}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Grade/Percentage:</span> {edu.grade}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <PlusIcon className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700">Add Education</p>
                <p className="text-xs text-gray-500 mt-1">Add your educational qualification</p>
              </div>
            </div>
          )}
          
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Documents</h2>
                <button className="btn btn-outline flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Document
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <DocumentIcon className="w-8 h-8 text-gray-400 mr-3" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-xs text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <DownloadIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <UploadIcon className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Upload Document</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG files</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Bank Details Tab */}
          {activeTab === 'bank' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Bank Account Details</h2>
                <button className="btn btn-outline flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Holder Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                    <p className="font-medium">HDFC Bank</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Number</p>
                    <p className="font-medium">XXXX XXXX XXXX 4567</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">IFSC Code</p>
                    <p className="font-medium">HDFC0001234</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Branch</p>
                    <p className="font-medium">MG Road, Bangalore</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Type</p>
                    <p className="font-medium">Savings</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">
                  Note: Your salary will be credited to this account. Please ensure the details are correct.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock education data
const educationDetails = [
  {
    degree: "Master of Business Administration",
    institute: "Indian Institute of Management, Bangalore",
    year: "2018-2020",
    specialization: "Human Resource Management",
    grade: "3.8/4.0 GPA"
  },
  {
    degree: "Bachelor of Technology",
    institute: "National Institute of Technology, Surathkal",
    year: "2014-2018",
    specialization: "Computer Science & Engineering",
    grade: "8.5/10 CGPA"
  }
];

// Mock document data
const documents = [
  {
    name: "Aadhar Card",
    type: "PDF",
    uploadDate: "01-Jan-2023"
  },
  {
    name: "PAN Card",
    type: "PDF",
    uploadDate: "01-Jan-2023"
  },
  {
    name: "Degree Certificate",
    type: "PDF",
    uploadDate: "05-Jan-2023"
  },
  {
    name: "Experience Letter",
    type: "PDF",
    uploadDate: "05-Jan-2023"
  }
];

// Icon components
function PlusIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function DocumentIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function UploadIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
}

export default MyProfile;