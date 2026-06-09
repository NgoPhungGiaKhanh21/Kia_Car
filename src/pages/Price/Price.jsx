import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarRequest } from "../../redux/getAllCar/getAllCarSlice";
import Header from "../Home/Header";

// ─── Model Groups ──────────────────────────────────────────────────────────────
const MODEL_GROUPS = [
  { key: "Carnival",    label: "KIA Carnival",      badge: "MPV / Gia đình",   type: "MPV" },
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

function colorMap(color) {
  const map = {
    Black: "#1a1a1a", White: "#f5f5f5", Silver: "#c0c0c0", Gray: "#808080",
    Red: "#dc2626", Blue: "#2563eb", Green: "#16a34a", Orange: "#ea580c",
    "Astra Blue": "#1d4ed8", "Steel Grey": "#6b7280", Pearl: "#f9fafb",
  };
  return map[color] || "#9ca3af";
}

// ─── Single Car Card ──────────────────────────────────────────────────────────
const CarCard = ({ car }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      border: "1.5px solid #e5e7eb",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.25s",
      position: "relative",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#111"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
  >
    {/* Color dot */}
    <span
      style={{
        position: "absolute", top: 12, right: 12, zIndex: 10,
        width: 14, height: 14, borderRadius: "50%",
        border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        background: colorMap(car.color),
      }}
      title={car.color}
    />

    {/* Image */}
    <div style={{ background: "#f8f8f8", padding: 16, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img
        src={car.img}
        alt={car.name}
        style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.4s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "none"}
      />
    </div>

    {/* Info */}
    <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
      <p style={{ fontWeight: 800, fontSize: 13, color: "#111", marginBottom: 2, lineHeight: 1.4 }}>
        {car.name}
      </p>
      <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>{car.color}</p>

      <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>Giá niêm yết</p>
          <p style={{ color: "#111", fontWeight: 900, fontSize: 15 }}>{formatPrice(car.price)}</p>
        </div>
        <a
          href="tel:0346270010"
          style={{
            textDecoration: "none", background: "#111", color: "#fff",
            fontSize: 11, fontWeight: 700, padding: "7px 12px", borderRadius: 10,
            display: "inline-flex", alignItems: "center", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#333"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#111"; }}
        >
          Hỏi giá
        </a>
      </div>
    </div>
  </div>
);

// ─── Model Section ─────────────────────────────────────────────────────────────
const ModelSection = ({ group, cars, index }) => {
  const variants = cars.filter((c) => c.name.includes(group.key));
  if (!variants.length) return null;

  const minPrice = Math.min(...variants.map((c) => c.price));
  const isEven = index % 2 === 0;

  return (
    <section id={group.key.toLowerCase().replace(/ /g, "-")} style={{ marginBottom: 72 }}>
      {/* Section header */}
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 28,
          padding: "32px 36px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 28,
          background: isEven ? "#111" : "#222",
          position: "relative",
        }}
      >
        {/* Subtle bg circle */}
        <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

        {/* Car image */}
        <div style={{ flexShrink: 0, width: 180, height: 110 }}>
          <img
            src={variants[0].img}
            alt={group.label}
            style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))" }}
          />
        </div>

        {/* Text */}
        <div style={{ color: "#fff", flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {group.type}
            </span>
            <span style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
              {variants.length} phiên bản
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, marginBottom: 6, color: "#fff" }}>{group.label}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>{group.badge}</p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginBottom: 4 }}>Giá từ</p>
          <p style={{ color: "#fff", fontWeight: 900, fontSize: "1.3rem", marginBottom: 20 }}>{formatPrice(minPrice)}</p>
          <a
            href="tel:0346270010"
            style={{
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#111", fontWeight: 800, fontSize: 13,
              padding: "10px 22px", borderRadius: 999, transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"; }}
          >
            Tư vấn ngay
          </a>
        </div>
      </div>

      {/* Car variants grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {variants.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};

// ─── Sticky Hotline Banner ─────────────────────────────────────────────────────
const HotlineBanner = () => (
  <div
    style={{
      position: "sticky", top: 0, zIndex: 40, background: "#111",
      color: "#fff", textAlign: "center", padding: "12px 16px",
      fontWeight: 700, fontSize: 13,
    }}
  >
    Hotline tư vấn mua xe:{" "}
    <a href="tel:0346270010" style={{ color: "#fff", fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
      0346 270 010
    </a>{" "}
    <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
      (Gia Hưng) · Nhận báo giá tốt nhất · Giao xe sớm nhất khu vực Miền Nam
    </span>
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
    <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <Header />
      <HotlineBanner />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#111", textTransform: "uppercase", letterSpacing: "0.3em", fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
            Showroom KIA Biên Hòa
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: "#111", marginBottom: 14 }}>
            Bảng Giá Xe KIA 2026
          </h1>
          <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
            Khám phá đầy đủ các phiên bản – so sánh giá và trang bị để tìm chiếc xe hoàn hảo cho bạn
          </p>
        </div>

        {/* Quick nav */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 56 }}>
          {MODEL_GROUPS.map((g) => {
            const has = cars.some((c) => c.name.includes(g.key));
            if (!has) return null;
            return (
              <a
                key={g.key}
                href={`#${g.key.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  textDecoration: "none", padding: "8px 18px", fontSize: 13, fontWeight: 700,
                  borderRadius: 999, border: "1.5px solid #e0e0e0", background: "#fff",
                  color: "#374151", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.color = "#111"; e.currentTarget.style.background = "#f5f5f5"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "#fff"; }}
              >
                {g.label}
              </a>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "4px solid #111", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Model sections */}
        {!loading &&
          MODEL_GROUPS.map((group, i) => (
            <ModelSection key={group.key} group={group} cars={cars} index={i} />
          ))}
      </div>
    </div>
  );
};

export default Products;
