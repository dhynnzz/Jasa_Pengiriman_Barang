import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Package, LayoutDashboard, LogOut, Menu } from 'lucide-react';

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: 'Manajemen Resi', path: '/shipments', icon: <Package className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-blue-950 text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 bg-blue-900 border-b border-blue-800">
          <div className="w-8 h-8 bg-white text-blue-900 rounded flex items-center justify-center font-bold mr-3 shadow-sm">
            N
          </div>
          <span className="font-bold text-lg tracking-wide">Nabila Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-blue-900">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-blue-200 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <span className="ml-4 font-bold text-blue-950">Nabila Admin</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center">
             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">AD</span>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="md:hidden mb-6">
             <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
