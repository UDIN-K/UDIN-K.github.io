# UDINK — Portofolio & AI Playground

Portofolio (UDIN-K) oleh Muhammad Syafri Syamsudin Syah (UDIN-K).  
Starter template berbasis React + TypeScript + Vite yang juga memuat scaffold untuk integrasi layanan AI (mis. Google GenAI / layanan serupa). Repo ini cocok dipakai sebagai basis untuk menampilkan portofolio dan eksperimen model AI.

## Ringkasan
UDINK menyediakan struktur proyek yang bersih untuk:
- Tampilan front-end dengan React + TypeScript (Vite)
- Struktur komponen di folder `components/`
- Service scaffold untuk integrasi API/AI di `services/` (mis. `geminiService.ts`)
- Typings/tipe di `types.ts`
- Konfigurasi build di `vite.config.ts`

## Fitur
- React + TypeScript (Vite)
- Komponen UI terstruktur di `components/`
- Scaffold service API/AI di `services/`
- File konfigurasi untuk tooling (Vite, tsconfig)
- Template mudah disesuaikan untuk portofolio dan eksperimen AI

## Quickstart (jalankan lokal)
1. Clone repo
   git clone https://github.com/UDIN-K/UDIN-K.github.io.git
2. Masuk ke folder
   cd UDIN-K.github.io
3. Instal dependency
   npm install
   atau
   pnpm install
   atau
   yarn install
4. Jalankan dev server
   npm run dev
   atau
   pnpm dev
   atau
   yarn dev
5. Buka di browser: http://localhost:5173 (atau port yang ditampilkan oleh Vite)

## Script penting (package.json)
- dev — menjalankan dev server
- build — membangun bundle untuk production
- preview / start — preview hasil build production
- lint / test — (jika dikonfigurasi di repo)

Contoh:
- npm run dev
- npm run build
- npm run preview

## Konfigurasi / Environment
Jika terintegrasi dengan layanan AI (GenAI atau serupa), simpan credential/API key di file .env (tidak di-commit ke repo):
VITE_GENAI_API_KEY=your_api_key_here

Catatan:
- Jangan commit file `.env` yang berisi secret.
- Pastikan file `.gitignore` mencakup `.env`.

## Struktur utama
- index.html, src/main.tsx (entry point)
- src/App.tsx — root app
- src/components/ — UI components
- src/services/ — API / AI integration (mis. `geminiService.ts`)
- src/types.ts — definisi tipe
- vite.config.ts, tsconfig.json — konfigurasi tooling

(Perlu disesuaikan jika path/struktur di repo berbeda.)

## Penulis & Kontak
- Penulis: Muhammad Syafri Syamsudin Syah (UDIN-K)  
- Repo awal dibuat pada: 2025-11-28  
- GitHub: https://github.com/UDIN-K  
- Email (dari commit): safrisam.id09@gmail.com

## Kontribusi
Silakan buka issue atau kirim PR jika ingin menambah fitur, memperbaiki bug, atau meningkatkan dokumentasi.
