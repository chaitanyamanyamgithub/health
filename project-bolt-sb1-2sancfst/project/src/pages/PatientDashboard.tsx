import React from 'react';
import { useAuthStore } from '../store/authStore';
import {
  History,
  UserCheck,
  Bell,
  Activity,
  AlertTriangle,
  LogOut,
  Heart,
  Thermometer,
  Droplets
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

const mockHealthData = [
  { date: '2024-01', heartRate: 72, bloodPressure: 120, glucose: 95 },
  { date: '2024-02', heartRate: 75, bloodPressure: 118, glucose: 92 },
  { date: '2024-03', heartRate: 71, bloodPressure: 122, glucose: 98 },
  { date: '2024-04', heartRate: 73, bloodPressure: 119, glucose: 94 },
  { date: '2024-05', heartRate: 74, bloodPressure: 121, glucose: 96 },
];

const mockAccessLogs = [
  {
    id: '1',
    doctor: 'Dr. Sarah Wilson',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    action: 'Viewed Medical History',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    doctor: 'Dr. James Chen',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    action: 'Updated Prescription',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    doctor: 'Dr. Emily Brown',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    action: 'Added Lab Results',
    timestamp: '3 days ago',
  },
];

export default function PatientDashboard() {
  const { user, logout } = useAuthStore();

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
              <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-500">Patient ID: #{user?.id}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
                <Activity className="w-5 h-5 mr-2 text-primary-500" />
                Health Metrics Overview
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHealthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#ef4444" 
                      name="Heart Rate"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bloodPressure" 
                      stroke="#0ea5e9" 
                      name="Blood Pressure"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#22c55e" 
                      name="Glucose"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-red-100 rounded-lg p-2">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-sm text-gray-500">Heart Rate</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900">72</p>
                <p className="text-sm text-gray-500">bpm</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <Droplets className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-sm text-gray-500">Blood Pressure</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900">120/80</p>
                <p className="text-sm text-gray-500">mmHg</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-secondary-100 rounded-lg p-2">
                    <Thermometer className="w-5 h-5 text-secondary-600" />
                  </div>
                  <span className="text-sm text-gray-500">Temperature</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900">98.6</p>
                <p className="text-sm text-gray-500">°F</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Access History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <History className="w-5 h-5 mr-2 text-primary-500" />
                Recent Access
              </h3>
              <div className="space-y-4">
                {mockAccessLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4">
                    <img
                      src={log.image}
                      alt={log.doctor}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{log.doctor}</p>
                      <p className="text-sm text-gray-500">{log.action}</p>
                      <p className="text-xs text-gray-400">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consent Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <UserCheck className="w-5 h-5 mr-2 text-primary-500" />
                Active Consents
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
                    <p className="text-xs text-gray-500">Full Access</p>
                  </div>
                  <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition duration-150">
                    Revoke
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">City Hospital Lab</p>
                    <p className="text-xs text-gray-500">Limited Access</p>
                  </div>
                  <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition duration-150">
                    Revoke
                  </button>
                </div>
              </div>
            </div>

            {/* Report Anomaly */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary-500" />
                Report Concern
              </h3>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-150 flex items-center justify-center">
                <Bell className="w-5 h-5 mr-2" />
                Report Suspicious Activity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}