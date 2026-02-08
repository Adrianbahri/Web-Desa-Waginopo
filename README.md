# 🏘️ Website Profil Desa Waginopo

Portal resmi digital Desa Waginopo, Kecamatan Wangi-Wangi, Kabupaten Wakatobi, Sulawesi Tenggara.

## 🚀 Tech Stack

- **React 19** - UI Library
- **Vite 7** - Build Tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **DOMPurify** - XSS Protection

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── Navbar.jsx          # Navigasi utama
│   ├── Footer.jsx          # Footer
│   ├── ui/                 # UI Components
│   │   ├── PageLayout.jsx  # Layout wrapper
│   │   └── PageHeader.jsx  # Header halaman
│   ├── news/               # Komponen berita
│   │   ├── NewsCard.jsx    # Kartu berita
│   │   └── NewsSkeleton.jsx # Loading skeleton
│   ├── states/             # State components
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── EmptyState.jsx
│   └── profil/             # Komponen profil
│       ├── StructureCard.jsx
│       └── PokjaCard.jsx
├── pages/
│   ├── HomePage.jsx        # Beranda
│   ├── BeritaSemua.jsx     # Arsip berita
│   ├── SinglePost.jsx      # Detail berita
│   ├── ProfilDesa.jsx      # Profil desa
│   └── Transparansi.jsx    # Transparansi anggaran
├── utils/
│   └── utils.js            # Helper functions
├── assets/                 # Gambar lokal
├── App.jsx                 # Root component
└── main.jsx                # Entry point
```

## 🛠️ Instalasi

```bash
# Clone repository
git clone <repo-url>
cd website-profil-desa

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

## 📜 Scripts

| Command | Keterangan |
|---------|------------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview hasil build |
| `npm run lint` | Jalankan ESLint |

## 🔒 Keamanan

Proyek ini mengimplementasikan beberapa langkah keamanan:

- **DOMPurify** - Sanitasi HTML untuk mencegah XSS
- **URL Validation** - Validasi URL gambar eksternal
- **Content Security** - Pembatasan tag HTML yang diizinkan
- **Input Encoding** - Encoding parameter URL
- **Referrer Policy** - Kontrol informasi referrer

## 🌐 API

Website ini terhubung dengan WordPress REST API:
```
https://waginopowakatobi.online/cms/wp-json/wp/v2/
```

## 📱 Fitur

- ✅ Responsive design (Mobile & Desktop)
- ✅ Animasi smooth dengan Framer Motion
- ✅ Integrasi WordPress CMS
- ✅ SEO friendly
- ✅ Loading states & skeleton
- ✅ Error handling
- ✅ Lazy loading gambar

## 🎨 Halaman

1. **Beranda** - Hero slider, statistik, berita terbaru
2. **Profil Desa** - Visi misi, sejarah, geografis, struktur organisasi
3. **Transparansi** - APB Desa dan rincian anggaran
4. **Arsip Berita** - Semua berita dengan search & pagination
5. **Detail Berita** - Halaman artikel lengkap

## 👥 Tim Pengembang

Dikembangkan oleh Mahasiswa KKNT 115 Universitas Hasanuddin

## 📄 Lisensi

© 2025 Desa Waginopo - All Rights Reserved
