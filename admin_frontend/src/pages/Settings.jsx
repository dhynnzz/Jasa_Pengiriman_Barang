import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Save, Building2, Phone, Mail, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <AdminLayout title="Pengaturan Sistem">
      <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Informasi Perusahaan</h2>
          <p className="text-sm text-gray-500 mt-1">Perbarui detail kontak dan informasi identitas perusahaan Anda di sini.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perusahaan</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" defaultValue="Nabila Trans" className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website Utama</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" defaultValue="https://nabilatrans.com" className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Perusahaan</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" defaultValue="cs@nabilatrans.com" className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" defaultValue="0812-3456-7890" className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Kantor Pusat</label>
            <textarea rows="3" defaultValue="Jl. Raya Candi 3, Karangbesuki, Kec. Sukun, Kota Malang, Jawa Timur 65146" className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3"></textarea>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
          <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
