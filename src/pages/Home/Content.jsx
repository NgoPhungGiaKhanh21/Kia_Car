import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarRequest } from "../../redux/getAllCar/getAllCarSlice";
import { Spin } from "antd";
import { Link } from "react-router-dom";

// Map từng dòng xe → đường dẫn trang chi tiết
const DETAIL_ROUTES = {
  Carnival: "/san-pham/carnival",
  Sorento: "/san-pham/sorento",
  Seltos: "/san-pham/seltos",
  Sonet: "/san-pham/sonet",
  Sportage: "/san-pham/sportage",
  Carens: "/san-pham/carens",
  K5: "/san-pham/k5",
  K3: "/san-pham/k3",
  Soluto: "/san-pham/soluto",
  "New Morning": "/san-pham/morning",
  "Morning MT": "/san-pham/morning",
};

// ─── Carousel Images ──────────────────────────────────────────────────────────
const carouselSlides = [
  {
    img: "/carousel1.jpg",
    title: "Trải Nghiệm Đỉnh Cao",
    subtitle: "KIA – Khơi Dậy Cảm Xúc Lái Xe",
    cta: "Khám phá ngay",
  },
  {
    img: "/carousel2.jpg",
    title: "Công Nghệ Tiên Phong",
    subtitle: "Hybrid & SUV – Vượt Trội Mọi Hành Trình",
    cta: "Xem dòng Hybrid",
  },
  {
    img: "/carousel3.jpg",
    title: "Ưu Đãi Tháng 6",
    subtitle: "Đặt cọc hôm nay – Nhận xe ngay tuần tới",
    cta: "Xem ưu đãi",
  },
];

// ─── Car Model Config ─────────────────────────────────────────────────────────
const MODEL_CONFIG = [
  { key: "Carnival", display: "KIA Carnival", badge: "MPV / Gia đình", type: "MPV", specs: ["Động cơ 3.5L V6", "Hộp số tự động 8 cấp", "7 chỗ rộng rãi"] },
  { key: "Sorento", display: "KIA Sorento", badge: "SUV 7 chỗ", type: "SUV", specs: ["Smartstream 2.2 Diesel", "Hộp số tự động 8 cấp", "7 chỗ ngồi"] },
  { key: "Seltos", display: "KIA Seltos", badge: "SUV Đô thị", type: "SUV", specs: ["Động cơ 1.4 Turbo", "Hộp số tự động 7 cấp (DCT)", "5 chỗ"] },
  { key: "Sonet", display: "KIA Sonet", badge: "SUV Compact", type: "SUV", specs: ["Động cơ 1.5L MPI", "Hộp số tự động 6 cấp", "5 chỗ"] },
  { key: "Sportage", display: "KIA Sportage", badge: "SUV Thể thao", type: "SUV", specs: ["Smartstream 1.6 Turbo Hybrid", "Hộp số tự động 6 cấp (6AT)", "5 chỗ"] },
  { key: "Carens", display: "KIA Carens", badge: "MPV Thông minh", type: "MPV", specs: ["Động cơ 1.5 Turbo", "Hộp số tự động 7 cấp (DCT)", "6/7 chỗ"] },
  { key: "K5", display: "KIA K5", badge: "Sedan Hạng D", type: "Sedan", specs: ["Smartstream 2.0L MPI", "Hộp số tự động 8 cấp", "5 chỗ"] },
  { key: "K3", display: "KIA K3", badge: "Sedan Hạng C", type: "Sedan", specs: ["Smartstream 2.0L MPI", "Hộp số tự động 6 cấp", "5 chỗ"] },
  { key: "Soluto", display: "KIA Soluto", badge: "Sedan Hạng B", type: "Sedan", specs: ["Động cơ 1.4L MPI", "Hộp số tự động 4 cấp", "5 chỗ"] },
  { key: "New Morning", display: "KIA New Morning", badge: "Hatchback", type: "Hatchback", specs: ["Động cơ 1.0L MPI", "Hộp số tự động 4 cấp", "5 chỗ"] },
  { key: "Morning MT", display: "KIA Morning MT", badge: "Hatchback", type: "Hatchback", specs: ["Động cơ 1.0L MPI", "Hộp số sàn 5 cấp", "5 chỗ"] },
];

const TYPE_TABS = ["Tất cả", "SUV", "MPV", "Sedan", "Hatchback"];

function formatPrice(price) {
  if (price >= 1_000_000_000) {
    return `${(price / 1_000_000_000).toLocaleString("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })} Tỷ`;
  }
  return `${(price / 1_000_000).toLocaleString("vi-VN")} Triệu`;
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % carouselSlides.length);
  const prev = () =>
    goTo((current - 1 + carouselSlides.length) % carouselSlides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = carouselSlides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(480px, 90vw, 90vh)", minHeight: 380 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${slide.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: animating ? 0 : 1,
        }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-16 lg:px-28 max-w-4xl">
        <p
          className="text-white/70 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-bold mb-2 sm:mb-3"
          style={{ opacity: animating ? 0 : 1, transition: "opacity 0.5s" }}
        >
          KIA Vietnam – Thaco Kia
        </p>
        <h1
          className="text-white font-black leading-tight mb-3 sm:mb-4"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.5s 0.1s",
          }}
        >
          {slide.title}
        </h1>
        <p
          className="text-gray-200 text-sm sm:text-lg mb-5 sm:mb-8 max-w-lg"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.5s 0.15s",
          }}
        >
          {slide.subtitle}
        </p>
        <div
          className="flex gap-3 sm:gap-4 flex-wrap"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.5s 0.2s",
          }}
        >
          <button
            className="h-11 sm:h-12 px-6 sm:px-8 border-none font-bold rounded-full uppercase tracking-wider shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ background: "#111", color: "#fff", fontSize: "clamp(12px, 3vw, 14px)" }}
          >
            {slide.cta}
          </button>
          <a href="tel:0346270010" className="no-underline">
            <button
              className="h-11 sm:h-12 px-6 sm:px-8 backdrop-blur-sm font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.5)",
                color: "#fff",
                fontSize: "clamp(12px, 3vw, 14px)",
              }}
            >
              0346 270 010
            </button>
          </a>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Ảnh trước"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Ảnh sau"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 border-none cursor-pointer ${i === current
              ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-white"
              : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

// ─── Hotline Banner ───────────────────────────────────────────────────────────
const HotlineBanner = () => (
  <section style={{ background: "#111", padding: "16px 16px" }}>
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-white text-center">
      <div className="flex items-center gap-3">
        <div className="text-left">
          <p className="text-xs uppercase tracking-widest font-semibold leading-none mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
            Hotline Tư Vấn – Miễn phí 24/7
          </p>
          <a
            href="tel:0346270010"
            className="text-xl sm:text-3xl font-black text-white tracking-wider no-underline hover:text-gray-300 transition-colors duration-300"
          >
            0346 270 010
          </a>
        </div>
      </div>
      <div className="hidden sm:block w-px h-10" style={{ background: "rgba(255,255,255,0.2)" }} />
      <div className="hidden sm:flex gap-4 text-sm font-medium flex-wrap justify-center" style={{ color: "rgba(255,255,255,0.7)" }}>
        {["Tư vấn chuyên nghiệp", "Đặt lịch lái thử", "Nhận báo giá nhanh"].map(
          (t) => (
            <span key={t} className="flex items-center gap-1">
              ✓ {t}
            </span>
          ),
        )}
      </div>
      <a href="tel:0346270010" className="sm:ml-4 no-underline">
        <button
          className="font-black rounded-full px-6 sm:px-8 h-11 sm:h-12 uppercase tracking-wider shadow-lg transition-all duration-300 hover:-translate-y-1 border-none cursor-pointer"
          style={{ background: "#fff", color: "#111", fontSize: 13 }}
        >
          Gọi ngay
        </button>
      </a>
    </div>
  </section>
);

// ─── Car Models Section (Spotlight Design) ───────────────────────────────────
const CarModelsSection = ({ cars }) => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [activeIdx, setActiveIdx] = useState(0);

  const allModels = MODEL_CONFIG.map((cfg) => {
    const matched = cars.filter((car) => car.name.includes(cfg.key));
    if (!matched.length) return null;
    const minPrice = Math.min(...matched.map((c) => c.price));
    return { ...cfg, img: matched[0].img, minPrice };
  }).filter(Boolean);

  const typeCounts = TYPE_TABS.reduce((acc, t) => {
    acc[t] = t === "Tất cả" ? allModels.length : allModels.filter((m) => m.type === t).length;
    return acc;
  }, {});

  const filtered = activeTab === "Tất cả" ? allModels : allModels.filter((m) => m.type === activeTab);
  const safeIdx = Math.min(activeIdx, Math.max(0, filtered.length - 1));
  const featured = filtered[safeIdx] || null;
  const detailPath = featured ? (DETAIL_ROUTES[featured.key] || null) : null;

  return (
    <section style={{ background: "#f8f9fb", padding: "80px 0 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.3em", fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
            Dòng xe KIA 2026
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#111", marginBottom: 14 }}>
            Khám Phá Các Dòng Xe
          </h2>
          <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Từ SUV mạnh mẽ đến Sedan tinh tế – KIA luôn có lựa chọn hoàn hảo cho bạn
          </p>
        </div>

        {/* Type Filter Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {TYPE_TABS.filter((t) => typeCounts[t] > 0).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setActiveIdx(0); }}
              style={{
                padding: "9px 20px", borderRadius: 999,
                border: activeTab === tab ? "2px solid #111" : "2px solid #e5e7eb",
                background: activeTab === tab ? "#111" : "#fff",
                color: activeTab === tab ? "#fff" : "#374151",
                fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {tab}{tab !== "Tất cả" ? ` (${typeCounts[tab]})` : ""}
            </button>
          ))}
        </div>

        {/* Spotlight Panel */}
        {featured && (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 20,
            overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.13)", marginBottom: 40, minHeight: 340,
          }}>
            {/* Left dark panel */}
            <div style={{
              background: "linear-gradient(135deg,#0d1117 0%,#1a2332 100%)",
              padding: "44px 44px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <span style={{
                  display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#9ca3af",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "4px 14px", borderRadius: 999, marginBottom: 18,
                }}>{featured.type}</span>
                <h3 style={{ color: "#fff", fontSize: "clamp(1.4rem,2.5vw,2.2rem)", fontWeight: 900, marginBottom: 4 }}>
                  {featured.display.toUpperCase()}
                </h3>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>{featured.badge}</p>
                <p style={{ color: "#6b7280", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Giá từ</p>
                <p style={{ color: "#ef4444", fontSize: "1.55rem", fontWeight: 900 }}>{formatPrice(featured.minPrice)}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
                {detailPath && (
                  <Link to={detailPath} style={{ textDecoration: "none" }}>
                    <button style={{ background: "#fff", color: "#111", border: "none", padding: "10px 22px", borderRadius: 999, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                      Xem chi tiết
                    </button>
                  </Link>
                )}
                <Link to="/bang-gia" style={{ textDecoration: "none" }}>
                  <button style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", padding: "10px 22px", borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                    Xem bảng giá
                  </button>
                </Link>
              </div>
            </div>

            {/* Right image panel */}
            <div style={{ background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "rgba(220,38,38,0.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <img src={featured.img} alt={featured.display} style={{ maxWidth: "100%", maxHeight: 260, objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.15))", transition: "all 0.4s" }} />
            </div>
          </div>
        )}

        {/* Thumbnail Strip */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill,minmax(150px,1fr))`, gap: 10, marginBottom: 36 }}>
          {filtered.map((model, i) => {
            const isActive = i === safeIdx;
            return (
              <div
                key={model.key}
                onClick={() => setActiveIdx(i)}
                style={{
                  background: "#fff", borderRadius: 14, border: isActive ? "2.5px solid #111" : "2px solid #e5e7eb",
                  padding: "12px 10px 8px", cursor: "pointer", transition: "all 0.2s",
                  boxShadow: isActive ? "0 4px 18px rgba(0,0,0,0.12)" : "none",
                  transform: isActive ? "translateY(-3px)" : "none", textAlign: "center",
                }}
              >
                <img src={model.img} alt={model.display} style={{ width: "100%", height: 72, objectFit: "contain", marginBottom: 6 }} />
                <p style={{ fontSize: 11, fontWeight: 800, color: "#111", margin: 0, lineHeight: 1.3 }}>{model.display}</p>
                <p style={{ fontSize: 11, color: isActive ? "#dc2626" : "#49494aff", margin: "2px 0 0", fontWeight: 700 }}>{formatPrice(model.minPrice)}</p>
              </div>
            );
          })}
        </div>

        {/* Xem tất cả Button */}
        <div style={{ textAlign: "center" }}>
          <Link to="/bang-gia" style={{ textDecoration: "none" }}>
            <button
              onMouseEnter={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.transform = "none"; }}
              style={{ background: "#111", color: "#fff", border: "none", padding: "14px 44px", borderRadius: 999, fontWeight: 800, fontSize: 15, cursor: "pointer", letterSpacing: "0.05em", boxShadow: "0 6px 24px rgba(0,0,0,0.15)", transition: "all 0.25s" }}
            >
              Xem tất cả dòng xe →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Why KIA Section ──────────────────────────────────────────────────────────
const WhyKia = () => {
  const features = [
    {
      title: "Tư Vấn Tận Tình",
      desc: "Đội ngũ tư vấn được đào tạo chuyên nghiệp, giàu kinh nghiệm luôn sẵn lòng giúp quý khách tìm được chiếc xe ưng ý.",
    },
    {
      title: "Giá Ưu Đãi – Giao Xe Sớm – Trả Góp 80%",
      desc: "Đại lý xe KIA Biên Hòa luôn cam kết mang lại mức giá ưu đãi nhất cho quý khách với thời gian giao xe sớm tại khu vực Miền Nam.",
    },
    {
      title: "Bảo Hành Tiêu Chuẩn Toàn Cầu",
      desc: "Cung cấp phụ tùng ô tô KIA chính hãng. Quý khách hãy yên tâm chiếc xe khi mua tại KIA Biên Hòa luôn được chăm sóc kỹ lưỡng.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="uppercase tracking-[0.3em] text-xs font-bold mb-3" style={{ color: "#111" }}>
            Tại sao chọn KIA Biên Hòa?
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Cam Kết Từ Chúng Tôi
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="group p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2"
            >
              {/* Accent line instead of icon */}
              <div
                className="mx-auto mb-5 rounded-full"
                style={{
                  width: 40,
                  height: 4,
                  background: "linear-gradient(90deg, #111 0%, #444 100%)",
                  transition: "width 0.3s",
                }}
              />
              <h3 className="font-black text-gray-900 text-base sm:text-lg mb-3 uppercase tracking-wide">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA Banner ───────────────────────────────────────────────────────────────
const CtaBanner = () => (
  <section
    className="relative py-24 px-4 text-white overflow-hidden"
    style={{ background: "#111" }}
  >
    {/* Decorative circles */}
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.03)" }} />
    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.03)" }} />

    <div className="relative max-w-3xl mx-auto text-center">
      <p className="uppercase tracking-[0.3em] text-xs font-bold mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
        Đặt lịch ngay hôm nay
      </p>
      <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
        Trải Nghiệm Lái Thử <br />
        <span style={{ color: "rgba(255,255,255,0.85)" }}>Hoàn Toàn Miễn Phí</span>
      </h2>
      <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
        Đến showroom hoặc gọi hotline – đội ngũ tư vấn của chúng tôi luôn sẵn
        sàng phục vụ bạn
      </p>

      {/* Hotline nổi bật */}
      <div className="mb-8 py-6 px-8 rounded-2xl inline-block" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <p className="text-sm font-semibold mb-1 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
          Hotline
        </p>
        <a
          href="tel:0346270010"
          className="no-underline block font-black hover:text-gray-300 transition-colors duration-300"
          style={{ fontSize: "2.2rem", lineHeight: 1.1, color: "#fff" }}
        >
          0346270010
          <span className="font-black" style={{ color: "rgba(255,255,255,0.7)" }}> (Gia Hưng)</span>
        </a>
        <div className="mt-3 space-y-1">
          <p className="font-black uppercase tracking-wider text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Liên hệ ngay để nhận báo giá tốt
          </p>
          <p className="font-black uppercase tracking-wider text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            và những khuyến mãi mới nhất
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <a href="tel:0346270010" className="no-underline">
          <button
            className="h-13 sm:h-14 px-8 sm:px-10 border-none font-black rounded-full uppercase tracking-widest shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ background: "#fff", color: "#111", fontSize: "clamp(13px, 3vw, 16px)", padding: "14px 36px" }}
          >
            Gọi ngay
          </button>
        </a>
        <a href="/dang-ky-lai-thu" className="no-underline">
          <button
            className="h-13 sm:h-14 font-black rounded-full uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: "#fff",
              fontSize: "clamp(13px, 3vw, 16px)",
              padding: "14px 36px",
              WebkitTextFillColor: "#fff",
            }}
          >
            Đặt lịch lái thử
          </button>
        </a>
      </div>
    </div>
  </section>
);

// ─── Main Content ─────────────────────────────────────────────────────────────
const Content = () => {
  const dispatch = useDispatch();
  const { getAllCar, loading } = useSelector((state) => state.getAllCar);

  useEffect(() => {
    dispatch(getAllCarRequest());
  }, [dispatch]);

  const cars = getAllCar?.data?.data || [];

  return (
    <main>
      <HeroCarousel />
      <HotlineBanner />

      {loading ? (
        <div className="flex justify-center items-center py-32 bg-gray-50">
          <Spin size="large" tip="Đang tải danh sách xe..." />
        </div>
      ) : (
        <CarModelsSection cars={cars} />
      )}

      <WhyKia />
      <CtaBanner />
    </main>
  );
};

export default Content;
