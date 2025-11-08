import React from 'react';
import { Home, Send, LayoutDashboard, User, Shield } from 'lucide-react';

export default function Navbar({ current, onNavigate, user, onLogin, onLogout }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('user');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name: name.trim(), role });
    setOpen(false);
    setName('');
    setRole('user');
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-emerald-900/70 border-b border-emerald-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-emerald-500 ring-2 ring-yellow-300 shadow" />
            <div className="leading-tight">
              <div className="font-extrabold tracking-wide text-yellow-300">Kelurahan Sungai Pakning</div>
              <div className="text-emerald-100/80 text-xs">Portal Layanan Pengaduan</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <NavItem active={current==='home'} onClick={() => onNavigate('home')} icon={<Home className="w-4 h-4"/>}>
              Beranda
            </NavItem>
            <NavItem active={current==='lapor'} onClick={() => onNavigate('lapor')} icon={<Send className="w-4 h-4"/>}>
              Lapor
            </NavItem>
            <NavItem active={current==='dashboard'} onClick={() => onNavigate('dashboard')} icon={<LayoutDashboard className="w-4 h-4"/>}>
              Dashboard
            </NavItem>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-full bg-emerald-800/60 text-emerald-50 text-sm flex items-center gap-2 border border-emerald-700">
                  {user.role === 'admin' ? <Shield className="w-4 h-4 text-yellow-300"/> : <User className="w-4 h-4 text-yellow-300"/>}
                  <span className="font-medium">{user.name}</span>
                  <span className="text-emerald-200/80">({user.role})</span>
                </div>
                <button onClick={onLogout} className="px-3 py-1.5 text-sm rounded-md bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold transition">
                  Keluar
                </button>
              </div>
            ) : (
              <div className="relative">
                <button onClick={() => setOpen((v) => !v)} className="px-3 py-1.5 rounded-md bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold transition">
                  Masuk
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-72 p-4 rounded-lg bg-white shadow-lg border border-emerald-100">
                    <div className="font-semibold text-emerald-900 mb-2">Masuk Akun</div>
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div>
                        <label className="block text-sm text-emerald-800 mb-1">Nama</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Masukkan nama" />
                      </div>
                      <div>
                        <label className="block text-sm text-emerald-800 mb-1">Peran</label>
                        <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full px-3 py-2 rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                          <option value="user">Warga (User)</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Lanjutkan</button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2 pb-3">
          <MobileNavButton active={current==='home'} onClick={() => onNavigate('home')}>
            <Home className="w-4 h-4"/> Beranda
          </MobileNavButton>
          <MobileNavButton active={current==='lapor'} onClick={() => onNavigate('lapor')}>
            <Send className="w-4 h-4"/> Lapor
          </MobileNavButton>
          <MobileNavButton active={current==='dashboard'} onClick={() => onNavigate('dashboard')}>
            <LayoutDashboard className="w-4 h-4"/> Dashboard
          </MobileNavButton>
        </div>
      </div>
    </header>
  );
}

function NavItem({ children, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition border ${
        active
          ? 'bg-yellow-300 text-emerald-900 border-yellow-400'
          : 'text-emerald-50/90 hover:text-white hover:bg-emerald-800/50 border-transparent'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function MobileNavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 justify-center transition border ${
        active
          ? 'bg-yellow-300 text-emerald-900 border-yellow-400'
          : 'text-emerald-50/90 hover:text-white hover:bg-emerald-800/50 border-transparent'
      }`}
    >
      {children}
    </button>
  );
}
