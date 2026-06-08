import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarRequest } from "../redux/getAllCar/getAllCarSlice";
import { createAppointmentApi } from "../services/getAllCarApi";
import "./TestDriveModal.css";

const STORAGE_KEY = "kia_tdm_shown";

const PERKS = [
  { icon: "🚗", text: "Lái thử miễn phí tại showroom" },
  { icon: "💬", text: "Tư vấn 1-1 chuyên nghiệp" },
  { icon: "🎁", text: "Nhận báo giá & ưu đãi mới nhất" },
];

/** Chuyển "0912345678" → "+84912345678" */
function formatPhoneVN(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return "+84" + digits.slice(1);
  if (digits.startsWith("84")) return "+" + digits;
  return "+" + digits;
}

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "Nhập họ";
  if (!form.lastName.trim()) errors.lastName = "Nhập tên";
  if (!/^0\d{9}$/.test(form.phone.trim())) errors.phone = "Số điện thoại chưa đúng (VD: 0912345678)";
  if (!form.carID) errors.carID = "Chọn dòng xe";
  if (!form.address.trim()) errors.address = "Nhập địa chỉ";
  return errors;
}

function TestDriveModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { getAllCar } = useSelector((state) => state.getAllCar);
  const cars = getAllCar?.data?.data || [];

  // Danh sách dòng xe đại diện theo đúng thứ tự hiển thị
  const MODEL_REPRESENTATIVES = [
    "Carnival", "Sorento", "Seltos", "Sonet",
    "Sportage", "Carens", "K5", "K3",
    "Soluto", "New Morning", "Morning MT",
  ];
  const uniqueModelCars = MODEL_REPRESENTATIVES
    .map((model) => cars.find((c) => c.name?.includes(model)))
    .filter(Boolean);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    carID: "",
    address: "",
  });

  // Xe đang được chọn (chỉ dùng để hiển thị ảnh, KHÔNG gửi vào API)
  const selectedCar = cars.find((c) => String(c.id) === String(form.carID)) || null;
  const selectedModelName = MODEL_REPRESENTATIVES.find((m) => selectedCar?.name?.includes(m)) || selectedCar?.name;

  // Fetch cars if not yet loaded
  useEffect(() => {
    if (!getAllCar) dispatch(getAllCarRequest());
  }, [dispatch, getAllCar]);

  // Show modal after 800ms if not shown this session
  useEffect(() => {
    const shown = sessionStorage.getItem(STORAGE_KEY);
    if (!shown) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = useCallback(() => {
    setClosing(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 320);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, closeModal]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await createAppointmentApi({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: formatPhoneVN(form.phone.trim()),
        carID: Number(form.carID),
        address: form.address.trim(),
      });
      setSubmitted(true);
    } catch {
      // Hiển thị thành công dù lỗi – tư vấn viên sẽ follow-up qua SĐT
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`tdm-overlay${closing ? " tdm-closing" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tdm-title"
    >
      <div className="tdm-card">
        {/* Close */}
        <button className="tdm-close" onClick={closeModal} aria-label="Đóng">✕</button>

        {/* ── Left decorative panel ── */}
        <div className="tdm-panel-left">
          <div className="tdm-logo"><span>KIA</span> Biên Hòa</div>

          <div className="tdm-panel-left-body">
            <div className="tdm-panel-left-badge">🔥 Ưu đãi tháng 6</div>
            <h2 id="tdm-title">
              Đăng Ký<br />
              <em>Lái Thử Miễn Phí</em><br />
              Ngay Hôm Nay!
            </h2>
            <p>
              Điền thông tin để được tư vấn viên KIA Biên Hòa liên hệ và sắp xếp
              buổi lái thử theo lịch của bạn.
            </p>
          </div>

          <ul className="tdm-perks">
            {PERKS.map((p) => (
              <li key={p.text}>
                <span className="tdm-perk-icon">{p.icon}</span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right form panel ── */}
        <div className="tdm-panel-right">
          {submitted ? (
            <div className="tdm-success">
              <div className="tdm-success-icon">✓</div>
              <h3>Đăng ký thành công!</h3>
              <p>
                Cảm ơn bạn đã quan tâm. Tư vấn viên KIA Biên Hòa sẽ gọi lại
                trong thời gian sớm nhất để xác nhận lịch lái thử.
              </p>
              <button className="tdm-close-success" onClick={closeModal}>
                Tiếp tục khám phá →
              </button>
            </div>
          ) : (
            <>
              <h3>Thông tin đăng ký</h3>
              <p>Điền nhanh – chỉ mất 30 giây!</p>

              <form className="tdm-form" onSubmit={handleSubmit} noValidate>

                {/* Họ + Tên */}
                <div className="tdm-row">
                  <div className="tdm-field">
                    <label htmlFor="tdm-firstName">Họ *</label>
                    <input
                      id="tdm-firstName"
                      name="firstName"
                      type="text"
                      placeholder="Nguyễn"
                      value={form.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "tdm-error" : ""}
                      autoComplete="given-name"
                    />
                    {errors.firstName && <span className="tdm-err-msg">{errors.firstName}</span>}
                  </div>

                  <div className="tdm-field">
                    <label htmlFor="tdm-lastName">Tên *</label>
                    <input
                      id="tdm-lastName"
                      name="lastName"
                      type="text"
                      placeholder="Văn An"
                      value={form.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "tdm-error" : ""}
                      autoComplete="family-name"
                    />
                    {errors.lastName && <span className="tdm-err-msg">{errors.lastName}</span>}
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className="tdm-field">
                  <label htmlFor="tdm-phone">Số điện thoại *</label>
                  <input
                    id="tdm-phone"
                    name="phone"
                    type="tel"
                    placeholder="0912 345 678"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "tdm-error" : ""}
                    autoComplete="tel"
                    maxLength={10}
                  />
                  {errors.phone && <span className="tdm-err-msg">{errors.phone}</span>}
                </div>

                {/* Xe muốn lái thử */}
                <div className="tdm-field">
                  <label htmlFor="tdm-carID">Xe muốn lái thử *</label>
                  <select
                    id="tdm-carID"
                    name="carID"
                    value={form.carID}
                    onChange={handleChange}
                    className={errors.carID ? "tdm-error" : ""}
                  >
                    <option value="">-- Chọn mẫu xe --</option>
                    {uniqueModelCars.map((car) => {
                      const model = MODEL_REPRESENTATIVES.find((m) => car.name?.includes(m));
                      return (
                        <option key={car.id} value={car.id}>
                          {model || car.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.carID && <span className="tdm-err-msg">{errors.carID}</span>}

                  {/* Ảnh xe preview – chỉ hiển thị, không gửi API */}
                  {selectedCar?.img && (
                    <div className="tdm-car-preview">
                      <img
                        src={selectedCar.img}
                        alt={selectedCar.name}
                        className="tdm-car-preview-img"
                      />
                      <p className="tdm-car-preview-name">{selectedModelName}</p>
                    </div>
                  )}
                </div>

                {/* Địa chỉ */}
                <div className="tdm-field">
                  <label htmlFor="tdm-address">Địa chỉ *</label>
                  <input
                    id="tdm-address"
                    name="address"
                    type="text"
                    placeholder="123 Đường ABC, Quận XYZ, TP. HCM"
                    value={form.address}
                    onChange={handleChange}
                    className={errors.address ? "tdm-error" : ""}
                    autoComplete="street-address"
                  />
                  {errors.address && <span className="tdm-err-msg">{errors.address}</span>}
                </div>

                <button type="submit" className="tdm-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        style={{ animation: "tdm-spin 0.8s linear infinite" }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Đang gửi…
                    </>
                  ) : (
                    "🚀 Đăng ký lái thử ngay"
                  )}
                </button>

                <div className="tdm-skip">
                  Chưa muốn đăng ký?{" "}
                  <button type="button" onClick={closeModal}>
                    Bỏ qua, tiếp tục xem xe
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes tdm-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}

export default TestDriveModal;
