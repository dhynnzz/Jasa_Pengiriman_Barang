import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Barcode from 'react-barcode';
import toast from 'react-hot-toast';
import { Printer, ArrowLeft } from 'lucide-react';

export default function PrintWaybill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${API_URL}/admin/shipments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setShipment(response.data.data);
        }
      } catch (error) {
        toast.error('Gagal mengambil data resi');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-50">Memuat data resi...</div>;
  }

  if (!shipment) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-red-500 mb-4">Data resi tidak ditemukan.</p>
        <button onClick={() => navigate('/shipments')} className="text-blue-600 underline">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 print:p-0 print:bg-white">
      {/* Controls - Hidden in print */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button 
          onClick={() => navigate('/shipments')}
          className="flex items-center text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700"
        >
          <Printer className="w-5 h-5 mr-2" /> Cetak Resi
        </button>
      </div>

      {/* Waybill Print Canvas */}
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 p-8 shadow-sm print:shadow-none print:border-none print:max-w-none print:w-full print:p-4">
        
        {/* Header section */}
        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-blue-800 uppercase">NABILA TRANS</h1>
            <p className="text-xs text-gray-600 font-semibold mt-1">LAYANAN PENGIRIMAN & CARGO TERPERCAYA</p>
            <p className="text-xs text-gray-500 mt-1">Telp: 0812-3456-7890 | Web: nabilatrans.com</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <Barcode 
              value={shipment.tracking_number} 
              width={1.5} 
              height={50} 
              fontSize={14}
              margin={0}
              background="#ffffff"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Sender & Receiver Info */}
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-2">PENGIRIM (SENDER)</h3>
              <p className="font-bold text-lg">{shipment.sender_name}</p>
              <p className="text-sm text-gray-700">{shipment.origin}</p>
              {/* Dummy phone number since not in DB currently */}
              <p className="text-sm text-gray-700">Telp: -</p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-2">PENERIMA (RECEIVER)</h3>
              <p className="font-bold text-lg">{shipment.receiver_name}</p>
              <p className="text-sm text-gray-700 font-semibold">{shipment.destination}</p>
              <p className="text-sm text-gray-700">Telp: -</p>
            </div>
          </div>

          {/* Shipment Details Info */}
          <div>
            <div className="border border-black p-4 rounded-lg">
              <h3 className="text-sm font-bold uppercase text-center mb-3">INFORMASI PENGIRIMAN</h3>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-600">No. Resi:</span>
                <span className="font-bold text-right">{shipment.tracking_number}</span>

                <span className="text-gray-600">Layanan:</span>
                <span className="font-bold text-right uppercase">{shipment.service_type}</span>

                <span className="text-gray-600">Estimasi Tiba:</span>
                <span className="font-bold text-right">{shipment.estimated_delivery}</span>

                <span className="text-gray-600">Tgl Dibuat:</span>
                <span className="font-bold text-right">
                  {new Date(shipment.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info (Terms or signature) */}
        <div className="border-t-2 border-black pt-4 flex justify-between items-end text-xs">
          <div className="w-1/2 pr-4 text-gray-500">
            * Syarat dan Ketentuan Berlaku. Paket yang tidak diasuransikan maksimal penggantian 10x ongkos kirim.
            Simpan resi ini sebagai bukti pengiriman yang sah.
          </div>
          <div className="w-1/2 flex justify-between px-8">
            <div className="text-center">
              <p className="mb-12">Petugas,</p>
              <p className="font-bold border-b border-black w-24 mx-auto"></p>
            </div>
            <div className="text-center">
              <p className="mb-12">Penerima,</p>
              <p className="font-bold border-b border-black w-24 mx-auto"></p>
            </div>
          </div>
        </div>

        {/* Print only cut-here line */}
        <div className="hidden print:block border-t border-dashed border-gray-400 mt-12 pt-4 text-center text-gray-400 text-xs">
          --- Potong di sini ---
        </div>
      </div>
    </div>
  );
}
