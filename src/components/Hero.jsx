import React from 'react';

export default function Hero({ onStartReport }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-300/20 border border-yellow-300/40 text-yellow-200 text-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
            Layanan Keluhan Warga Kelurahan Sungai Pakning
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-yellow-300 drop-shadow-sm">
            Sampaikan Keluhan Anda dengan Mudah, Cepat, dan Transparan
          </h1>
          <p className="mt-4 text-emerald-100/90">
            Portal ini memudahkan warga untuk menyampaikan laporan terkait infrastruktur, lingkungan, administrasi, dan pelayanan publik. Pantau progres penanganan langsung dari dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={onStartReport} className="px-5 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold shadow">
              Buat Laporan Sekarang
            </button>
            <a href="#fitur" className="px-5 py-3 rounded-lg border border-emerald-700 hover:bg-emerald-800/60 text-emerald-50 font-semibold text-center">
              Lihat Fitur
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-yellow-200 via-emerald-200 to-yellow-100 opacity-90"></div>
          <div className="absolute inset-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md p-6">
            <div className="text-sm text-yellow-200 font-semibold">Jejak Melayu</div>
            <div className="mt-2 text-emerald-50/90 text-sm">
              Tema warna dan motif terinspirasi dari budaya Melayu: harmoni, sopan, dan elegan.
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <InfoCard label="Respon Cepat" value="24/7"/>
              <InfoCard label="Tiket Diproses" value="Real-time"/>
              <InfoCard label="Transparansi" value="Terjamin"/>
            </div>
          </div>
        </div>
      </div>

      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80L60 90C120 100 240 120 360 110C480 100 600 60 720 65C840 70 960 120 1080 140C1200 160 1320 150 1380 145L1440 140V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0V80Z" fill="#064E3B" fillOpacity="0.8"/>
      </svg>
    </section>
  );
}

function InfoCard({ label, value }){
  return (
    <div className="rounded-lg bg-emerald-900/40 border border-emerald-700 p-3">
      <div className="text-xs text-emerald-200/80">{label}</div>
      <div className="text-lg font-bold text-yellow-300">{value}</div>
    </div>
  );
}
