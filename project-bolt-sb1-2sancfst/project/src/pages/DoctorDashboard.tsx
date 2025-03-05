import React from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Users, 
  Clock, 
  Bell, 
  Activity, 
  CheckSquare, 
  LogOut 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const mockPerformanceData = [
  { day: 'Mon', patients: 12 },
  { day: 'Tue', patients: 19 },
  { day: 'Wed', patients: 15 },
  { day: 'Thu', patients: 22 },
  { day: 'Fri', patients: 18 },
  { day: 'Sat', patients: 8 },
  { day: 'Sun', patients: 5 },
];

const mockPatients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    condition: 'Post-surgery Recovery',
    urgency: 'high',
    lastUpdate: '2 hours ago',
  },
  {
    id: '2',
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    condition: 'Regular Checkup',
    urgency: 'low',
    lastUpdate: '1 day ago',
  },
  {
    id: '3',
    name: 'Emily Davis',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    condition: 'Chronic Pain Management',
    urgency: 'medium',
    lastUpdate: '5 hours ago',
  },
];

export default function DoctorDashboard() {
  const { user, logout } = useAuthStore();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <img 
                src={user?.profileImage} 
                alt={user?.name} 
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Dr. {user?.name}</h2>
              <p className="text-sm text-gray-500">General Practitioner</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-500" />
                Patient List
              </h3>
              <input
                type="text"
                placeholder="Search patients..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-4">
              {mockPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-150"
                >
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-500">{patient.condition}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(patient.urgency)}`}>
                      {patient.urgency.charAt(0).toUpperCase() + patient.urgency.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{patient.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="col-span-1 space-y-6">
            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <Activity className="w-5 h-5 mr-2 text-primary-500" />
                Weekly Performance
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="patients" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900">8</p>
                <p className="text-sm text-gray-500">Appointments</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-secondary-100 rounded-lg p-2">
                    <Bell className="w-5 h-5 text-secondary-600" />
                  </div>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900">3</p>
                <p className="text-sm text-gray-500">Alerts</p>
              </div>
            </div>

            {/* Consent Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <CheckSquare className="w-5 h-5 mr-2 text-primary-500" />
                Pending Consents
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Access to Medical History</p>
                    <p className="text-xs text-gray-500">Sarah Johnson</p>
                  </div>
                  <button className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-200 transition duration-150">
                    Review
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lab Results Sharing</p>
                    <p className="text-xs text-gray-500">Michael Chen</p>
                  </div>
                  <button className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-200 transition duration-150">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}