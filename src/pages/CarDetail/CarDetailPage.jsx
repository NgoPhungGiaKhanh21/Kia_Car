import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarRequest } from "../../redux/getAllCar/getAllCarSlice";
import { Link } from "react-router-dom";
import { PhoneOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import Header from "../Home/Header";

function formatPrice(price) {
  if (price >= 1_000_000_000)
    return `${(price / 1_000_000_000).toLocaleString("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })} Tỷ`;
  return `${(price / 1_000_000).toLocaleString("vi-VN")} Triệu`;
}

// Xóa phần trong ngoặc đơn: "(Nội thất Đen)", "(Nội thất Nâu)"...
function cleanName(name) {
  return name?.replace(/\s*\(.*?\)/g, "").trim() || "";
}

/**
 * @param {string}   carKey      - keyword filter (e.g. "carnival", "sorento")
 * @param {string}   displayName - label shown in hero (e.g. "NEW CARNIVAL")
 * @param {string}   tagline     - main heading line 1
 * @param {string}   highlight   - main heading line 2 (red)
 * @param {string|null} pdfFile  - filename in /public (e.g. "brochure-carnival.pdf"), null = ẩn
 */
const CarDetailPage = ({
  carKey,
  displayName,
  tagline,
  highlight,
  pdfFile,
  children,
}) => {
  const dispatch = useDispatch();
  const { getAllCar, loading } = useSelector((state) => state.getAllCar);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbItemRefs = useRef([]);
  const thumbScrollRef = useRef(null);
  const variantsRef = useRef([]);

  useEffect(() => {
    dispatch(getAllCarRequest());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  // Reset về index 0 khi đổi xe (carKey thay đổi)
  useEffect(() => {
    setSelectedIndex(0);
  }, [carKey]);

  const allCars = getAllCar?.data?.data || [];
  const variants = allCars.filter((car) =>
    car.name.toLowerCase().includes(carKey.toLowerCase()),
  );

  const selected = variants[selectedIndex] || null;

  const handlePrev = () => {
    const len = variantsRef.current.length;
    if (len === 0) return;
    setSelectedIndex((prev) => (prev - 1 + len) % len);
  };

  const handleNext = () => {
    const len = variantsRef.current.length;
    if (len === 0) return;
    setSelectedIndex((prev) => (prev + 1) % len);
  };

  const goTo = (idx) => setSelectedIndex(idx);

  // Scroll thumbnail vào giữa
  useEffect(() => {
    const el = thumbItemRefs.current[selectedIndex];
    const container = thumbScrollRef.current;
    if (!el || !container) return;
    container.scrollTo({
      left: el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [selectedIndex]);

  if (loading && variants.length === 0) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gray-950">
          <Spin size="large" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: "100vh",
          minHeight: 600,
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 60%, #2a2a2a 100%)",
        }}
      >
        {/* Glow blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #e8001d 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-5"
            style={{
              background:
                "radial-gradient(circle, #e8001d 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Car image */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
          <img
            key={selected?.id}
            src={selected?.img}
            alt={selected?.name}
            className="h-full object-contain"
            style={{
              maxHeight: "90vh",
              paddingRight: "4vw",
              animation: "fadeIn 0.4s ease",
            }}
          />
        </div>

        {/* Left gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, transparent 75%)",
          }}
        />

        {/* Text */}
        <div
          className="relative z-10 h-full flex flex-col justify-center pl-12 lg:pl-24"
          style={{ maxWidth: 560 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.4em] mb-4"
            style={{ color: "#e8001d" }}
          >
            {displayName}
          </p>
          <h1
            className="font-black leading-tight text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
          >
            {tagline}
            {highlight && (
              <>
                <br />
                <span style={{ color: "#e8001d" }}>{highlight}</span>
              </>
            )}
          </h1>

          <p className="text-white font-bold text-lg mb-1">
            {cleanName(selected?.name)}
          </p>

          <div className="mb-8">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              Giá từ
            </p>
            <p
              className="font-black"
              style={{ fontSize: "2rem", color: "#e8001d" }}
            >
              {selected ? formatPrice(selected.price) : "—"}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a href="tel:0346270010">
              <Button
                type="primary"
                size="large"
                icon={<PhoneOutlined />}
                style={{
                  background: "#e8001d",
                  border: "none",
                  borderRadius: 999,
                  fontWeight: 700,
                  height: 48,
                  paddingInline: 28,
                }}
              >
                Liên hệ ngay
              </Button>
            </a>
            {pdfFile && (
              <Button
                size="large"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  borderRadius: 999,
                  fontWeight: 700,
                  height: 48,
                  paddingInline: 28,
                }}
                onClick={() =>
                  document
                    .getElementById("brochure-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Xem Brochure
              </Button>
            )}
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <LeftOutlined />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <RightOutlined />
        </button>

        {/* Dots */}
        <div className="absolute bottom-28 left-12 z-20 flex gap-2">
          {variants.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === selectedIndex ? 32 : 8,
                height: 8,
                background:
                  i === selectedIndex ? "#e8001d" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── VARIANT THUMBNAILS ─────────────────────────────────────── */}
      <section
        className="w-full"
        style={{ background: "#111111", borderTop: "1px solid #222" }}
      >
        <div className="w-full flex items-stretch" style={{ minHeight: 140 }}>
          <button
            onClick={handlePrev}
            className="flex-shrink-0 flex items-center justify-center px-4 text-white/50 hover:text-white transition-colors duration-200"
            style={{ background: "#0d0d0d", minWidth: 48 }}
          >
            <LeftOutlined />
          </button>

          <div
            className="flex-1 flex overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
            ref={thumbScrollRef}
          >
            {variants.map((v, i) => (
              <button
                key={v.id}
                ref={(el) => (thumbItemRefs.current[i] = el)}
                onClick={() => goTo(i)}
                className="flex-1 flex items-center gap-3 px-5 py-4 text-left transition-all duration-300 cursor-pointer border-none outline-none"
                style={{
                  background: i === selectedIndex ? "#1a1a1a" : "transparent",
                  borderBottom:
                    i === selectedIndex
                      ? "3px solid #e8001d"
                      : "3px solid transparent",
                  minWidth: 200,
                }}
              >
                <img
                  src={v.img}
                  alt={v.name}
                  className="flex-shrink-0"
                  style={{
                    width: 90,
                    height: 60,
                    objectFit: "contain",
                    filter:
                      i === selectedIndex
                        ? "none"
                        : "grayscale(0.4) brightness(0.7)",
                    transition: "filter 0.3s",
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <p
                    className="font-bold leading-tight mb-1"
                    style={{
                      color: i === selectedIndex ? "#fff" : "#888",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cleanName(v.name)}
                  </p>
                  <p
                    style={{
                      color: i === selectedIndex ? "#e8001d" : "#555",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {formatPrice(v.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex-shrink-0 flex items-center justify-center px-4 text-white/50 hover:text-white transition-colors duration-200"
            style={{ background: "#0d0d0d", minWidth: 48 }}
          >
            <RightOutlined />
          </button>
        </div>
      </section>

      {/* ── CUSTOM CONTENT (per-car) ──────────────────────────────── */}
      {children}

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #e8001d 0%, #a50015 100%)",
          padding: "60px 32px",
          textAlign: "center",
        }}
      >
        <p className="text-red-100 text-xs uppercase tracking-widest font-bold mb-3">
          Tư vấn & Đặt xe
        </p>
        <h2 className="text-white font-black text-3xl mb-2">
          Liên hệ ngay để nhận ưu đãi
        </h2>
        <p className="text-red-200 mb-8 text-base">
          Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn 24/7
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="tel:0346270010">
            <Button
              size="large"
              icon={<PhoneOutlined />}
              style={{
                background: "#fff",
                color: "#e8001d",
                border: "none",
                borderRadius: 999,
                fontWeight: 800,
                height: 52,
                paddingInline: 36,
                fontSize: 16,
              }}
            >
              0346 270 010
            </Button>
          </a>
          <Link to="/">
            <Button
              size="large"
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
                borderRadius: 999,
                fontWeight: 700,
                height: 52,
                paddingInline: 36,
              }}
            >
              Xem dòng xe khác
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CarDetailPage;
