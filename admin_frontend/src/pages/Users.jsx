import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users as UsersIcon, Shield, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Users() {
  const users = [
    { id: 1, name: 'Admin Utama', email: 'admin@admin.com', role: 'Super Admin', last_login: '2 Jam yang lalu' },
    { id: 2, name: 'Sinta Finance', email: 'finance@nabilatrans.com', role: 'Keuangan', last_login: 'Kemarin' },
    { id: 3, name: 'Bagas Gudang', email: 'gudang@nabilatrans.com', role: 'Staff Operasional', last_login: '3 Hari yang lalu' },
  ];

  return (
    <AdminLayout title="Manajemen Pengguna (Admin)">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Daftar Akun Staf</h2>
            <p className="text-sm text-gray-500 mt-1">Kelola hak akses untuk masuk ke dashboard admin ini.</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Plus className="w-5 h-5 mr-2" /> Tambah Staf Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Nama Lengkap</th>
                <th className="px-6 py-4 font-medium text-gray-900">Email Login</th>
                <th className="px-6 py-4 font-medium text-gray-900">Hak Akses (Role)</th>
                <th className="px-6 py-4 font-medium text-gray-900">Login Terakhir</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Shield className={`w-4 h-4 mr-1 ${user.role === 'Super Admin' ? 'text-red-500' : 'text-gray-400'}`} />
                      <span className={`font-medium ${user.role === 'Super Admin' ? 'text-red-600' : 'text-gray-700'}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.last_login}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 className="w-4 h-4" /></button>
                    {user.role !== 'Super Admin' && (
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
