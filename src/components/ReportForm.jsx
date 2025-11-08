import React from 'react';
import { Send } from 'lucide-react';

export default function ReportForm({ onSubmit }) {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('infrastruktur');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({
      title: title.trim(),
      category,
      description: description.trim(),
      location: location.trim(),
      status: 'baru',
      created_at: new Date().toISOString(),
    });
    setTitle('');
    setCategory('infrastruktur');
    setDescription('');
    setLocation('');
  };

  return (
    <section className="bg-emerald-50" id="lapor">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-emerald-900">Form Laporan Keluhan</h2>
          <p className="text-emerald-700">Sampaikan keluhan Anda secara jelas agar segera ditindaklanjuti.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-emerald-100 shadow-sm p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-emerald-800 mb-1">Judul Laporan</label>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full px-3 py-2 rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Contoh: Jalan Berlubang di RT 02"/>
            </div>
            <div>
              <label className="block text-sm text-emerald-800 mb-1">Kategori</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full px-3 py-2 rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="infrastruktur">Infrastruktur</option>
                <option value="lingkungan">Lingkungan</option>
                <option value="administrasi">Administrasi</option>
                <option value="pelayanan">Pelayanan Publik</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-emerald-800 mb-1">Lokasi</label>
            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full px-3 py-2 rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Contoh: Jl. Merdeka, dekat Balai Desa"/>
          </div>

          <div>
            <label className="block text-sm text-emerald-800 mb-1">Deskripsi</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={5} className="w-full px-3 py-2 rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Jelaskan keluhan secara singkat dan jelas"></textarea>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-emerald-700">Data Anda akan disimpan dengan aman.</div>
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              <Send className="w-4 h-4"/> Kirim Laporan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
