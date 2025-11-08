import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = React.useState('home');
  const [user, setUser] = React.useState(null);
  const [reports, setReports] = React.useState(() => {
    const saved = localStorage.getItem('reports');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  const handleCreate = (data) => {
    const author = user ? { name: user.name, role: user.role } : { name: 'Warga', role: 'user' };
    setReports((prev) => [{ ...data, author, id: crypto.randomUUID() }, ...prev]);
    setPage('dashboard');
  };

  const handleStatusChange = (report, status) => {
    setReports((prev) => prev.map((r) => (r.id === report.id ? { ...r, status } : r)));
  };

  const handleDelete = (report) => {
    setReports((prev) => prev.filter((r) => r.id !== report.id));
  };

  return (
    <div className="min-h-screen bg-emerald-900">
      <Navbar current={page} onNavigate={setPage} user={user} onLogin={handleLogin} onLogout={handleLogout} />

      {page === 'home' && (
        <>
          <Hero onStartReport={() => setPage('lapor')} />
          <Features />
        </>
      )}

      {page === 'lapor' && (
        <ReportForm onSubmit={handleCreate} />
      )}

      {page === 'dashboard' && (
        <Dashboard reports={reports} user={user} onStatusChange={handleStatusChange} onDelete={handleDelete} />
      )}

      <Footer />
    </div>
  );
}

function Features(){
  const items = [
    { title: 'Desain Melayu Elegan', desc: 'Warna hijau-emas yang hangat, menghadirkan nuansa budaya Melayu.' },
    { title: 'Laporan Terstruktur', desc: 'Formulir lengkap dengan kategori, lokasi, dan deskripsi yang jelas.' },
    { title: 'Dashboard Interaktif', desc: 'Pantau status laporan: baru, proses, atau selesai secara real-time.' },
    { title: 'Peran Admin & User', desc: 'Akses admin untuk memproses laporan, user untuk memantau progres.' },
  ];
  return (
    <section id="fitur" className="bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-extrabold text-emerald-900">Fitur Unggulan</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-emerald-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-300 to-emerald-400 mb-3"/>
              <div className="font-semibold text-emerald-900">{it.title}</div>
              <div className="text-sm text-emerald-700 mt-1">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-extrabold text-yellow-300">Kelurahan Sungai Pakning</div>
          <div className="text-sm text-emerald-200/80 mt-2">Portal layanan pengaduan warga dengan nilai-nilai Melayu: santun, jujur, dan bertanggung jawab.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Menu</div>
          <ul className="space-y-1 text-sm text-emerald-200">
            <li><a href="#" className="hover:text-white">Beranda</a></li>
            <li><a href="#lapor" className="hover:text-white">Lapor</a></li>
            <li><a href="#dashboard" className="hover:text-white">Dashboard</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Kontak</div>
          <div className="text-sm text-emerald-200">Kantor Kelurahan Sungai Pakning</div>
          <div className="text-sm text-emerald-200">Email: layanan@sungaipakning.go.id</div>
          <div className="text-sm text-emerald-200">Telepon: (0761) 123 456</div>
        </div>
      </div>
      <div className="text-center text-xs text-emerald-300 py-4 border-t border-emerald-800">© {new Date().getFullYear()} Kelurahan Sungai Pakning. Semua hak dilindungi.</div>
    </footer>
  );
}
