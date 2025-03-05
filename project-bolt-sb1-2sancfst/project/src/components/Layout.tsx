import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import clsx from 'clsx';
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  Users,
  Calendar,
  Bell,
  FileText,
  Settings,
  Activity,
  Lock,
  MessageSquare,
  ClipboardList
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const doctorNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/doctor-dashboard' },
    { name: 'Patients', icon: Users, path: '/doctor/patients' },
    { name: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
    { name: 'Medical Records', icon: FileText, path: '/doctor/records' },
    { name: 'Notifications', icon: Bell, path: '/doctor/notifications' },
    { name: 'Messages', icon: MessageSquare, path: '/doctor/messages' },
    { name: 'Analytics', icon: Activity, path: '/doctor/analytics' },
  ];

  const patientNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/patient-dashboard' },
    { name: 'Medical History', icon: FileText, path: '/patient/history' },
    { name: 'Appointments', icon: Calendar, path: '/patient/appointments' },
    { name: 'Access Control', icon: Lock, path: '/patient/access-control' },
    { name: 'Prescriptions', icon: ClipboardList, path: '/patient/prescriptions' },
    { name: 'Messages', icon: MessageSquare, path: '/patient/messages' },
  ];

  const navItems = user?.role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <div className={clsx(
      'min-h-screen',
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    )}>
      {/* Sidebar */}
      <aside className={clsx(
        'fixed top-0 left-0 z-40 w-64 h-screen transition-transform',
        isDarkMode ? 'bg-gray-800' : 'bg-white',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      )}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 px-2">
            <Link to="/" className="flex items-center space-x-3">
              <div className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                isDarkMode ? 'bg-gray-700' : 'bg-primary-100'
              )}>
                <Activity className={clsx(
                  'w-5 h-5',
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                )} />
              </div>
              <span className="text-lg font-semibold">MedChain</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center px-2 py-2 rounded-lg transition-colors',
                  location.pathname === item.path
                    ? isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-primary-100 text-primary-900'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-4 left-0 right-0 px-3 space-y-2">
            <Link
              to="/settings"
              className={clsx(
                'flex items-center px-2 py-2 rounded-lg transition-colors w-full',
                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
            <button
              onClick={logout}
              className={clsx(
                'flex items-center px-2 py-2 rounded-lg transition-colors w-full',
                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={clsx(
        'transition-all duration-200 ease-in-out',
        'md:ml-64'
      )}>
        {/* Top Navigation */}
        <nav className={clsx(
          'fixed top-0 right-0 z-30 w-full h-16',
          isDarkMode ? 'bg-gray-800' : 'bg-white',
          'md:w-[calc(100%-16rem)]'
        )}>
          <div className="px-4 h-full flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <img
                    src={user?.profileImage}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <span className={clsx(
                  'hidden md:block text-sm font-medium',
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-20 px-4 pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}