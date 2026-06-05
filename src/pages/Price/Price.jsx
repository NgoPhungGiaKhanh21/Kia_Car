import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarRequest } from "../../redux/getAllCar/getAllCarSlice";
import { PhoneOutlined } from "@ant-design/icons";
import Header from "../Home/Header";

// ─── Model Groups ──────────────────────────────────────────────────────────────
const MODEL_GROUPS = [
  { key: "Carnival",    label: "KIA Carnival",      badge: "MPV / Gia đình",   type: "Hybrid" },
  { key: "Sorento",     label: "KIA Sorento",        badge: "SUV 7 chỗ",        type: "SUV" },
  { key: "Seltos",      label: "KIA Seltos",         badge: "SUV Đô thị",       type: "SUV" },
  { key: "Sonet",       label: "KIA Sonet",          badge: "SUV Compact",      type: "SUV" },
  { key: "Sportage",    label: "KIA Sportage",       badge: "SUV Thể thao",     type: "SUV" },
  { key: "Carens",      label: "KIA Carens",         badge: "MPV Thông minh",   type: "MPV" },
  { key: "K5",          label: "KIA K5",             badge: "Sedan Hạng D",     type: "Sedan" },
  { key: "K3",          label: "KIA K3",             badge: "Sedan Hạng C",     type: "Sedan" },
  { key: "Soluto",      label: "KIA Soluto",         badge: "Sedan Hạng B",     type: "Sedan" },
  { key: "New Morning", label: "KIA New Morning",    badge: "Hatchback",        type: "Hatchback" },
  { key: "Morning MT",  label: "KIA Morning MT",     badge: "Hatchback",        type: "Hatchback" },
];

function formatPrice(price) {
  if (price >= 1_000_000_000)
    return `${(price / 1_000_000_000).toLocaleString("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })} Tỷ`;
  return `${(price / 1_000_000).toLocaleString("vi-VN")} Triệu`;
}

// ─── Single Car Card ──────────────────────────────────────────────────────────
const CarCard = ({ car }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">

      {/* Color dot */}
      <span className="absolute top-3 right-3 z-10 w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: colorMap(car.color) }} title={car.color} />

      {/* Image */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 h-48 flex items-center justify-center overflow-hidden">
        <img
          src={car.img}
          alt={car.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-gray-900 font-black text-sm leading-snug mb-1 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
          {car.name}
        </h3>
        <p className="text-gray-400 text-xs mb-3">{car.color}</p>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400">Giá niêm yết</p>
            <p className="text-red-600 font-black text-base">{formatPrice(car.price)}</p>
          </div>
          <a
            href="tel:0346270010"
            className="no-underline bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-200 flex items-center gap-1"
          >
            <PhoneOutlined /> Hỏi giá
          </a>
        </div>
      </div>
    </div>
  );
};

function colorMap(color) {
  const map = {
    Black: "#1a1a1a", White: "#f5f5f5", Silver: "#c0c0c0", Gray: "#808080",
    Red: "#dc2626", Blue: "#2563eb", Green: "#16a34a", Orange: "#ea580c",
    "Astra Blue": "#1d4ed8", "Steel Grey": "#6b7280", Pearl: "#f9fafb",
  };
  return map[color] || "#9ca3af";
}

// ─── Model Section ─────────────────────────────────────────────────────────────
const ModelSection = ({ group, cars, index }) => {
  const variants = cars.filter((c) => c.name.includes(group.key));
  if (!variants.length) return null;

  const minPrice = Math.min(...variants.map((c) => c.price));
  const isEven = index % 2 === 0;

  return (
    <section id={group.key.toLowerCase().replace(/ /g, "-")} className="mb-20">
      {/* Section header */}
      <div
        className={`relative rounded-3xl overflow-hidden mb-8 p-8 flex flex-col sm:flex-row items-center gap-6 ${
          isEven
            ? "bg-gradient-to-r from-gray-900 to-gray-800"
            : "bg-gradient-to-r from-red-700 to-red-900"
        }`}
      >
        {/* Decorative blur */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

        {/* Representative image */}
        <div className="relative w-52 h-32 flex-shrink-0">
          <img
            src={variants[0].img}
            alt={group.label}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Text */}
        <div className="relative text-white text-center sm:text-left">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              {variants.length} phiên bản
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-2">{group.label}</h2>
          <p className="text-white/70 text-sm mb-3">
            Giá từ{" "}
            <span className="text-yellow-400 font-black text-lg">{formatPrice(minPrice)}</span>
          </p>
          <a
            href="tel:0346270010"
            className="no-underline inline-flex items-center gap-2 bg-white text-red-600 font-black text-sm px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <PhoneOutlined /> Tư vấn ngay
          </a>
        </div>
      </div>

      {/* Car variants grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {variants.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};

// ─── Floating Hotline ──────────────────────────────────────────────────────────
const FloatingHotline = () => {
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setPulse((v) => !v), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
      {/* Label bubble */}
      <div
        className="bg-white shadow-xl rounded-2xl px-4 py-3 border border-red-100 text-center"
        style={{ boxShadow: "0 8px 30px rgba(220,38,38,0.15)" }}
      >
        <p className="text-gray-500 text-xs mb-0.5">Hotline tư vấn</p>
        <a
          href="tel:0346270010"
          className="no-underline text-red-600 font-black text-lg block hover:text-red-700 transition-colors"
        >
          0346 270 010
        </a>
        <p className="text-gray-400 text-[10px]">Gia Hưng · 24/7</p>
      </div>

      {/* Phone button */}
      <a
        href="tel:0346270010"
        className="no-underline relative w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110"
        style={{ boxShadow: "0 8px 25px rgba(220,38,38,0.5)" }}
      >
        {/* Ripple rings */}
        <span
          className="absolute inset-0 rounded-full bg-red-600 opacity-30 animate-ping"
          style={{ animationDuration: "1.5s" }}
        />
        <span
          className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping"
          style={{ animationDuration: "2s", animationDelay: "0.5s" }}
        />
        <PhoneOutlined className="text-white text-2xl relative z-10" />
      </a>
    </div>
  );
};

// ─── Sticky Hotline Banner ─────────────────────────────────────────────────────
const HotlineBanner = () => (
  <div
    className="sticky top-0 z-40 text-white text-center py-3 px-4 font-bold text-sm"
    style={{ background: "linear-gradient(90deg, #991b1b 0%, #dc2626 50%, #991b1b 100%)" }}
  >
    📞 Hotline tư vấn mua xe:{" "}
    <a href="tel:0346270010" className="no-underline text-yellow-300 font-black text-base hover:text-yellow-200 transition-colors">
      0346 270 010
    </a>{" "}
    <span className="text-white/80">(Gia Hưng) · Nhận báo giá tốt nhất · Giao xe sớm nhất khu vực Miền Nam</span>
  </div>
);

// ─── Products Page ─────────────────────────────────────────────────────────────
const Products = () => {
  const dispatch = useDispatch();
  const { getAllCar, loading } = useSelector((state) => state.getAllCar);
  const cars = getAllCar?.data?.data || [];

  useEffect(() => {
    if (!cars.length) dispatch(getAllCarRequest());
  }, [dispatch, cars.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Sticky hotline banner */}
      <HotlineBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="text-center mb-14">
          <p className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold mb-3">
            Showroom KIA Biên Hòa
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Tất Cả Dòng Xe KIA
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Khám phá đầy đủ các phiên bản – so sánh giá và trang bị để tìm chiếc xe hoàn hảo cho bạn
          </p>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-14">
          {MODEL_GROUPS.map((g) => {
            const has = cars.some((c) => c.name.includes(g.key));
            if (!has) return null;
            return (
              <a
                key={g.key}
                href={`#${g.key.toLowerCase().replace(/ /g, "-")}`}
                className="no-underline px-4 py-2 text-sm font-bold rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:text-red-600 transition-all duration-300"
              >
                {g.label}
              </a>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
          </div>
        )}

        {/* Model sections */}
        {!loading &&
          MODEL_GROUPS.map((group, i) => (
            <ModelSection key={group.key} group={group} cars={cars} index={i} />
          ))}
      </div>

      {/* Floating hotline button */}
      <FloatingHotline />
    </div>
  );
};

export default Products;
