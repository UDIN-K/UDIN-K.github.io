# UDINK — Portfolio / AI Playground

Fortofolio (Portfolio) oleh Muhammad Syafri Syamsudin Syah (UDIN-K)

![Uploading 1.png…]()

Ringkasan
---------
UDINK adalah starter portfolio berbasis React + TypeScript + Vite yang berisi scaffold untuk integrasi model AI (Google GenAI / layanan serupa). Repo ini berfungsi sebagai basis untuk menampilkan eksperimen antarmuka AI, demo image/text generation, dan komponen UI portfolio.

Fitur
-----
- React + TypeScript (Vite)
- Struktur komponen awal di folder `components/`
- Service scaffold di `services/` (tempat geminiService.ts / API integrasi)
- Konfigurasi build dengan `vite.config.ts`
- Typings di `types.ts`

Quickstart (jalankan lokal)
---------------------------
1. Clone repo
   git clone https://github.com/UDIN-K/UDINK.git
2. Masuk ke folder
   cd UDINK
3. Instal dependency
   npm install
   atau
   pnpm install
4. Jalankan dev server
   npm run dev
   atau
   pnpm dev
5. Buka di browser: http://localhost:5173 (atau port yang ditampilkan oleh Vite)

Script penting (package.json)
-----------------------------
- dev — jalankan dev server
- build — build production
- preview / start — preview build hasil produksi
- lint / test — (jika dikonfigurasi)

Konfigurasi / Environment
-------------------------
- Jika repo terhubung ke layanan AI (GenAI), simpan API key di .env:
  VITE_GENAI_API_KEY=your_api_key_here
- Jangan commit file .env yang berisi secret.

Struktur utama
---------------
- index.html, index.tsx — entry point
- App.tsx — root app
- components/ — UI components
- services/ — API / AI integration code (geminiService.ts)
- types.ts — type definitions
- vite.config.ts, tsconfig.json — konfigurasi tooling

Commit & Penulis
----------------
Repo ini awalnya diinisialisasi pada 2025-11-28 oleh Muhammad Syafri Syamsudin Syah 

Kontak
------
GitHub: https://github.com/UDIN-K
Email (dari commit): safrisam.id09@gmail.com

