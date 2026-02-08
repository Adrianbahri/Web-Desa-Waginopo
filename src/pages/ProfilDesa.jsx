import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gambarPeta from '../assets/Administrasi1.png';

const dataVisiMisi = {
  visi: "Terwujudnya Desa Waginopo Sebagai Desa Wisata Yang Ber-ADAB",
  misi: [
    "Meningkatkan Sumber Daya Manusia Desa Waginopo",
    "Meningkatkan Potensi Desa Waginopo",
    "Meningkatkan Infrastruktur Yang Berbasis Pemerataan Dan Berwawasan Lingkungan",
    "Meningkatkan Pendapatan Asli Desa Waginopo"
  ]
};

const dataAdministrasi = {
  peta: gambarPeta,
  total: {
    penduduk: 773, 
    kk: 237,       
    lk: 393,       
    pr: 380        
  },
  dusun: [
    {
      nama: "Dusun Waginopo",
      penduduk: 368, kk: 116, lk: 186, pr: 182,
      warna: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: "text-yellow-500", dot: "bg-yellow-500"
    },
    {
      nama: "Dusun Toliamba Jaya",
      penduduk: 405, kk: 121, lk: 207, pr: 198,
      warna: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", icon: "text-purple-500", dot: "bg-purple-500"
    }
  ]
};

const dataSejarah = {
  narasi: [
    "Pada tahun 1969 sampai 2006, Desa Waginopo masih merupakan wilayah Desa Tindoi yang berstatus dusun.",
    "Atas perjuangan tokoh masyarakat, pada tahun 2006 Dusun Waginopo mekar menjadi satu desa terpisah.",
    "Pada tahun 2007, Desa Waginopo diresmikan dengan Pj. Kepala Desa La Ode Taufik."
  ],
  kepalaDesa: [
    { periode: "2007 - 2008", nama: "La Ode Taufik (Pj)", ket: "Pejabat Sementara" },
    { periode: "2008 - 2014", nama: "La Ode Iwi", ket: "Definitif Pertama" },
    { periode: "2014 - 2020", nama: "La Ode Iwi", ket: "Periode Kedua" },
    { periode: "2020 - 2021", nama: "Pj. Muh Muchzamil", ket: "Pejabat Sementara" },
    { periode: "2021 - Sekarang", nama: "La Rujali", ket: "Kepala Desa Saat Ini" },
  ]
};

const dataGeografis = {
  batas: [
    { arah: "Utara", desa: "Desa Tindoi" },
    { arah: "Selatan", desa: "Desa Posalu" },
    { arah: "Barat", desa: "Kelurahan Wandoka" },
    { arah: "Timur", desa: "Desa Pada Raya Makmur" },
  ],
  luas: "1.105 Ha",
  penggunaanLahan: [
    { jenis: "Tanah Perkebunan", luas: "74,43 Ha" },
    { jenis: "Tanah Pertanian", luas: "80,25 Ha" },
    { jenis: "Tanah Pekarangan", luas: "3,18 Ha" },
    { jenis: "Tanah Pemukiman", luas: "1,2 Ha" },
  ]
};
const strukturPemdes = {
  pimpinan: { 
    nama: "La Rujali", 
    jabatan: "Kepala Desa", 
    color: "bg-red-600", 
    foto: "/images/perangkat/kades.jpg"
  },
  sekretaris: { 
    nama: "Ahirudin, ST", 
    jabatan: "Sekretaris Desa", 
    color: "bg-orange-600", 
    foto: "/images/perangkat/sekdes.jpg" 
  },
  kaur: [
    { nama: "Tuti Rahmadian", jabatan: "Kaur Perencanaan", foto: "/images/perangkat/KaurPerencanaan.jpeg" },
    { nama: "Wa Ode Haijrina", jabatan: "Kaur Keuangan", foto: "/images/perangkat/Bendahara.jpeg" },
    { nama: "La Ode Rujunia", jabatan: "Kaur Umum/TU", foto: "/images/perangkat/kaurUmum.jpeg" },
    { nama: "Sri Yulianti", jabatan: "Staf Kaur", foto: "/images/perangkat/Stafkaur.jpeg" },
  ],
  kasi: [
    { nama: "Ratna", jabatan: "Kasi Pemerintahan", foto: "/images/perangkat/KasiPemerintahan.jpeg" },
    { nama: "Ld Ismanto", jabatan: "Kasi Pelayanan", foto: "/images/perangkat/KasiPelayanan.jpeg" },
    { nama: "La Ode Mahyudin", jabatan: "Kasi Kesejahteraan", foto: "/images/perangkat/KasiKese.jpeg" },
    { nama: "Elfrida Fitriani", jabatan: "Staf Kasi", foto: "/images/perangkat/Stafkepdus.jpeg" },
  ],
  wilayah: [
    { nama: "La Ode Darsun", jabatan: "Kadus Toliamba Jaya", foto: "/images/perangkat/KadusTolimba.jpeg" }, 
    { nama: "Muhkidam", jabatan: "Kadus Waginopo", foto: "/images/perangkat/KadusWaginopo.jpeg" },
    { nama: "Wa Fida S", jabatan: "Staf Kadus", foto: "/images/perangkat/Stafkepdus.jpeg" },
  ]
};

const strukturBPD = {
  ketua: { nama: "La Ode Pitu", jabatan: "Ketua BPD" },
  wakil: { nama: "Wa Cici, S.Pd", jabatan: "Wakil Ketua" },
  sekretaris: { nama: "Ayub, S.Pd", jabatan: "Sekretaris" },
  anggota: [{ nama: "Saharudin", jabatan: "Anggota" }, { nama: "Hamirudin", jabatan: "Anggota" }]
};

const strukturLPM = {
  ketua: { nama: "La Ode Rujunia", jabatan: "Ketua LPM" },
  wakil: { nama: "Karmila Djamari", jabatan: "Wakil Ketua" },
  sekretaris: { nama: "Wd. Irda Rahma Diansari", jabatan: "Sekretaris" },
  bendahara: { nama: "Nulfa Asrinawati", jabatan: "Bendahara" },
  seksi: [{ nama: "Rumiadin Ondi", jabatan: "Ketertiban" }, { nama: "Siti Harmawati", jabatan: "Kebersihan" }]
};

const strukturLembagaSeni = {
  ketua: { nama: "Wa Ode Dangsahara, S.Pd", jabatan: "Ketua" },
  sekretaris: { nama: "La Ode Manimuhdar, S.Pd", jabatan: "Sekretaris" },
  bendahara: { nama: "Emmy, S.Pd", jabatan: "Bendahara" },
};

const strukturPKK = {
  pembina: { nama: "La Rujali", jabatan: "Pembina" },
  ketua: { nama: "Karmila Djamari, S.Pd", jabatan: "Ketua TP. PKK" },
  wakilKetua: { nama: "Ny. Juhdaria", jabatan: "Wakil Ketua" },
  sekretaris: { nama: "Ny. Wa Ode Dangsahara", jabatan: "Sekretaris" },
  bendahara: { nama: "Ny. Wa Sinta", jabatan: "Bendahara" },
  pokja: [
    { id: "I", ketua: "Ny. Wa Ode Hajrina", sekretaris: "Ny. Nulfa Asrianti", bendahara: "Ny. Atisari", anggota: ["Ny. Sriyulianti", "Ny. Wa Ode Sabaria", "Ny. Nirwana"] },
    { id: "II", ketua: "Ny. Wa Leni", sekretaris: "Ny. Jumiati D", bendahara: "Ny. Wasia", anggota: ["Ny. Siti Harmawati", "Ny. Wa Ode Basmawati"] },
    { id: "III", ketua: "Ny. Ratna", sekretaris: "Ny. Waria", bendahara: "Ny. Dra. Hariati", anggota: ["Ny. Jamnia", "Ny. Putiani"] },
    { id: "IV", ketua: "Ny. Wa Juwi", sekretaris: "Ny. Wa Aruwi", bendahara: "Ny. Wa Ode Muli", anggota: ["Ny. Wa Yita", "Ny. Wa Ode Marnia"] },
  ]
};

const strukturKarangTaruna = {
  ketua: { nama: "Ahmad Riady", jabatan: "Ketua" },
  wakilKetua: { nama: "Sudirman", jabatan: "Wakil Ketua" },
  sekretaris: { nama: "Suriana, S.Pd", jabatan: "Sekretaris" },
  bendahara: { nama: "-", jabatan: "Bendahara" },
  wakilSekretaris: [{ nama: "Asri Yani", jabatan: "Wkl Sek I" }],
  wakilBendahara: [{ nama: "Wa Ode Oda", jabatan: "Wkl Ben I" }],
  seksi: [
    { bidang: "Organisasi", nama: "Junaidin, S.Pd" }, { bidang: "Humas", nama: "Mufrianto, SH" },
    { bidang: "Pendidikan", nama: "La Ode Rustam" }, { bidang: "Kesehatan", nama: "Jayanti" },
    { bidang: "Kerohanian", nama: "Aris" }, { bidang: "Ekonomi", nama: "Nulfa" },
    { bidang: "Pariwisata", nama: "La Ode Rumiadin" }, { bidang: "Perempuan", nama: "Jamalia" },
    { bidang: "Olahraga", nama: "La Ode Pitu" },
  ]
};

const strukturKoperasi = {
  badan: "Rapat Anggota",
  penasehat: "Dinas Koperasi Kab. Wakatobi",
  pengawas: [{ nama: "La Rujali", jabatan: "Ketua" }, { nama: "Hardiani", jabatan: "Anggota" }],
  pengurusInti: [
    { nama: "Andriano Saputra", jabatan: "Ketua", color: "bg-red-700" },
    { nama: "Fitri Yani", jabatan: "Sekretaris", color: "bg-red-600" },
    { nama: "Asfita", jabatan: "Bendahara", color: "bg-red-600" },
  ]
};

const StructureCard = ({ jabatan, nama, foto, color = "bg-green-700", sub = false }) => (
  <motion.div whileHover={{ scale: 1.05 }} className={`flex flex-col items-center p-3 md:p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all flex-shrink-0 ${sub ? 'w-32 md:w-44' : 'w-40 md:w-56'} bg-white border-gray-100 mx-auto`}>
    <div className={`relative mb-3 ${sub ? 'h-14 w-14 md:h-20 md:w-20' : 'h-16 w-16 md:h-24 md:w-24'} rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-50`}>
      {foto ? (
        <img src={foto} alt={nama} className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.classList.remove('hidden'); e.target.nextSibling.classList.add('flex')}} />
      ) : null}
      <div className={`absolute inset-0 items-center justify-center text-white font-bold ${sub ? 'text-lg' : 'text-2xl'} ${color} ${foto ? 'hidden' : 'flex'}`}>
        {nama && nama !== "-" ? nama.charAt(0) : "?"}
      </div>
    </div>
    <span className={`font-bold text-gray-800 text-center leading-tight ${sub ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'}`}>{nama}</span>
    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-green-600 font-bold mt-1 text-center bg-green-50 px-2 py-1 rounded-md">{jabatan}</span>
  </motion.div>
);

const PokjaCard = ({ pokja }) => (
  <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all h-full">
    <div className="text-center mb-4"><h4 className="text-xl font-black text-teal-800 border-b-2 border-teal-500 inline-block pb-1">POKJA {pokja.id}</h4></div>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500 font-bold">Ketua</span><span className="font-semibold text-gray-800 text-right text-xs md:text-sm">{pokja.ketua}</span></div>
      <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500 font-bold">Sekretaris</span><span className="font-semibold text-gray-800 text-right text-xs md:text-sm">{pokja.sekretaris}</span></div>
    </div>
  </div>
);

const ProfilDesa = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || 'Selayang Pandang');
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => { if (tab) setActiveTab(tab); }, [tab]);
  const handleTabChange = (newTab) => { setActiveTab(newTab); navigate(`/profil/${newTab}`); };

  const renderContent = () => {
    switch(activeTab) {
      case 'Selayang Pandang':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20">
            {/* VISI & MISI */}
            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-white border border-gray-100">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-teal-500"></div>
               <div className="grid md:grid-cols-12 gap-0">
                  <div className="md:col-span-5 bg-green-900 text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                     <div className="relative z-10">
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden mx-auto mb-6">
                           <img src={strukturPemdes.pimpinan.foto} alt="Kades" className="w-full h-full object-cover" onError={(e) => {e.target.src = "https://via.placeholder.com/300x400?text=KADES"}} />
                        </div>
                        <h3 className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-2">Visi Desa</h3>
                        <p className="text-xl md:text-2xl font-black leading-snug italic">"{dataVisiMisi.visi}"</p>
                        <div className="mt-6 font-bold text-green-200 text-sm">{strukturPemdes.pimpinan.nama}<br/><span className="text-xs font-normal opacity-70">Kepala Desa</span></div>
                     </div>
                  </div>
                  <div className="md:col-span-7 p-10 bg-white flex flex-col justify-center">
                     <h3 className="text-green-900 font-black text-2xl mb-6 flex items-center gap-3"><span className="w-8 h-1 bg-yellow-400 rounded-full"></span>Misi Pembangunan</h3>
                     <div className="grid gap-4">
                        {dataVisiMisi.misi.map((m, i) => (
                           <div key={i} className="flex gap-4 items-start group">
                              <span className="flex-shrink-0 w-10 h-10 bg-green-50 text-green-700 font-black rounded-xl flex items-center justify-center border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-colors">{i + 1}</span>
                              <p className="text-gray-600 font-medium text-sm md:text-base pt-2 border-b border-gray-50 pb-2 w-full group-hover:text-green-800 transition-colors">{m}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* SEJARAH */}
            <div className="grid md:grid-cols-12 gap-12 pt-10 border-t border-gray-100">
               <div className="md:col-span-4 space-y-4">
                  <h3 className="text-3xl font-black text-gray-800 leading-tight">Jejak Langkah <span className="text-green-600">Sejarah</span></h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Perjalanan panjang Desa Waginopo dari sebuah dusun hingga menjadi desa mandiri.</p>
               </div>
               <div className="md:col-span-8">
                  <div className="space-y-0 relative border-l-2 border-green-200 ml-4 md:ml-0">
                     {dataSejarah.narasi.map((p, i) => (
                        <div key={i} className="relative pl-8 md:pl-10 pb-8 last:pb-0 group">
                           <span className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-white border-4 border-green-500 group-hover:bg-green-500 transition-colors"></span>
                           <p className="text-gray-700 leading-relaxed text-sm md:text-base bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">{p}</p>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12">
                     <h4 className="font-bold text-gray-800 mb-6 border-b pb-2">Linimasa Kepemimpinan</h4>
                     <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                        {dataSejarah.kepalaDesa.map((k, i) => (
                           <div key={i} className="min-w-[160px] bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                              <div><span className="text-xs font-bold text-slate-400 block mb-1">{k.periode}</span><h5 className="font-bold text-slate-800 text-sm">{k.nama}</h5></div>
                              <span className="text-[10px] bg-white px-2 py-1 rounded border border-slate-100 mt-3 inline-block text-slate-500 self-start">{k.ket}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        );

      case 'geografis':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            
            <section>
               <div className="text-center mb-10">
                  <h3 className="text-3xl font-black text-gray-800">Administrasi Wilayah</h3>
                  <p className="text-gray-500 mt-2">Data Demografi Berdasarkan Pemetaan Desa Tahun 2026</p>
               </div>

               <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div 
                    className="bg-white p-2 rounded-3xl shadow-lg border border-gray-200 cursor-pointer transform hover:scale-[1.01] transition-all duration-300 relative group"
                    onClick={() => setZoomImage(dataAdministrasi.peta)}
                  >
                     <div className="relative rounded-2xl overflow-hidden bg-slate-100">
                        <img src={dataAdministrasi.peta} alt="Peta Administrasi Waginopo" className="w-full h-auto object-cover"/>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                           <p className="text-white text-xs font-mono opacity-80">Klik untuk memperbesar</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow-xl text-sm flex items-center gap-2">
                              Lihat Peta Besar
                            </span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-gradient-to-r from-green-800 to-teal-900 rounded-2xl p-6 text-white shadow-lg">
                        <h4 className="font-bold text-green-200 text-xs uppercase tracking-widest mb-4">Total Populasi Desa</h4>
                        <div className="grid grid-cols-3 gap-4 text-center divide-x divide-green-700/50">
                           <div><span className="block text-3xl font-black">{dataAdministrasi.total.penduduk}</span><span className="text-xs text-green-200">Jiwa</span></div>
                           <div><span className="block text-2xl font-bold">{dataAdministrasi.total.kk}</span><span className="text-xs text-green-200">KK</span></div>
                           <div>
                              <div className="text-xs flex justify-center items-center gap-1 mb-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> L: {dataAdministrasi.total.lk}</div>
                              <div className="text-xs flex justify-center items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400"></span> P: {dataAdministrasi.total.pr}</div>
                           </div>
                        </div>
                     </div>

                     <div className="grid gap-4">
                        {dataAdministrasi.dusun.map((d, i) => (
                           <motion.div whileHover={{ x: 5 }} key={i} className={`p-6 rounded-2xl border-2 ${d.border} ${d.warna} relative overflow-hidden`}>
                              <div className="relative z-10">
                                 <h5 className={`font-black text-lg ${d.text} mb-4 flex items-center gap-2`}><span className={`w-3 h-3 rounded-full ${d.dot}`}></span>{d.nama}</h5>
                                 <div className="grid grid-cols-4 gap-2 text-center">
                                    <div className="bg-white/60 rounded-lg p-2 backdrop-blur-sm"><span className="block text-xl font-bold text-gray-800">{d.penduduk}</span><span className="text-[10px] font-bold text-gray-500 uppercase">Penduduk</span></div>
                                    <div className="bg-white/60 rounded-lg p-2 backdrop-blur-sm"><span className="block text-xl font-bold text-gray-800">{d.kk}</span><span className="text-[10px] font-bold text-gray-500 uppercase">KK</span></div>
                                    <div className="bg-blue-50/80 rounded-lg p-2 border border-blue-100"><span className="block text-lg font-bold text-blue-800">{d.lk}</span><span className="text-[10px] font-bold text-blue-600 uppercase">Pria</span></div>
                                    <div className="bg-pink-50/80 rounded-lg p-2 border border-pink-100"><span className="block text-lg font-bold text-pink-800">{d.pr}</span><span className="text-[10px] font-bold text-pink-600 uppercase">Wanita</span></div>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            <section className="pt-10 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-green-50 p-4 rounded-xl text-center"><span className="block text-xl md:text-2xl font-bold text-green-800">1.105 Ha</span><span className="text-xs uppercase font-bold text-green-600">Luas</span></div>
                <div className="bg-green-50 p-4 rounded-xl text-center"><span className="block text-xl md:text-2xl font-bold text-green-800">2</span><span className="text-xs uppercase font-bold text-green-600">Dusun</span></div>
                <div className="bg-green-50 p-4 rounded-xl text-center"><span className="block text-lg md:text-xl font-bold text-green-800">Perbukitan</span><span className="text-xs uppercase font-bold text-green-600">Topografi</span></div>
                <div className="bg-green-50 p-4 rounded-xl text-center"><span className="block text-lg md:text-xl font-bold text-green-800">Tropis</span><span className="text-xs uppercase font-bold text-green-600">Iklim</span></div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"><h4 className="font-bold text-lg mb-4 text-green-900 border-b pb-2">Batas Wilayah</h4><ul className="space-y-3">{dataGeografis.batas.map((b,i)=><li key={i} className="flex justify-between text-sm"><span className="text-gray-500">{b.arah}</span><span className="font-medium">{b.desa}</span></li>)}</ul></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"><h4 className="font-bold text-lg mb-4 text-green-900 border-b pb-2">Penggunaan Lahan</h4><div className="space-y-3">{dataGeografis.penggunaanLahan.map((l,i)=><div key={i} className="flex justify-between text-sm border-b border-dashed border-gray-100 pb-1"><span className="text-gray-700">{l.jenis}</span><span className="font-bold text-green-700">{l.luas}</span></div>)}</div></div>
              </div>
            </section>
          </motion.div>
        );
      case 'struktur':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20">
            <section className="text-center">
              <h3 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-widest border-b-4 border-green-500 inline-block pb-2">Pemerintah Desa</h3>
              <div className="flex flex-col items-center gap-10">
                 <StructureCard {...strukturPemdes.pimpinan} />
                 <div className="h-8 w-px bg-gray-300 -my-4"></div>
                 <StructureCard {...strukturPemdes.sekretaris} />
                 <div className="w-full h-px bg-gray-300 max-w-4xl"></div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-0 md:px-4">
                    <div className="flex flex-col items-center gap-4 bg-yellow-50/50 p-4 rounded-2xl">
                       <span className="font-bold text-xs uppercase text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">Kepala Urusan</span>
                       <div className="flex flex-wrap justify-center gap-4">{strukturPemdes.kaur.map((p,i)=><StructureCard key={i} {...p} sub color="bg-yellow-600"/>)}</div>
                    </div>
                    <div className="flex flex-col items-center gap-4 bg-green-50/50 p-4 rounded-2xl">
                       <span className="font-bold text-xs uppercase text-green-700 bg-green-100 px-3 py-1 rounded-full">Kepala Seksi</span>
                       <div className="flex flex-wrap justify-center gap-4">{strukturPemdes.kasi.map((p,i)=><StructureCard key={i} {...p} sub color="bg-green-600"/>)}</div>
                    </div>
                    <div className="flex flex-col items-center gap-4 bg-purple-50/50 p-4 rounded-2xl">
                       <span className="font-bold text-xs uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Kepala Dusun</span>
                       <div className="flex flex-wrap justify-center gap-4">{strukturPemdes.wilayah.map((p,i)=><StructureCard key={i} {...p} sub color="bg-purple-600"/>)}</div>
                    </div>
                 </div>
              </div>
            </section>

            <section className="bg-slate-50 p-4 md:p-8 rounded-[2.5rem] border border-slate-200">
               <h3 className="text-2xl font-black text-center mb-8 text-slate-800 uppercase tracking-widest">BPD</h3>
               <div className="w-full overflow-x-auto pb-6">
                 <div className="flex flex-col items-center gap-6 min-w-[320px]">
                    <StructureCard {...strukturBPD.ketua} color="bg-slate-700" />
                    <div className="h-4 w-px bg-slate-300"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative w-full justify-items-center">
                       <div className="absolute top-0 left-10 right-10 h-px bg-slate-300 md:block hidden"></div>
                       <div className="flex flex-col items-center"><div className="h-4 w-px bg-slate-300 md:hidden"></div><StructureCard {...strukturBPD.wakil} sub color="bg-slate-600" /></div>
                       <div className="flex flex-col items-center"><div className="h-4 w-px bg-slate-300 md:hidden"></div><StructureCard {...strukturBPD.sekretaris} sub color="bg-slate-600" /></div>
                    </div>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <div className="flex flex-wrap justify-center gap-4 min-w-max md:min-w-0">
                       {strukturBPD.anggota.map((p,i) => <div key={i} className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 font-bold text-slate-700 text-xs md:text-sm text-center">{p.nama} <span className="block text-[10px] text-slate-400 uppercase">{p.jabatan}</span></div>)}
                    </div>
                 </div>
               </div>
            </section>
            
            <section className="bg-indigo-50 p-4 md:p-8 rounded-[2.5rem] border border-indigo-200">
               <h3 className="text-2xl font-black text-center mb-8 text-indigo-900 uppercase tracking-widest">LPM</h3>
               <div className="flex flex-col items-center gap-6">
                  <StructureCard {...strukturLPM.ketua} color="bg-indigo-700" />
                  <div className="flex flex-wrap justify-center gap-6">
                     <StructureCard {...strukturLPM.wakil} sub color="bg-indigo-600" />
                     <StructureCard {...strukturLPM.sekretaris} sub color="bg-indigo-600" />
                     <StructureCard {...strukturLPM.bendahara} sub color="bg-indigo-600" />
                  </div>
               </div>
            </section>
            <section className="bg-teal-50 p-4 md:p-8 rounded-[2.5rem] border border-teal-200">
               <h3 className="text-xl md:text-2xl font-black text-center mb-2 text-teal-900 uppercase tracking-widest">TP. PKK</h3>
               <div className="flex flex-col items-center gap-8">
                  <div className="bg-white px-8 py-3 rounded-xl shadow-sm border border-teal-100 text-center"><div className="text-[10px] uppercase font-bold text-teal-400">Pembina</div><div className="font-bold text-gray-800 text-sm">{strukturPKK.pembina.nama}</div></div>
                  <StructureCard {...strukturPKK.ketua} color="bg-teal-600" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl justify-items-center">
                     <StructureCard {...strukturPKK.wakilKetua} sub color="bg-teal-500" />
                     <StructureCard {...strukturPKK.sekretaris} sub color="bg-teal-500" />
                     <StructureCard {...strukturPKK.bendahara} sub color="bg-teal-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full mt-6">{strukturPKK.pokja.map((p) => <PokjaCard key={p.id} pokja={p} />)}</div>
               </div>
            </section>
            <section className="bg-white p-4 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-200">
               <h3 className="text-2xl font-black text-center mb-8 text-gray-800 uppercase tracking-widest">Karang Taruna</h3>
               <div className="flex flex-col items-center gap-4">
                   <StructureCard {...strukturKarangTaruna.ketua} color="bg-blue-600" />
                   <div className="flex gap-4"><StructureCard {...strukturKarangTaruna.wakilKetua} sub color="bg-blue-500" /><StructureCard {...strukturKarangTaruna.sekretaris} sub color="bg-blue-500" /></div>
               </div>
            </section>
             <section className="bg-gradient-to-br from-red-50 to-white p-4 md:p-8 rounded-[2.5rem] shadow-xl border border-red-100">
               <h3 className="text-xl md:text-2xl font-black text-center mb-1 text-red-900 uppercase">Koperasi Desa</h3>
               <div className="flex flex-wrap justify-center gap-6 mt-8">
                  {strukturKoperasi.pengurusInti.map((p, i) => (<StructureCard key={i} {...p} sub color={p.color} />))}
               </div>
            </section>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-16 bg-green-900 text-white px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs mb-3 block">Profil Resmi</span>
            <h1 className="text-4xl md:text-5xl font-black mb-6">Desa Waginopo</h1>
            <p className="max-w-2xl mx-auto text-green-100 text-lg">Kecamatan Wangi-Wangi, Kabupaten Wakatobi.</p>
          </motion.div>
        </div>
      </section>

      <section className="mt-[-2rem] px-6 relative z-20">
        <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-xl p-2 border border-gray-100 flex flex-wrap justify-center gap-2">
          {['Selayang Pandang', 'geografis', 'struktur'].map((item) => (
            <button key={item} onClick={() => handleTabChange(item)} className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 flex-1 md:flex-none ${activeTab === item ? 'bg-green-700 text-white shadow-lg transform -translate-y-1' : 'text-gray-500 hover:bg-gray-50 hover:text-green-700'}`}>
              {item.replace('geografis','Geografis').replace('struktur','Struktur').replace('Selayang Pandang','Selayang Pandang')}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 min-h-[600px] relative">
        <div className="container mx-auto max-w-5xl">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {zoomImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
            onClick={() => setZoomImage(null)}
          >
            <div className="relative max-w-full max-h-full">
              <motion.img 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }}
                src={zoomImage} 
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()} 
              />
              <button 
                onClick={() => setZoomImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-yellow-400 font-bold text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20"
              >
                TUTUP [X]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProfilDesa;