<div align="center">

# 🗳️ SPPD-KPU Jawa Tengah

### Sistem Informasi Surat Perintah Perjalanan Dinas
#### KPU Provinsi Jawa Tengah

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

<br/>

> Aplikasi web full-stack modern untuk digitalisasi proses pengajuan, persetujuan, dan pelaporan Surat Perintah Perjalanan Dinas (SPPD) di lingkungan KPU Provinsi Jawa Tengah.

</div>

---

## 📌 Tentang Proyek

**SPPD-KPU** adalah solusi **enterprise-grade** yang mendigitalisasi seluruh alur kerja perjalanan dinas secara end-to-end. Proyek ini menggantikan proses manual yang rawan kesalahan dengan sistem berbasis web yang **real-time, transparan, dan efisien**.

Sistem ini mencakup **3 modul utama** dalam satu codebase:

```
┌────────────────────┬──────────────────────┬──────────────────────┐
│   SPPD INTERNAL    │    LANDING PAGE       │     CMS ADMIN        │
│   /dashboard       │    / (publik)         │     /cms             │
├────────────────────┼──────────────────────┼──────────────────────┤
│ • Pengajuan SPPD   │ • Berita & Publikasi  │ • Kelola Berita      │
│ • Multi-role Appr. │ • Profil & Layanan   │ • Kelola Layanan     │
│ • Notifikasi       │ • Kontak KPU         │ • Balas Kritik/Saran │
│ • PDF Generator    │ • Form Kritik/Saran  │ • Manajemen User CMS │
│ • Laporan & Rekap  │ • Tentang KPU        │ • Dashboard Statistik│
└────────────────────┴──────────────────────┴──────────────────────┘
```

---

## ✨ Fitur Unggulan

### 🔐 Sistem Autentikasi Dual-Instance
- **Dua instansi NextAuth.js** yang berjalan terpisah: satu untuk sistem SPPD internal dan satu untuk CMS Admin
- Proteksi berbasis **role** (PEGAWAI, APPROVER, ADMIN, CMS_ADMIN) dengan middleware guard
- Hashing password menggunakan **bcrypt** dengan salt 12 rounds
- JWT-based session dengan cookie terpisah per instance

### 📋 Manajemen SPPD End-to-End
- **Auto-generate nomor SPPD** dengan format terstandarisasi: `SPPD/YYYY/MMDD/RAND`
- Alur status: `DRAFT → PENDING → APPROVED / REJECTED`
- **Multi-level approval** dengan field `urutanLevel`
- Validasi data server-side menggunakan **Zod schema**

### 📄 PDF Generation On-Demand
- Generate surat SPPD resmi dalam format PDF menggunakan **@react-pdf/renderer**
- Template surat resmi yang dapat diunduh langsung dari browser

### 🔔 Sistem Notifikasi Real-time
- Bell icon dengan **badge counter** belum dibaca
- Dropdown preview 5 notifikasi terbaru di topbar
- Tipe notifikasi: PENDING, APPROVED, REJECTED, INFO
- Fitur "Tandai Semua Sudah Dibaca" (bulk action)

### 🔍 Global Search
- Search bar terintegrasi di topbar dashboard
- Pencarian multi-entitas: SPPD, user, dan lebih
- Hasil pencarian dengan tautan langsung ke detail

### 🌐 Landing Page + CMS Terintegrasi
- Website publik KPU yang dikelola penuh melalui CMS
- CRUD berita, layanan, publikasi, tentang KPU
- Form kritik & saran publik dengan notifikasi ke CMS Admin

---

## 🛠️ Tech Stack

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Framework** | Next.js (App Router) | 16.2.6 |
| **UI Library** | React + TypeScript | 19.2.4 / ^5 |
| **Styling** | Tailwind CSS | ^4 |
| **Database** | PostgreSQL | 14+ |
| **ORM** | Prisma + `@prisma/adapter-pg` | ^7.8.0 |
| **Auth** | NextAuth.js v5 | ^5.0.0-beta.31 |
| **Forms** | React Hook Form + Zod | ^7.75.0 / ^4.4.3 |
| **PDF** | @react-pdf/renderer | ^4.5.1 |
| **Icons** | Lucide React | ^1.14.0 |
| **Security** | bcryptjs | ^3.0.3 |
| **Date Utils** | date-fns | ^4.1.0 |

---

## 🏗️ Arsitektur Sistem

```
┌──────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                         │
│    Landing Page (/)    Dashboard (/dashboard)   CMS (/cms)   │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼─────────────────────────────────┐
│                    Next.js 16 Server                          │
│     App Router (Server Components + SSR)                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │     NextAuth SPPD          NextAuth CMS               │    │
│  │   (/api/auth/...)     (/api/auth/cms/...)             │    │
│  └──────────────────────────────────────────────────────┘    │
│                    Prisma ORM v7.8                             │
└────────────────────────────┬─────────────────────────────────┘
                             │ TCP :5432
┌────────────────────────────▼─────────────────────────────────┐
│              PostgreSQL (15 Tabel, 6 Enum, 5 Migrasi)        │
└──────────────────────────────────────────────────────────────┘
```

**Pola Arsitektur:**
- **Rendering:** Server-Side Rendering (SSR) + React Server Components
- **Routing:** App Router (file-system based)
- **Data Fetching:** Server Components query langsung ke DB via Prisma
- **API:** RESTful Route Handlers (Next.js)
- **State:** Server-first, minimal client state

---

## 🗄️ Desain Database

**15 tabel**, **6 enum type**, dikelola melalui **5 migrasi Prisma** yang tersuktur rapi:

| # | Tabel | Deskripsi |
|---|-------|-----------|
| 1 | `users` | Data pengguna dengan role-based access |
| 2 | `pengajuan_sppd` | Pengajuan perjalanan dinas (inti sistem) |
| 3 | `approval` | Rekam jejak persetujuan/penolakan |
| 4 | `notifikasi` | Notifikasi in-app per user |
| 5 | `surat_pdf` | Metadata surat PDF yang digenerate |
| 6 | `dokumen` | Lampiran dokumen SPPD |
| 7-9 | `accounts`, `sessions`, `verification_tokens` | NextAuth adapter tables |
| 10 | `informasi_layanan` | Layanan publik KPU |
| 11 | `berita` | Artikel berita KPU |
| 12 | `publikasi` | Dokumen publik KPU |
| 13 | `tentang_kpu` | Profil, visi, misi KPU |
| 14 | `kontak_kpu` | Informasi kontak |
| 15 | `kritik_saran` | Pesan dari masyarakat |

---

## 📊 Statistik Proyek

| Metrik | Nilai |
|--------|-------|
| **Total File Source** | 119 file (.ts / .tsx) |
| **Lines of Code** | ~16.800 baris |
| **Jumlah Halaman** | 20+ halaman |
| **API Endpoints** | 25+ route handlers |
| **Komponen Reusable** | 19 komponen |
| **Tabel Database** | 15 tabel |
| **Migrasi Database** | 5 migrasi |

---

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js **18+**
- PostgreSQL **14+**
- npm **9+**

### Instalasi

```bash
# 1. Clone repository
git clone <repository-url>
cd kpu_jateng

# 2. Install dependencies
npm install

# 3. Konfigurasi environment
cp .env.example .env
```

Edit file `.env` dengan nilai berikut:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sppd_kpu"
AUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

```bash
# 4. Jalankan migrasi database
npx prisma migrate dev

# 5. Seed data awal
npx prisma db seed

# 6. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 👤 Akun Default (Setelah Seeding)

| Role | Email | Password |
|------|-------|----------|
| **PEGAWAI** | `pegawai@kpu.go.id` | `password123` |
| **APPROVER** | `approver@kpu.go.id` | `password123` |
| **ADMIN** | `admin@kpu.go.id` | `password123` |
| **CMS_ADMIN** | `admin.cms@kpu-jateng.go.id` | `Admin@CMS123` |

---

## 🌍 Akses Aplikasi

| Modul | URL |
|-------|-----|
| Landing Page (Publik) | `http://localhost:3000/` |
| Login SPPD | `http://localhost:3000/login` |
| Dashboard SPPD | `http://localhost:3000/dashboard` |
| Login CMS | `http://localhost:3000/cms-login` |
| Panel CMS | `http://localhost:3000/cms/dashboard` |

---

## 🔄 Alur Kerja SPPD

```
PEGAWAI                                  APPROVER / ADMIN
   │                                            │
   ▼                                            │
[Buat Pengajuan]                                │
   │ Status: DRAFT                              │
   ▼                                            │
[Edit & Lengkapi Data]                          │
   │                                            │
   ▼                                            │
[Submit] ──── Notifikasi ──────────────────▶ [Review]
   │ Status: PENDING                            │
   │                                       [Approve / Reject]
   │                                            │
   ◀──── Notifikasi ────────────────────────────┘
   │ Status: APPROVED / REJECTED
   ▼
[Download PDF Surat SPPD]
```

---

## 📂 Struktur Direktori

```
kpu_jateng/
├── prisma/
│   ├── schema.prisma          # Skema database (284 baris)
│   ├── seed.ts                # Seeder SPPD
│   ├── seed-cms.ts            # Seeder CMS
│   └── migrations/            # 5 migrasi database
│
├── src/
│   ├── middleware.ts           # Auth guard middleware
│   ├── lib/
│   │   ├── auth.ts            # NextAuth SPPD config
│   │   ├── auth-cms.ts        # NextAuth CMS config
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── utils.ts           # Utility functions
│   │
│   ├── components/
│   │   ├── sppd-pdf.tsx       # Template PDF surat
│   │   ├── notif-bell.tsx     # Komponen notifikasi
│   │   ├── topbar-search.tsx  # Global search
│   │   ├── cms/               # Komponen CMS
│   │   └── public/            # Komponen landing page
│   │
│   └── app/
│       ├── (public)/          # Landing page publik
│       ├── dashboard/         # Panel SPPD internal
│       ├── cms/               # Panel CMS admin
│       └── api/               # REST API route handlers
│
└── public/                    # Aset statis (logo, gambar)
```

---

## 🔮 Rencana Pengembangan

- [ ] **Export Excel/PDF** untuk laporan rekap SPPD
- [ ] **Multi-level Approval** (infrastruktur `urutanLevel` sudah siap)
- [ ] **Upload Dokumen Lampiran** (kwitansi, tiket, dll)
- [ ] **Notifikasi Email** (selain in-app notification)
- [ ] **Dashboard Analytics** dengan grafik & chart
- [ ] **Mobile Responsive** optimization
- [ ] **Audit Trail** log perubahan data
- [ ] **Unit & E2E Testing** (Jest / Playwright)
- [ ] **Integrasi SIMPEG** (Sistem Informasi Kepegawaian)

---

## 📝 Catatan Teknis

- Menggunakan **Webpack** (bukan Turbopack) untuk stabilitas build: `next dev --webpack`
- Memory heap diatur ke **4096 MB** untuk menangani codebase yang besar
- Prisma dikonfigurasi menggunakan **PrismaPg adapter** (bukan direct Prisma client) untuk kompatibilitas PostgreSQL
- Dua instance NextAuth.js berjalan dengan **cookie name yang berbeda** untuk menghindari konflik sesi

---

<div align="center">

**Dibuat dengan ❤️ untuk KPU Provinsi Jawa Tengah**

*Proyek ini dikembangkan sebagai bagian dari upaya digitalisasi layanan pemerintahan*

</div>
