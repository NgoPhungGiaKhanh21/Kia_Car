const CARS = [
  { label: "KIA Carnival", path: "/san-pham/carnival" },
  { label: "KIA Sorento", path: "/san-pham/sorento" },
  { label: "KIA Seltos", path: "/san-pham/seltos" },
  { label: "KIA Sonet", path: "/san-pham/sonet" },
  { label: "KIA Sportage", path: "/san-pham/sportage" },
  { label: "KIA Carens", path: "/san-pham/carens" },
  { label: "KIA K5", path: "/san-pham/k5" },
  { label: "KIA K3", path: "/san-pham/k3" },
  { label: "KIA Soluto", path: "/san-pham/soluto" },
  { label: "KIA New Morning", path: "/san-pham/morning" },
  { label: "KIA Morning MT", path: "/san-pham/morning" },
];

const MENU = [
  { label: "Trang Chủ", path: "/" },
  { label: "Sản Phẩm", path: "/san-pham/carnival" },
  { label: "Bảng Giá", path: "/bang-gia" },
  { label: "Tin Tức", path: "/tin-tuc" },
  { label: "Lái Thử", path: "/dang-ky-lai-thu" },
];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.684!2d106.83!3d10.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d56fb8e0b36b%3A0x1f1d2e23bb9cf2b9!2zU-G7kSAxOSDEkMaw4budbmcgMkEsIFBoxrDhu51uZyBBbiBCw6xuaCwgVHAuIEJpw6puIEjDsmEsIMSQ4buTbmcgTmFp!5e0!3m2!1svi!2svn!4v1700000000000";

const MAP_LINK =
  "https://www.google.com/maps/search/Số+19+Đường+2A,+Phường+An+Bình,+Tp.+Biên+Hòa,+Đồng+Nai";

const FB_URL = "https://www.facebook.com/profile.php?id=61574366108542";
const ZALO_URL = "https://zalo.me/0346270010";

/* ─── tiny SVG icons ─────────────────────────────────────────── */
const IconPhone = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPin = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconFb = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
const IconZalo = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" width="16" height="16">
    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm-2.5 28.5h-3v-13h3v13zm-1.5-15a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm15 15h-2.7l-5.3-8.2v8.2h-3v-13h2.8l5.2 8v-8h3v13z" />
  </svg>
);
const IconArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    width="12"
    height="12"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── hover helper ──────────────────────────────────────────── */
const hoverLink = {
  color: "#aaa",
  fontSize: 13,
  textDecoration: "none",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  gap: 6,
  transition: "color 0.2s, padding-left 0.2s",
};

const Footer = () => (
  <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1c1c1c" }}>
    {/* ── Top accent line ── */}
    <div
      style={{
        height: 3,
        background:
          "linear-gradient(90deg, #e8001d 0%, #ff4d4d 50%, transparent 100%)",
      }}
    />

    {/* ── Main grid ─────────────────────────────────────────── */}
    <div
      className="footer-main"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "64px 32px 48px",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr 1fr 1.6fr",
        gap: 48,
      }}
    >
      {/* Col 1 — Brand */}
      <div>
        <img
          src="https://kiabienhoa.com.vn/images/logo.png"
          alt="KIA"
          style={{
            height: 36,
            marginBottom: 20,
            filter: "brightness(0) invert(1)",
          }}
        />

        <p
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 16,
            marginBottom: 4,
            letterSpacing: "0.04em",
          }}
        >
          KIA Biên Hòa
        </p>
        <p
          style={{
            color: "#e8001d",
            fontWeight: 700,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: 24,
          }}
        >
          Đồng Nai
        </p>

        <p
          style={{
            color: "white",
            fontSize: 12,
            lineHeight: 1.8,
            marginBottom: 24,
          }}
        >
          Đại lý KIA ủy quyền chính hãng tại Biên Hòa – Đồng Nai. Chúng tôi cam
          kết mang đến trải nghiệm mua xe tốt nhất.
        </p>

        {/* Contact list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...hoverLink, alignItems: "flex-start" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            <span style={{ color: "#e8001d", marginTop: 2, flexShrink: 0 }}>
              <IconPin />
            </span>
            Số 19 Đường 2A, P. An Bình, Tp. Biên Hòa, Đồng Nai
          </a>
          <a
            href="tel:0346270010"
            style={hoverLink}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            <span style={{ color: "#e8001d" }}>
              <IconPhone />
            </span>
            0346 270 010 &nbsp;
            <span style={{ color: "white", fontWeight: 600 }}>(Gia Hưng)</span>
          </a>
          <a
            href="mailto:duonggiahung2004@gmail.com"
            style={{ ...hoverLink, wordBreak: "break-all" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            <span style={{ color: "#e8001d", flexShrink: 0 }}>
              <IconMail />
            </span>
            duonggiahung2004@gmail.com
          </a>
        </div>

        {/* Social buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {[
            {
              href: FB_URL,
              bg: "#1877f2",
              icon: <IconFb />,
              label: "Facebook",
            },
            {
              href: ZALO_URL,
              bg: "#0068ff",
              icon: <IconZalo />,
              label: "Zalo",
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 999,
                background: s.bg,
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: `0 4px 12px ${s.bg}55`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 20px ${s.bg}77`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${s.bg}55`;
              }}
            >
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Col 2 — Menu */}
      <div>
        <p
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: 24,
            paddingBottom: 12,
            borderBottom: "1px solid #1e1e1e",
          }}
        >
          Menu
        </p>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {MENU.map((item) => (
            <a
              key={item.label}
              href={item.path}
              style={{
                ...hoverLink,
                padding: "6px 0",
                borderBottom: "1px solid #111",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.paddingLeft = "6px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#aaa";
                e.currentTarget.style.paddingLeft = "0";
              }}
            >
              <span style={{ color: "#e8001d" }}>
                <IconArrow />
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Col 3 — Dòng xe */}
      <div>
        <p
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: 24,
            paddingBottom: 12,
            borderBottom: "1px solid #1e1e1e",
          }}
        >
          Dòng Xe
        </p>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {CARS.map((car) => (
            <a
              key={car.label}
              href={car.path}
              style={{
                ...hoverLink,
                padding: "5px 0",
                borderBottom: "1px solid #111",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.paddingLeft = "6px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#aaa";
                e.currentTarget.style.paddingLeft = "0";
              }}
            >
              <span style={{ color: "#e8001d" }}>
                <IconArrow />
              </span>
              {car.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Col 4 — Map */}
      <div>
        <p
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: 24,
            paddingBottom: 12,
            borderBottom: "1px solid #1e1e1e",
          }}
        >
          Showroom
        </p>

        {/* Map card */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #222",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <iframe
            title="KIA Biên Hòa Map"
            src={MAP_EMBED}
            width="100%"
            height="220"
            style={{ border: "none", display: "block", pointerEvents: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px",
              background: "#111",
              color: "#e8001d",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
          >
            <IconPin /> Mở trong Google Maps ↗
          </a>
        </div>
      </div>
    </div>

    {/* ── Divider ── */}
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, #333, transparent)",
        }}
      />
    </div>

    {/* ── Bottom bar ── */}
    <div
      style={{
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <p style={{ color: "#444", fontSize: 12, margin: 0 }}>
        © {new Date().getFullYear()} KIA Biên Hòa – Thaco Kia. Giá tham khảo, có
        thể thay đổi.
      </p>
      <div style={{ display: "flex", gap: 20 }}>
        {["Chính sách bảo mật", "Điều khoản sử dụng"].map((t) => (
          <a
            key={t}
            href="#"
            style={{ color: "#444", fontSize: 12, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          >
            {t}
          </a>
        ))}
      </div>
    </div>

    <style>{`
            @media (max-width: 1024px) {
                .footer-main { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 640px) {
                .footer-main { grid-template-columns: 1fr !important; padding: 40px 20px 32px !important; }
            }
        `}</style>
  </footer>
);

export default Footer;
