import Link from "next/link";

export default function MagazineNews() {
  return (
    <section className="py-40 bg-gray-900 text-white rounded-[5rem] mx-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-xs font-black tracking-[0.5em] text-blue-400 uppercase mb-6">
              Press Release
            </h2>
            <p className="text-5xl md:text-6xl font-black tracking-tighter">
              협회 주요 소식
            </p>
          </div>
          <Link
            href="/community"
            className="text-sm font-black tracking-widest border-b-2 border-blue-400 pb-2 hover:text-blue-400 transition-colors"
          >
            VIEW ALL NEWS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Featured News */}
          <div className="md:col-span-7 group cursor-pointer">
            <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1526676023641-72e4237585e6?q=80&w=1200"
                alt="News"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 inline-block">
                  Featured
                </span>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter break-keep">
                  2026 전국 생활체육 대축전 개최지 확정 및 추진 위원회 발족
                </h3>
              </div>
            </div>
          </div>

          {/* Side News List */}
          <div className="md:col-span-5 space-y-8">
            {[
              {
                date: "2026.04.05",
                title: "어르신 맞춤형 실버 스포츠 프로그램 전국 확대 시행",
              },
              {
                date: "2026.03.28",
                title: "대한생활체육회-글로벌 스포츠 기구 MOU 체결식",
              },
              {
                date: "2026.03.15",
                title: "꿈나무 생활체육 장학금 수여식 현장 스케치",
              },
            ].map((news, i) => (
              <div
                key={i}
                className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <p className="text-blue-400 font-black text-xs mb-4 tracking-widest">
                  {news.date}
                </p>
                <h4 className="text-xl font-bold group-hover:translate-x-2 transition-transform break-keep">
                  {news.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
