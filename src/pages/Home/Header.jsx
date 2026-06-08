import { useState, useEffect, useRef } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, CarOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

// ─── Shared model config (key → display) ──────────────────────────────────────
const MODEL_CONFIG = [
  { key: "Carnival",    display: "KIA Carnival",    badge: "MPV / Gia đình",  icon: "🚐" },
  { key: "Sorento",     display: "KIA Sorento",     badge: "SUV 7 chỗ",       icon: "🚙" },
  { key: "Seltos",      display: "KIA Seltos",      badge: "SUV Đô thị",      icon: "🚗" },
  { key: "Sonet",       display: "KIA Sonet",       badge: "SUV Compact",     icon: "🚗" },
  { key: "Sportage",    display: "KIA Sportage",    badge: "SUV Thể thao",    icon: "🏎️" },
  { key: "Carens",      display: "KIA Carens",      badge: "MPV Thông minh",  icon: "🚐" },
  { key: "K5",          display: "KIA K5",          badge: "Sedan Hạng D",    icon: "🚘" },
  { key: "K3",          display: "KIA K3",          badge: "Sedan Hạng C",    icon: "🚘" },
  { key: "Soluto",      display: "KIA Soluto",      badge: "Sedan Hạng B",    icon: "🚘" },
  { key: "New Morning", display: "KIA New Morning", badge: "Hatchback",       icon: "🚗", path: "/san-pham/morning" },
  { key: "Morning MT",  display: "KIA Morning MT",  badge: "Hatchback",       icon: "🚗", path: "/san-pham/morning" },
];

function formatPrice(price) {
  if (price >= 1_000_000_000)
    return `${(price / 1_000_000_000).toLocaleString("vi-VN", { minimumFractionDigits: 3 })} Tỷ`;
  return `${(price / 1_000_000).toLocaleString("vi-VN")} Triệu`;
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────
const MegaMenu = ({ visible }) => {
  const { getAllCar } = useSelector((s) => s.getAllCar);
  const cars = getAllCar?.data?.data || [];

  const models = MODEL_CONFIG.map((cfg) => {
    const matched = cars.filter((c) => c.name.includes(cfg.key));
    if (!matched.length) return null;
    const minPrice = Math.min(...matched.map((c) => c.price));
    return { ...cfg, img: matched[0].img, minPrice };
  }).filter(Boolean);

  return (
    <div
      className="transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="bg-white/95 backdrop-blur-xl shadow-2xl border-t-2"
        style={{ borderColor: "#111", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Top label */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-bold mb-1" style={{ color: "#111" }}>
                Khám phá dòng xe
              </p>
              <h3 className="text-gray-900 text-xl font-black">
                Danh mục sản phẩm KIA Biên Hòa 2026
              </h3>
            </div>
          </div>

          {/* Car grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {models.map((model) => (
              <a
                key={model.key}
                href={model.path || `/san-pham/${model.key.toLowerCase().replace(/ /g, "-")}`}
                className="no-underline group relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-3 flex flex-col items-center text-center cursor-pointer"
                style={{ "--tw-border-opacity": 1 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#111"}
                onMouseLeave={e => e.currentTarget.style.borderColor = ""}
              >
                <div className="w-full h-32 flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={model.img}
                    alt={model.display}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-gray-800 font-black text-xs leading-snug mb-1 transition-colors duration-300 group-hover:text-black">
                  {model.display}
                </p>
                <div className="mt-auto w-full pt-2 border-t border-gray-200">
                  <p className="text-[10px] text-gray-400">Giá từ</p>
                  <p className="font-black text-xs" style={{ color: "#111" }}>
                    {formatPrice(model.minPrice)}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-3 items-center justify-end">
            <a href="tel:0346270010" className="no-underline">
              <Button
                size="small"
                icon={<CarOutlined />}
                className="border-none rounded-full font-bold text-xs px-5 text-white"
                style={{ background: "#111", color: "#fff" }}
              >
                Tư vấn ngay · 0346 270 010
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setMegaOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMega = () => setMegaOpen((prev) => !prev);

  const navItems = [
    { label: "Trang chủ", link: "/",         hasMega: false },
    { label: "Sản phẩm",  link: "",           hasMega: true },
    { label: "Bảng giá",  link: "/bang-gia",  hasMega: false },
    { label: "Tin tức",   link: "#",          hasMega: false },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-1 border-gray-200"
            : "bg-white shadow-sm py-3 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center cursor-pointer no-underline group">
              <img
                src="https://kiabienhoa.com.vn/images/logo.png"
                alt="KIA Logo"
                className={`transition-all duration-500 group-hover:scale-105 ${isScrolled ? "h-10" : "h-14"}`}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {navItems.map((item, index) =>
                item.hasMega ? (
                  <div key={index} className="relative" ref={megaRef}>
                    <div
                      onClick={toggleMega}
                      className="flex items-center gap-1 px-2 py-2 text-sm lg:text-base font-bold transition-all duration-300 uppercase tracking-widest relative group cursor-pointer select-none text-gray-800 hover:text-black"
                      style={megaOpen ? { color: "#111" } : {}}
                    >
                      {item.label}
                      <RightOutlined
                        className="text-xs transition-transform duration-300"
                        style={{ transform: megaOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                      />
                      <span
                        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                        style={{ background: "#111", width: megaOpen ? "100%" : "0%" }}
                      />
                    </div>

                    {/* Mega menu */}
                    <div
                      className="fixed left-0 right-0 z-50"
                      style={{
                        top: isScrolled ? "74px" : "104px",
                        pointerEvents: megaOpen ? "auto" : "none",
                      }}
                    >
                      <MegaMenu visible={megaOpen} />
                    </div>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={item.link}
                    className="text-gray-800 hover:text-black px-2 py-2 text-sm lg:text-base font-bold transition-all duration-300 uppercase tracking-widest relative group no-underline"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: "#111" }} />
                  </a>
                )
              )}
            </nav>

            {/* Lái thử button */}
            <div className="hidden md:flex items-center">
              <a href="/dang-ky-lai-thu">
                <Button
                  type="primary"
                  icon={<CarOutlined className="text-xl" />}
                  size="large"
                  className="h-12 px-6 border-none font-extrabold rounded-full uppercase tracking-widest flex items-center transition-all duration-300 transform hover:-translate-y-1 text-white"
                  style={{ background: "#111", boxShadow: "0 4px 10px rgba(0,0,0,0.25)" }}
                >
                  Lái thử ngay
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                type="text"
                icon={<MenuOutlined className="text-3xl text-gray-900" />}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <a href="/" className="flex-shrink-0 flex items-center cursor-pointer no-underline">
            <img src="https://kiabienhoa.com.vn/images/logo.png" alt="KIA Logo" className="h-10" />
          </a>
        }
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={300}
        headerStyle={{ backgroundColor: "#ffffff", borderBottom: "1px solid #f3f4f6" }}
        bodyStyle={{ backgroundColor: "#ffffff", padding: "1.5rem" }}
        closeIcon={<span className="text-gray-800 text-xl hover:text-black transition-colors">✕</span>}
      >
        <div className="flex flex-col space-y-3 mt-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-gray-800 hover:text-black text-lg font-bold px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg uppercase no-underline transition-all duration-300 flex items-center justify-between group border border-transparent"
              style={{ "--tw-border-opacity": 1 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#ddd"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
              <RightOutlined className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
            </a>
          ))}
          <div className="pt-6 mt-4 border-t border-gray-100">
            <a href="/dang-ky-lai-thu">
              <Button
                icon={<CarOutlined />}
                size="large"
                className="h-14 w-full font-extrabold rounded-xl uppercase shadow-md border-none text-white text-base flex items-center justify-center"
                style={{ background: "#111" }}
              >
                Đăng ký lái thử
              </Button>
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
