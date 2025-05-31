import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Download,
  ArrowLeft
} from 'lucide-react';

// Mock data
import { employees } from '../data/mockData';

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('employment');
  
  useEffect(() => {
    // Find employee from mock data
    const foundEmployee = employees.find(emp => emp.id === id);
    
    // Extend with additional details for this view
    if (foundEmployee) {
      setEmployee({
        ...foundEmployee,
        manager: "Amit Kumar",
        managerEmail: "amit.kumar@incoxis.com",
        phone: "+91-9876543210",
        dob: "15-May-1988",
        location: "Bangalore",
        joiningDate: "01-Jan-2020",
        shift: "10:00 AM - 6:30 PM",
        leaveBalance: "15 Days",
        appraisalScore: "4.5/5",
        gender: "Male"
      });
    }
  }, [id]);
  
  if (!employee) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <Link to="/employees" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Employee Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Personal Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          
          <div className="flex flex-col items-center mb-6">
            <img 
              src={employee.avatar} 
              alt={employee.name} 
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-medium">{employee.name}</h3>
            <p className="text-gray-500">{employee.role}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-gray-800">{employee.email}</p>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-gray-800">{employee.phone}</p>
                <p className="text-xs text-gray-500">Phone</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-gray-800">{employee.dob}</p>
                <p className="text-xs text-gray-500">Date of Birth</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-gray-800">{employee.location}</p>
                <p className="text-xs text-gray-500">Location</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="btn btn-outline py-2 flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Aadhar Card
            </button>
            
            <button className="btn btn-outline py-2 flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Pan Card
            </button>
          </div>
        </div>
        
        {/* Right column - Tabs */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`tab ${activeTab === 'employment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('employment')}
                >
                  Employment Details
                </button>
                <button
                  className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveTab('documents')}
                >
                  Documents
                </button>
                <button
                  className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('performance')}
                >
                  Performance
                </button>
                <button
                  className={`tab ${activeTab === 'activities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('activities')}
                >
                  Activities
                </button>
              </nav>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'employment' && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">Employment Details</h2>
                  <button className="text-purple-600 hover:text-purple-700 flex items-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Employee ID</p>
                    <p className="font-medium">{employee.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Department</p>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Joining Date</p>
                    <p className="font-medium">{employee.joiningDate}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <p className="font-medium">{employee.role}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Manager</p>
                    <p className="font-medium">{employee.manager}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Manager Email</p>
                    <p className="font-medium">{employee.managerEmail}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Shift Timing</p>
                    <p className="font-medium">{employee.shift}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="font-medium">{employee.gender}</p>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Leave & Performance</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Leave Balance</p>
                      <p className="text-2xl font-semibold text-purple-700">{employee.leaveBalance}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Last Appraisal Score</p>
                      <p className="text-2xl font-semibold text-blue-700">{employee.appraisalScore}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'documents' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Documents</h2>
                
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
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <UploadIcon className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Upload New Document</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG files</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Performance Reviews</h2>
                
                <div className="space-y-6">
                  {performanceReviews.map((review, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{review.period}</h3>
                          <p className="text-sm text-gray-500">Reviewed by: {review.reviewer}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {review.score}/5
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Achievements</h4>
                          <p className="text-sm text-gray-600">{review.achievements}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Areas of Improvement</h4>
                          <p className="text-sm text-gray-600">{review.improvements}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Goals for Next Period</h4>
                          <p className="text-sm text-gray-600">{review.goals}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'activities' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
                
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start pb-4 border-b border-gray-100">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.iconBg}`}>
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-gray-800">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock document data
const documents = [
  {
    name: "Offer Letter",
    type: "PDF",
    uploadDate: "01-Jan-2020"
  },
  {
    name: "ID Proof",
    type: "PDF",
    uploadDate: "01-Jan-2020"
  },
  {
    name: "Degree Certificate",
    type: "PDF",
    uploadDate: "05-Jan-2020"
  },
  {
    name: "Previous Experience",
    type: "PDF",
    uploadDate: "05-Jan-2020"
  },
  {
    name: "Bank Details",
    type: "PDF",
    uploadDate: "10-Jan-2020"
  }
];

// Mock performance review data
const performanceReviews = [
  {
    period: "Annual Review 2024",
    reviewer: "Amit Kumar",
    score: 4.5,
    achievements: "Successfully delivered multiple projects ahead of schedule. Improved team productivity by implementing new processes.",
    improvements: "Could improve on documentation practices. Need to delegate more tasks to junior team members.",
    goals: "Lead at least two major projects. Mentor junior developers. Complete advanced certification."
  },
  {
    period: "Annual Review 2023",
    reviewer: "Priya Sharma",
    score: 4.2,
    achievements: "Excellent problem-solving skills. Consistently delivered high-quality code. Supportive team player.",
    improvements: "Communication in meetings could be more concise. Could be more proactive in suggesting process improvements.",
    goals: "Take on more client-facing responsibilities. Improve technical documentation. Lead a major feature implementation."
  }
];

// Mock activities data
const activities = [
  {
    description: "Completed training on New Technologies",
    date: "Yesterday at 2:30 PM",
    icon: <Calendar className="w-5 h-5 text-white" />,
    iconBg: "bg-blue-500"
  },
  {
    description: "Submitted leave request for June 15-16",
    date: "May 20, 2025 at 10:15 AM",
    icon: <Calendar className="w-5 h-5 text-white" />,
    iconBg: "bg-purple-500"
  },
  {
    description: "Added to project 'Website Redesign'",
    date: "May 15, 2025 at 11:30 AM",
    icon: <FolderIcon className="w-5 h-5 text-white" />,
    iconBg: "bg-green-500"
  },
  {
    description: "Completed performance review",
    date: "May 10, 2025 at 9:45 AM",
    icon: <ClipboardIcon className="w-5 h-5 text-white" />,
    iconBg: "bg-orange-500"
  },
  {
    description: "Updated personal information",
    date: "May 5, 2025 at 3:20 PM",
    icon: <UserIcon className="w-5 h-5 text-white" />,
    iconBg: "bg-gray-500"
  }
];

// Icon components
function DocumentIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

function FolderIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function ClipboardIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export default EmployeeProfile;