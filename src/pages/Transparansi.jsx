import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Transparansi = () => {
  const summary = {
    pendapatan: "Rp 1.558.326.400",
    belanja: "Rp 1.273.943.000",
    pembiayaan: "Rp 284.383.400"
  };

  const sumberPendapatan = [
    { nama: "Dana Desa (DD)", nilai: "Rp 921.917.000", persen: 60 },
    { nama: "Alokasi Dana Desa (ADD)", nilai: "Rp 621.425.200", persen: 39 },
    { nama: "Bagi Hasil Pajak & Retribusi", nilai: "Rp 14.984.200", persen: 1 },
  ];

  const detailBelanja = [
    {
      id: 1,
      bidang: "Penyelenggaraan Pemerintahan Desa",
      total: "Rp 555.282.710",
      icon: "🏛️",
      color: "bg-blue-600",
      items: [
        { nama: "Siltap & Tunjangan Kades/Perangkat", nilai: "Rp 387.724.000" },
        { nama: "Jaminan Sosial Ketenagakerjaan", nilai: "Rp 13.501.156" },
        { nama: "Operasional Pemerintah Desa", nilai: "Rp 143.428.330" },
        { nama: "Penyediaan Tunjangan BPD", nilai: "Rp 73.200.000" },
        { nama: "Operasional BPD", nilai: "Rp 27.157.415" },
        { nama: "Penyediaan Sarana Prasarana", nilai: "Rp 2.788.809" },
        { nama: "Penyelenggaraan Tata Praja", nilai: "Rp 19.526.000" },
      ]
    },
    {
      id: 2,
      bidang: "Pelaksanaan Pembangunan Desa",
      total: "Rp 541.457.090",
      icon: "🏗️",
      color: "bg-yellow-500",
      items: [
        { nama: "Penyelenggaraan PAUD/TK/TPA", nilai: "Rp 39.000.000" },
        { nama: "Pembangunan Gedung PAUD", nilai: "Rp 191.000.000" },
        { nama: "Penyelenggaraan Pos Kesehatan Desa", nilai: "Rp 35.700.000" },
        { nama: "Penyelenggaraan Posyandu (Makanan Tambahan)", nilai: "Rp 24.000.000" },
        { nama: "Pembangunan/Rehabilitasi Posyandu", nilai: "Rp 180.000.000" },
        { nama: "Penyusunan Dokumen Perencanaan", nilai: "Rp 7.122.000" },
        { nama: "Pengelolaan Lingkungan Hidup", nilai: "Rp 54.000.000" },
        { nama: "Pemeliharaan Sarana Energi Alternatif", nilai: "Rp 10.635.090" },
      ]
    },
    {
      id: 3,
      bidang: "Pembinaan Kemasyarakatan",
      total: "Rp 108.784.200",
      icon: "🤝",
      color: "bg-purple-600",
      items: [
        { nama: "Penyelenggaraan Pos Keamanan Desa", nilai: "Rp 7.200.000" },
        { nama: "Pengiriman Kontingen Seni & Budaya", nilai: "Rp 4.000.000" },
        { nama: "Pembinaan Kerukunan Umat Beragama", nilai: "Rp 57.600.000" },
        { nama: "Kegiatan Kepemudaan & Olahraga", nilai: "Rp 14.984.200" },
        { nama: "Pembinaan LKMD/LPM/LPMD", nilai: "Rp 18.000.000" },
        { nama: "Pembinaan PKK", nilai: "Rp 7.000.000" },
      ]
    },
    {
      id: 4,
      bidang: "Pemberdayaan Masyarakat",
      total: "Rp 28.519.000",
      icon: "🌱",
      color: "bg-green-600",
      items: [
        { nama: "Peningkatan Produksi Tanaman Pangan", nilai: "Rp -" },
        { nama: "Pelatihan & Pemberdayaan Perempuan", nilai: "Rp 17.162.000" },
        { nama: "Pelatihan Pengelolaan BUM Desa", nilai: "Rp 11.357.000" },
      ]
    },
    {
      id: 5,
      bidang: "Penanggulangan Bencana",
      total: "Rp 39.900.000",
      icon: "🚑",
      color: "bg-red-600",
      items: [
        { nama: "Kegiatan Penanggulangan Bencana", nilai: "Rp 7.500.000" },
        { nama: "Penanganan Keadaan Mendesak (BLT)", nilai: "Rp 32.400.000" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <section className="pt-32 pb-12 bg-green-900 text-white px-6 rounded-b-[3rem] shadow-xl">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Transparansi Anggaran
          </motion.h1>
          <p className="text-green-200 text-lg font-medium">APB Desa Waginopo Tahun Anggaran 2025</p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 -mt-10 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{delay: 0.1}} className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Pendapatan</h3>
              <p className="text-2xl md:text-3xl font-black text-green-700">{summary.pendapatan}</p>
           </motion.div>
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{delay: 0.2}} className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-red-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Belanja</h3>
              <p className="text-2xl md:text-3xl font-black text-red-700">{summary.belanja}</p>
           </motion.div>
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{delay: 0.3}} className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Pembiayaan Netto</h3>
              <p className="text-2xl md:text-3xl font-black text-blue-700">{summary.pembiayaan}</p>
              <p className="text-xs text-gray-400 mt-1">(SiLPA 2024 + Penerimaan Lain)</p>
           </motion.div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
           <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-green-500 pl-4">Sumber Pendapatan Desa</h3>
           <div className="space-y-6">
              {sumberPendapatan.map((item, index) => (
                 <div key={index}>
                    <div className="flex justify-between mb-2">
                       <span className="font-semibold text-gray-700">{item.nama}</span>
                       <span className="font-bold text-green-700">{item.nilai}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.persen}%` }}
                          transition={{ duration: 1 }}
                          className="bg-green-500 h-3 rounded-full relative"
                       >
                       </motion.div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <h3 className="text-2xl font-black text-center text-gray-800 mb-8 uppercase tracking-widest">Rincian Belanja Desa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {detailBelanja.map((bidang, index) => (
              <motion.div 
                 key={bidang.id}
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                 <div className={`${bidang.color} p-6 text-white flex justify-between items-center`}>
                    <div className="flex items-center gap-3">
                       <span className="text-3xl">{bidang.icon}</span>
                       <h4 className="font-bold text-lg leading-tight">{bidang.bidang}</h4>
                    </div>
                 </div>
                 
                 <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Anggaran</span>
                    <span className={`font-black text-lg ${bidang.color.replace('bg-', 'text-')}`}>{bidang.total}</span>
                 </div>

                 <div className="p-6">
                    <ul className="space-y-3">
                       {bidang.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between items-start text-sm border-b border-dashed border-gray-100 pb-2 last:border-0 last:pb-0">
                             <span className="text-gray-600 w-2/3">{item.nama}</span>
                             <span className="font-bold text-gray-800 w-1/3 text-right">{item.nilai}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </motion.div>
           ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm">
           <p>Sumber Data: Baliho APB Desa Waginopo Tahun Anggaran 2025</p>
           <p className="mt-1 font-semibold">Transparan, Akuntabel, Partisipatif</p>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Transparansi;