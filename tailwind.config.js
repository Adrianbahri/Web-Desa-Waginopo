/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'desa-primary': '#166534', // Hijau khas instansi/desa
        'desa-secondary': '#facc15', // Kuning aksen
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}