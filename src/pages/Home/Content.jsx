import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarRequest } from "../../redux/getAllCar/getAllCarSlice";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import {
  PhoneOutlined,
  RightOutlined,
  LeftOutlined,
  CarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

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
// Map từ keyword trong tên xe → tên hiển thị dòng xe chính
const MODEL_CONFIG = [
  { key: "Carnival", display: "KIA Carnival", badge: "MPV / Gia đình" },
  { key: "Sorento", display: "KIA Sorento", badge: "SUV 7 chỗ" },
  { key: "Seltos", display: "KIA Seltos", badge: "SUV Đô thị" },
  { key: "Sonet", display: "KIA Sonet", badge: "SUV Compact" },
  { key: "Sportage", display: "KIA Sportage", badge: "SUV Thể thao" },
  { key: "Carens", display: "KIA Carens", badge: "MPV Thông minh" },
  { key: "K5", display: "KIA K5", badge: "Sedan Hạng D" },
  { key: "K3", display: "KIA K3", badge: "Sedan Hạng C" },
  { key: "Soluto", display: "KIA Soluto", badge: "Sedan Hạng B" },
  { key: "New Morning", display: "KIA New Morning", badge: "Hatchback" },
  { key: "Morning MT", display: "KIA Morning MT", badge: "Hatchback" },
];

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
      style={{ height: "90vh", minHeight: 500 }}
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
      <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-16 lg:px-28 max-w-4xl">
        <p
          className="text-red-400 uppercase tracking-[0.3em] text-sm font-bold mb-3"
          style={{ opacity: animating ? 0 : 1, transition: "opacity 0.5s" }}
        >
          KIA Vietnam – Thaco Kia
        </p>
        <h1
          className="text-white font-black leading-tight mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.5s 0.1s",
          }}
        >
          {slide.title}
        </h1>
        <p
          className="text-gray-200 text-lg mb-8 max-w-lg"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.5s 0.15s",
          }}
        >
          {slide.subtitle}
        </p>
        <div
          className="flex gap-4 flex-wrap"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.5s 0.2s",
          }}
        >
          <Button
            type="primary"
            size="large"
            icon={<CarOutlined />}
            className="h-12 px-8 bg-red-600 hover:bg-red-700 border-none font-bold rounded-full text-white uppercase tracking-wider shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            {slide.cta}
          </Button>
          <a href="tel:0346270010">
            <Button
              size="large"
              icon={<PhoneOutlined />}
              className="h-12 px-8 border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
            >
              0346 270 010
            </Button>
          </a>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-red-600 transition-all duration-300 hover:scale-110"
      >
        <LeftOutlined />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-red-600 transition-all duration-300 hover:scale-110"
      >
        <RightOutlined />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-3 bg-red-500"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// ─── Hotline Banner ───────────────────────────────────────────────────────────
const HotlineBanner = () => (
  <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-5 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-white text-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          <PhoneOutlined className="text-xl" />
        </div>
        <div className="text-left">
          <p className="text-xs uppercase tracking-widest text-red-200 font-semibold leading-none mb-1">
            Hotline Tư Vấn – Miễn phí 24/7
          </p>
          <a
            href="tel:0346270010"
            className="text-2xl sm:text-3xl font-black text-white tracking-wider no-underline hover:text-yellow-300 transition-colors duration-300"
          >
            0346 270 010
          </a>
        </div>
      </div>
      <div className="hidden sm:block w-px h-10 bg-white/30" />
      <div className="flex gap-6 text-sm text-red-100 font-medium">
        {["Tư vấn miễn phí", "Đặt lịch lái thử", "Nhận báo giá nhanh"].map(
          (t) => (
            <span key={t} className="flex items-center gap-1">
              <CheckCircleOutlined className="text-green-300" /> {t}
            </span>
          ),
        )}
      </div>
      <a href="tel:0346270010" className="sm:ml-4">
        <Button
          size="large"
          className="bg-white text-red-600 hover:bg-yellow-300 hover:text-red-700 border-none font-black rounded-full px-8 h-12 uppercase tracking-wider shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          Gọi ngay
        </Button>
      </a>
    </div>
  </section>
);

// ─── Car Model Card ───────────────────────────────────────────────────────────
const CarModelCard = ({ model }) => {
  const [hovered, setHovered] = useState(false);
  const detailPath = DETAIL_ROUTES[model.key] || null;

  const cardContent = (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 pt-8 px-4"
        style={{ height: 220 }}
      >
        <img
          src={model.img}
          alt={model.display}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Bottom info */}
      <div className="p-5">
        <h3 className="text-gray-900 font-black text-xl mb-1 truncate">
          {model.display}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{model.badge}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
              Giá từ
            </p>
            <p className="text-red-600 font-black text-xl leading-none">
              {formatPrice(model.minPrice)}
            </p>
          </div>
          <Button
            type="primary"
            size="small"
            className="bg-gray-900 hover:bg-red-600 border-none rounded-full px-5 font-bold uppercase text-xs tracking-wider transition-all duration-300 text-white"
          >
            Chi tiết
          </Button>
        </div>

        {/* Hover bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 rounded-b-2xl"
          style={{ width: hovered ? "100%" : "0%" }}
        />
      </div>
    </div>
  );

  return detailPath ? (
    <Link to={detailPath} style={{ textDecoration: "none" }}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

// ─── Car Models Section ───────────────────────────────────────────────────────
const CarModelsSection = ({ cars }) => {
  // Build model list from API data
  const models = MODEL_CONFIG.map((cfg) => {
    const matched = cars.filter((car) => car.name.includes(cfg.key));
    if (!matched.length) return null;
    const minPrice = Math.min(...matched.map((c) => c.price));
    const representative = matched[0];
    return {
      ...cfg,
      img: representative.img,
      minPrice,
      isHybrid: cfg.badge === "Hybrid",
    };
  }).filter(Boolean);

  const filtered = models;

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold mb-3">
            Dòng xe KIA 2026
          </p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Khám Phá Các Dòng Xe
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Từ SUV mạnh mẽ đến Hybrid tiết kiệm – KIA luôn có lựa chọn hoàn hảo
            cho bạn
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((model) => (
            <CarModelCard key={model.key} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Why KIA Section ──────────────────────────────────────────────────────────
const WhyKia = () => {
  const features = [
    {
      icon: "🤝",
      title: "Tư Vấn Tận Tình",
      desc: "Đội ngũ tư vấn được đào tạo chuyên nghiệp, giàu kinh nghiệm luôn sẵn lòng giúp quý khách tìm được chiếc xe ưng ý.",
    },
    {
      icon: "💰",
      title: "Giá Ưu Đãi – Giao Xe Sớm – Trả Góp 80%",
      desc: "Đại lý xe KIA Biên Hòa luôn cam kết mang lại mức giá ưu đãi nhất cho quý khách với thời gian giao xe sớm tại khu vực Miền Nam.",
    },
    {
      icon: "🛡️",
      title: "Bảo Hành Tiêu Chuẩn Toàn Cầu",
      desc: "Cung cấp phụ tùng ô tô KIA chính hãng. Quý khách hãy yên tâm chiếc xe khi mua tại KIA Biên Hòa luôn được chăm sóc kỹ lưỡng.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold mb-3">
            Tại sao chọn KIA Biên Hòa?
          </p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Cam Kết Từ Chúng Tôi
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all duration-400 text-center hover:-translate-y-2"
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {f.icon}
              </div>
              <h3 className="font-black text-red-600 text-lg mb-3 uppercase tracking-wide">
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
    style={{
      background:
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    }}
  >
    {/* Decorative circles */}
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-red-600/10 blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />

    <div className="relative max-w-3xl mx-auto text-center">
      <p className="text-red-400 uppercase tracking-[0.3em] text-xs font-bold mb-4">
        Đặt lịch ngay hôm nay
      </p>
      <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
        Trải Nghiệm Lái Thử <br />
        <span className="text-red-500">Hoàn Toàn Miễn Phí</span>
      </h2>
      <p className="text-gray-300 text-lg mb-8">
        Đến showroom hoặc gọi hotline – đội ngũ tư vấn của chúng tôi luôn sẵn
        sàng phục vụ bạn
      </p>

      {/* Hotline nổi bật */}
      <div className="mb-8 py-6 px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur inline-block">
        <p className="text-white/60 text-sm font-semibold mb-1 uppercase tracking-widest">
          Hotline
        </p>
        <a
          href="tel:0346270010"
          className="no-underline block text-red-400 font-black hover:text-red-300 transition-colors duration-300"
          style={{ fontSize: "2.2rem", lineHeight: 1.1 }}
        >
          0346270010
          <span className="text-red-400 font-black"> (Gia Hưng)</span>
        </a>
        <div className="mt-3 space-y-1">
          <p className="text-green-400 font-black uppercase tracking-wider text-sm">
            Liên hệ ngay để nhận báo giá tốt
          </p>
          <p className="text-green-400 font-black uppercase tracking-wider text-sm">
            và những khuyến mãi mới nhất
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="tel:0346270010">
          <Button
            size="large"
            type="primary"
            icon={<PhoneOutlined />}
            className="h-14 px-10 bg-red-600 hover:bg-red-700 border-none font-black rounded-full text-white uppercase tracking-widest text-base shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            Gọi ngay
          </Button>
        </a>
        <a href="/dang-ky-lai-thu">
          <Button
            size="large"
            className="h-14 px-10 bg-transparent border-white/40 text-white hover:bg-white/10 font-black rounded-full uppercase tracking-widest text-base transition-all duration-300 hover:-translate-y-1"
          >
            Đặt lịch lái thử
          </Button>
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
