import React from 'react';
import { Filter, CheckCircle2, Clock, AlertTriangle, Trash2 } from 'lucide-react';

export default function Dashboard({ reports, user, onStatusChange, onDelete }) {
  const [query, setQuery] = React.useState('');
  const [tab, setTab] = React.useState('semua');

  const filtered = reports.filter((r) => {
    const matchTab = tab === 'semua' ? true : r.status === tab;
    const matchQuery = [r.title, r.category, r.location, r.description]
      .join(' ').toLowerCase().includes(query.toLowerCase());
    return matchTab && matchQuery;
  });

  return (
    <section className="bg-gradient-to-b from-white to-emerald-50" id="dashboard">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-900">Dashboard</h2>
            <p className="text-emerald-700">Pantau semua laporan yang masuk dan progres penanganan.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-200 bg-white">
              <Filter className="w-4 h-4 text-emerald-700"/>
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari..." className="outline-none text-sm"/>
            </div>

            <div className="flex items-center rounded-lg overflow-hidden border border-emerald-200">
              {['semua','baru','proses','selesai'].map((t) => (
                <button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 text-sm font-medium capitalize ${tab===t? 'bg-yellow-300 text-emerald-900':'bg-white text-emerald-800 hover:bg-emerald-50'}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, idx) => (
            <ReportCard
              key={idx}
              report={r}
              user={user}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
          {filtered.length===0 && (
            <div className="col-span-full text-center text-emerald-700 py-10">Belum ada data untuk filter saat ini.</div>
          )}
        </div>
      </div>
    </section>
  );
}

function ReportCard({ report, user, onStatusChange, onDelete }) {
  const badgeMap = {
    baru: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    proses: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    selesai: 'bg-emerald-600/10 text-emerald-900 border-emerald-300',
  };
  return (
    <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-emerald-600">{new Date(report.created_at).toLocaleString('id-ID')}</div>
          <h3 className="text-lg font-bold text-emerald-900">{report.title}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border ${badgeMap[report.status]}`}>{report.status}</div>
      </div>
      <div className="mt-2 text-sm text-emerald-800">
        <div className="font-medium">Kategori: <span className="capitalize">{report.category}</span></div>
        {report.location && <div>Lokasi: {report.location}</div>}
        <p className="mt-2 text-emerald-700">{report.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-emerald-600">Oleh: {report.author?.name || 'Warga'}</div>
        <div className="flex items-center gap-2">
          {user?.role === 'admin' && (
            <>
              {report.status !== 'proses' && (
                <button onClick={() => onStatusChange(report, 'proses')} className="px-3 py-1.5 rounded-md bg-yellow-300 hover:bg-yellow-400 text-emerald-900 text-sm font-semibold inline-flex items-center gap-1">
                  <Clock className="w-4 h-4"/> Proses
                </button>
              )}
              {report.status !== 'selesai' && (
                <button onClick={() => onStatusChange(report, 'selesai')} className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4"/> Selesai
                </button>
              )}
              <button onClick={() => onDelete(report)} className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold inline-flex items-center gap-1">
                <Trash2 className="w-4 h-4"/> Hapus
              </button>
            </>
          )}
          {user?.role === 'user' && report.status === 'baru' && (
            <div className="text-xs text-emerald-700 inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-yellow-500"/> Menunggu diproses</div>
          )}
        </div>
      </div>
    </div>
  );
}
