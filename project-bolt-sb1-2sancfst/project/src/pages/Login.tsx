import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Lock, Mail, Stethoscope, User, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

export default function Login() {
  const [activeTab, setActiveTab] = useState<'doctor' | 'patient'>('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(activeTab === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={clsx(
      "min-h-screen flex items-center justify-center p-4 transition-colors duration-200",
      isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-primary-50 to-secondary-50"
    )}>
      <div className={clsx(
        "w-full max-w-4xl rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8",
        isDarkMode ? "bg-gray-800" : "bg-white"
      )}>
        {/* Left Side - Login Form */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center",
                isDarkMode ? "bg-gray-700" : "bg-primary-100"
              )}>
                <Stethoscope className={clsx(
                  "w-6 h-6",
                  isDarkMode ? "text-primary-400" : "text-primary-600"
                )} />
              </div>
              <h1 className={clsx(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Medical Blockchain
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className={clsx(
                "p-2 rounded-lg",
                isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-600"
              )}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('doctor')}
              className={clsx(
                "flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center space-x-2",
                activeTab === 'doctor'
                  ? isDarkMode
                    ? "bg-primary-600 text-white"
                    : "bg-primary-600 text-white"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-600"
              )}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctor Login</span>
            </button>
            <button
              onClick={() => setActiveTab('patient')}
              className={clsx(
                "flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center space-x-2",
                activeTab === 'patient'
                  ? isDarkMode
                    ? "bg-primary-600 text-white"
                    : "bg-primary-600 text-white"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-600"
              )}
            >
              <User className="w-4 h-4" />
              <span>Patient Login</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={clsx(
                "block text-sm font-medium mb-2",
                isDarkMode ? "text-gray-200" : "text-gray-700"
              )}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={clsx(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5",
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                )} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(
                    "pl-10 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  )}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className={clsx(
                "block text-sm font-medium mb-2",
                isDarkMode ? "text-gray-200" : "text-gray-700"
              )}>
                Password
              </label>
              <div className="relative">
                <Lock className={clsx(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5",
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                )} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={clsx(
                    "pl-10 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  )}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-200"
            >
              Sign In as {activeTab === 'doctor' ? 'Doctor' : 'Patient'}
            </button>
          </form>
        </div>

        {/* Right Side - Features */}
        <div className={clsx(
          "hidden md:block p-6 rounded-xl",
          isDarkMode ? "bg-gray-700" : "bg-gray-50"
        )}>
          <h2 className={clsx(
            "text-xl font-semibold mb-6",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            {activeTab === 'doctor' ? 'Doctor Features' : 'Patient Features'}
          </h2>
          <ul className="space-y-4">
            {activeTab === 'doctor' ? (
              <>
                <li className={clsx(
                  "flex items-start space-x-3",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <User className="w-5 h-5 mt-1 text-primary-500" />
                  <span>Manage patient records and appointments</span>
                </li>
                <li className={clsx(
                  "flex items-start space-x-3",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <Lock className="w-5 h-5 mt-1 text-primary-500" />
                  <span>Secure access to medical histories</span>
                </li>
                <li className={clsx(
                  "flex items-start space-x-3",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <Mail className="w-5 h-5 mt-1 text-primary-500" />
                  <span>Real-time notifications and alerts</span>
                </li>
              </>
            ) : (
              <>
                <li className={clsx(
                  "flex items-start space-x-3",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <User className="w-5 h-5 mt-1 text-primary-500" />
                  <span>View and manage your health records</span>
                </li>
                <li className={clsx(
                  "flex items-start space-x-3",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <Lock className="w-5 h-5 mt-1 text-primary-500" />
                  <span>Control access to your medical data</span>
                </li>
                <li className={clsx(
                  "flex items-start space-x-3",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <Mail className="w-5 h-5 mt-1 text-primary-500" />
                  <span>Receive health updates and recommendations</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}