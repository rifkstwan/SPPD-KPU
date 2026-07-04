import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { BookOpen, Calendar, ChevronRight, ArrowLeft } from "lucide-react"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Berita & Informasi",
  description: "Kumpulan berita dan informasi terbaru KPU Provinsi Jawa Tengah",
}

const DUMMY_NEWS = [
  {
    id: "1",
    judul: "KPU JATENG TURUT BERPARTISIPASI DI JATENG FAIR 2026",
    ringkasan: "Semarang, Jum'at (19/6/2026) - KPU Provinsi Jawa Tengah yang diwakili Kabag Parmas dan SDM, Kiki Rizka Ningsih, menghadiri kegiatan rapat yang diselenggarakan oleh Kesbangpol Jateng, bersama instansi terkait dan organisasi masyarakat guna menyukseskan kegiatan pameran Jateng Fair Tahun 2026 di PRPP.",
    gambarUrl: "/berita-1.png",
    kategori: "Sosialisasi",
    sumber: "Humas KPU",
    slug: "jateng-fair",
    createdAt: new Date("2026-06-19"),
  },
  {
    id: "2",
    judul: "RAPAT KOORDINASI PENYIAPAN RUMUSAN KEBIJAKAN PERMASALAHAN PENGGANTIAN ANTARWAKTU ANGGOTA DPRD PROVINSI DAN DPRD KABUPATEN/KOTA",
    ringkasan: "Ketua divisi teknis penyelenggaraan pemilu KPU Provinsi Jawa Tengah menghadiri rapat koordinasi penyiapan rumusan kebijakan terkait permasalahan penggantian antarwaktu (PAW) anggota DPRD Provinsi dan DPRD Kabupaten/Kota. Kegiatan ini diselenggarakan sebagai forum koordinasi dan konsolidasi untuk membahas berbagai aspek regulasi serta kendala yang muncul dalam proses PAW di daerah.",
    gambarUrl: "/berita-2.png",
    kategori: "Rapat Koordinasi",
    sumber: "Divisi Teknis",
    slug: "rakor-paw",
    createdAt: new Date("2026-06-23"),
  },
  {
    id: "3",
    judul: "KETUA KPU PROVINSI JAWA TENGAH HADIRI PENANDATANGANAN NOTA KESEPAKATAN DAN TALK SHOW PENDIDIKAN PEMILIH DI SUKOHARJO",
    ringkasan: "Ketua KPU Provinsi Jawa Tengah, Handi Tri Ujiono, menghadiri kegiatan penandatanganan nota kesepakatan antara KPU Kabupaten Sukoharjo dengan Pemerintah Kabupaten Sukoharjo. Penandatanganan nota kesepakatan tersebut menjadi wujud komitmen bersama dalam memperkuat sinergi antara penyelenggara pemilu dan pemerintah daerah untuk mendukung pelaksanaan pendidikan pemilih yang berkelanjutan.",
    gambarUrl: "/berita-3.png",
    kategori: "Pendidikan Pemilih",
    sumber: "Ketua KPU",
    slug: "sukoharjo",
    createdAt: new Date("2026-06-22"),
  },
  {
    id: "4",
    judul: "AUDIENSI KE FISIP UNNES, KPU JATENG DORONG KERJASAMA SOSIALISASI PENDIDIKAN PEMILIH",
    ringkasan: "Semarang — Komisi Pemilihan Umum (KPU) Provinsi Jawa Tengah melakukan kunjungan audiensi ke Fakultas Ilmu Sosial dan Ilmu Politik (FISIP) Universitas Negeri Semarang (UNNES), Rabu (25/6/2026). Langkah ini diambil sebagai upaya memperkuat sinergi kelembagaan guna meningkatkan kualitas pelaksanaan pemilu dan pendidikan pemilih di Jawa Tengah.",
    gambarUrl: "/berita-4.png",
    kategori: "Pendidikan Pemilih",
    sumber: "Humas KPU",
    slug: "audiensi-unnes",
    createdAt: new Date("2026-06-25"),
  },
  {
    id: "5",
    judul: "KPU PROVINSI JAWA TENGAH GELAR LOMBA PADUAN SUARA MARS KPU",
    ringkasan: "Komisi Pemilihan Umum Provinsi Jawa Tengah menyelenggarakan Lomba Paduan Suara Mars KPU sebagai bagian dari upaya memperkuat identitas kelembagaan dan semangat kebersamaan di lingkungan penyelenggara pemilu. Kegiatan ini diikuti oleh perwakilan bagian internal KPU Provinsi Jawa Tengah yang menampilkan kemampuan vokal dan kekompakan tim masing-masing dalam membawakan lagu kebanggaan lembaga.",
    gambarUrl: "/berita-5.jpg",
    kategori: "Publikasi",
    sumber: "Humas KPU",
    slug: "lomba-paduan-suara",
    createdAt: new Date("2026-06-17"),
  }
]

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

export default async function BeritaListPage() {
  let dbNews = await prisma.berita.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  const newsList = dbNews.length > 0 ? dbNews : DUMMY_NEWS

  return (
    <div className="bg-surface-container-lowest min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-zinc-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative max-w-6xl mx-auto z-10 flex flex-col items-center text-center mt-6">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/10">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Berita KPU Jateng
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-medium">
            Kumpulan berita, informasi, dan pengumuman terbaru seputar kegiatan Komisi Pemilihan Umum Provinsi Jawa Tengah.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 -mt-8 relative z-20">
        {newsList.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100">
            <BookOpen className="mx-auto h-16 w-16 text-zinc-300 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900">Belum Ada Berita</h3>
            <p className="text-zinc-500 mt-2">Belum ada berita yang dipublikasikan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news) => (
              <Link 
                href={`/berita/${news.slug}`} 
                key={news.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] bg-zinc-200 relative overflow-hidden">
                  <img
                    src={news.gambarUrl || "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80"}
                    alt={news.judul}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-red-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    {news.kategori || "Umum"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wider">
                    <Calendar size={14} className="text-red-700" />
                    {formatDate(news.createdAt)}
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-zinc-900 mb-3 line-clamp-2 leading-snug group-hover:text-red-800 transition-colors">
                    {news.judul}
                  </h3>
                  
                  <p className="text-sm text-zinc-600 line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {news.ringkasan}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-red-700 group-hover:text-red-800 mt-auto">
                    Baca Selengkapnya
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
