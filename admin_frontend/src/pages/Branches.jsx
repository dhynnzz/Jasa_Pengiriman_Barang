import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Store, Plus, Search, Edit2, Trash2 } from 'lucide-react';

export default function Branches() {
  const branches = [
    { id: 1, name: 'Kantor Pusat Malang', type: 'Kantor Pusat', address: 'Jl. Raya Candi 3, Karangbesuki', city: 'Malang', phone: '0341-123456' },
    { id: 2, name: 'Agen Nabila Surabaya', type: 'Agen', address: 'Jl. Ahmad Yani No. 100', city: 'Surabaya', phone: '0812-9999-8888' },
    { id: 3, name: 'Cabang Jakarta Selatan', type: 'Cabang', address: 'Jl. Sudirman Kav 20', city: 'Jakarta', phone: '021-9876543' },
  ];

  return (
    <AdminLayout title="Manajemen Cabang & Agen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari cabang atau kota..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Plus className="w-5 h-5 mr-2" /> Tambah Cabang
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Nama Cabang</th>
                <th className="px-6 py-4 font-medium text-gray-900">Tipe</th>
                <th className="px-6 py-4 font-medium text-gray-900">Kota</th>
                <th className="px-6 py-4 font-medium text-gray-900">Alamat Lengkap</th>
                <th className="px-6 py-4 font-medium text-gray-900">Telepon</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {branches.map(branch => (
                <tr key={branch.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Store className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-900">{branch.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      branch.type === 'Kantor Pusat' ? 'bg-purple-100 text-purple-700' :
                      branch.type === 'Cabang' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {branch.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{branch.city}</td>
                  <td className="px-6 py-4 text-gray-500">{branch.address}</td>
                  <td className="px-6 py-4 text-gray-700">{branch.phone}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
