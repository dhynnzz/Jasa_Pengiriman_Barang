import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Save, Building2, Phone, Mail, Globe, User, Key, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('company'); // 'company' or 'profile'
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    company_name: '',
    company_phone: '',
    company_email: '',
    company_address: '',
    company_website: ''
  });

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      const [settingsRes, profileRes] = await Promise.all([
        axios.get(`${API_URL}/admin/settings`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/admin/profile`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (Object.keys(settingsRes.data).length > 0) {
        setFormData(prev => ({ ...prev, ...settingsRes.data }));
      }

      setProfileData({
        name: profileRes.data.name || '',
        email: profileRes.data.email || '',
        password: '' // empty password by default
      });

    } catch (error) {
      toast.error('Gagal mengambil data pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_URL}/admin/settings`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Pengaturan perusahaan berhasil disimpan!');
    } catch (error) {
      toast.error('Gagal menyimpan pengaturan perusahaan');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/admin/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Profil berhasil diperbarui!');
      
      // Update local storage and trigger event for AdminLayout to update Header
      localStorage.setItem('adminName', response.data.name);
      window.dispatchEvent(new Event('profileUpdated'));

      // Clear password field
      setProfileData(prev => ({ ...prev, password: '' }));

    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Pengaturan Sistem">
        <div className="p-8 text-center text-gray-500">Memuat pengaturan...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Pengaturan Sistem">
      <div className="max-w-4xl">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('company')}
            className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'company' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profil Perusahaan
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'profile' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profil Saya
          </button>
        </div>

        {/* Tab Content: Company */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" /> Profil Perusahaan
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Informasi ini akan ditampilkan di website publik dan resi pengiriman.
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perusahaan</label>
                  <input 
                    type="text" 
                    value={formData.company_name}
                    onChange={e => setFormData({...formData, company_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Contoh: PT Nabila Trans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon Utama</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      value={formData.company_phone}
                      onChange={e => setFormData({...formData, company_phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="08123456789"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Perusahaan</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      value={formData.company_email}
                      onChange={e => setFormData({...formData, company_email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="info@nabilatrans.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      value={formData.company_website}
                      onChange={e => setFormData({...formData, company_website: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="https://nabilatrans.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap Kantor Pusat</label>
                <textarea 
                  rows="3" 
                  value={formData.company_address}
                  onChange={e => setFormData({...formData, company_address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Jl. Raya Candi 3, Karangbesuki..."
                ></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={handleSaveSettings}
                disabled={saving}
                className="flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" /> {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Profile */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" /> Profil Saya
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Perbarui informasi akun dan kata sandi Anda di sini.
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-1 text-gray-400" /> Nama Tampilan
                </label>
                <input 
                  type="text" 
                  required
                  value={profileData.name}
                  onChange={e => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-gray-400" /> Alamat Email Login
                </label>
                <input 
                  type="email" 
                  required
                  value={profileData.email}
                  onChange={e => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Key className="w-4 h-4 mr-1 text-gray-400" /> Kata Sandi Baru
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={profileData.password}
                    onChange={e => setProfileData({...profileData, password: e.target.value})}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Kosongkan jika tidak ingin mengubah kata sandi"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-amber-600 font-medium">*Minimal 6 karakter. Biarkan kosong jika tidak ingin diubah.</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                type="submit"
                disabled={savingProfile}
                className="flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" /> {savingProfile ? 'Menyimpan...' : 'Perbarui Profil'}
              </button>
            </div>
          </form>
        )}

      </div>
    </AdminLayout>
  );
}
