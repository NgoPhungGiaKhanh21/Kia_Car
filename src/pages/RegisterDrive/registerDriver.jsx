import { useState, useEffect } from "react";
import { getAllCarApi, createAppointmentApi } from "../../services/getAllCarApi";
import { toast } from "react-toastify";
import "./registerDriver.css";
import Header from "../Home/Header";

// Format giá VND
const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const INITIAL_FORM = {
    firstName: "",
    lastName: "",
    phone: "",
    CarID: "",
    address: "",
};

export default function RegisterDriver() {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [form, setForm] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Load danh sách xe
    useEffect(() => {
        setLoading(true);
        getAllCarApi()
            .then((res) => {
                const data = res?.data?.data?.data || [];
                setCars(data);
            })
            .catch(() => toast.error("Không thể tải danh sách xe!"))
            .finally(() => setLoading(false));
    }, []);

    // Khi chọn xe → tìm ảnh tương ứng (chỉ hiển thị, không gửi API)
    const handleCarChange = (e) => {
        const carId = e.target.value;
        setForm((prev) => ({ ...prev, CarID: carId }));
        const found = cars.find((c) => String(c.id) === String(carId));
        setSelectedCar(found || null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.CarID) { toast.warn("Vui lòng chọn xe muốn lái thử!"); return; }
        if (!form.phone.match(/^0\d{9}$/)) { toast.warn("Số điện thoại không hợp lệ (VD: 0901234567)"); return; }

        // Chỉ gửi các field API yêu cầu, KHÔNG gửi ảnh
        const payload = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            phone: form.phone.trim(),
            carID: Number(form.CarID),
            address: form.address.trim(),
        };

        setSubmitting(true);
        try {
            await createAppointmentApi(payload);
            setSuccess(true);
            setForm(INITIAL_FORM);
            setSelectedCar(null);
            toast.success("Đăng ký lái thử thành công! Chúng tôi sẽ liên hệ sớm.");
        } catch (err) {
            const msg = err?.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setForm(INITIAL_FORM);
        setSelectedCar(null);
        setSuccess(false);
    };

    return (
        <div className="rd-wrapper">
            <Header />
            {/* ─── HERO ─── */}
            <div className="rd-hero">
                <div className="rd-hero__overlay" />
                <div className="rd-hero__content">
                    <p className="rd-hero__sub">Trải nghiệm thực tế</p>
                    <h1 className="rd-hero__title">Đăng Ký Lái Thử</h1>
                    <p className="rd-hero__desc">
                        Chọn mẫu xe yêu thích — đội ngũ KIA Biên Hòa sẽ liên hệ sắp xếp lịch hẹn cho bạn.
                    </p>
                </div>
            </div>

            {/* ─── MAIN ─── */}
            <div className="rd-main">
                {/* LEFT – Ảnh xe đã chọn */}
                <div className="rd-preview">
                    {loading ? (
                        <div className="rd-preview__skeleton">
                            <div className="rd-skeleton-pulse" />
                        </div>
                    ) : selectedCar ? (
                        <div className="rd-preview__card">
                            <img
                                src={selectedCar.img}
                                alt={selectedCar.name}
                                className="rd-preview__img"
                            />
                            <div className="rd-preview__info">
                                <span className={`rd-badge rd-badge--${selectedCar.type?.toLowerCase()}`}>
                                    {selectedCar.type}
                                </span>
                                <h2 className="rd-preview__name">{selectedCar.name}</h2>
                                <p className="rd-preview__color">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                                    Màu: <strong>{selectedCar.color}</strong>
                                </p>
                                <p className="rd-preview__price">{formatPrice(selectedCar.price)}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="rd-preview__empty">
                            <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="20" width="56" height="28" rx="6" fill="#e8e8e8" />
                                <rect x="12" y="12" width="40" height="18" rx="4" fill="#d0d0d0" />
                                <circle cx="16" cy="50" r="6" fill="#b0b0b0" />
                                <circle cx="48" cy="50" r="6" fill="#b0b0b0" />
                                <rect x="28" y="24" width="8" height="6" rx="2" fill="#f5f5f5" />
                            </svg>
                            <p>Chọn xe để xem hình ảnh</p>
                        </div>
                    )}

                    {/* Thông tin dealership */}
                    <div className="rd-info-box">
                        <h3>KIA Biên Hòa</h3>
                        <ul>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                                Số 19 Đường 2A, P. An Bình, Tp. Biên Hòa, Đồng Nai
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
                                0346270010
                            </li>

                        </ul>
                    </div>
                </div>

                {/* RIGHT – Form */}
                <div className="rd-form-wrap">
                    {success ? (
                        <div className="rd-success">
                            <div className="rd-success__icon">
                                <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="26" cy="26" r="25" stroke="#1de65a" strokeWidth="2" />
                                    <path d="M14 26l8 8 16-16" stroke="#1de65a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2>Đăng ký thành công!</h2>
                            <p>Cảm ơn bạn. Nhân viên KIA Biên Hòa sẽ liên hệ trong vòng <strong>24 giờ</strong> để xác nhận lịch lái thử.</p>
                            <button className="rd-btn rd-btn--outline" onClick={handleReset}>
                                Đăng ký thêm
                            </button>
                        </div>
                    ) : (
                        <form className="rd-form" onSubmit={handleSubmit} noValidate>
                            <div className="rd-form__header">
                                <h2>Thông tin đăng ký</h2>
                                <p>Điền đầy đủ thông tin để được phục vụ tốt nhất</p>
                            </div>

                            {/* Họ & Tên */}
                            <div className="rd-row">
                                <div className="rd-field">
                                    <label htmlFor="lastName">Họ <span>*</span></label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Nguyễn"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="rd-field">
                                    <label htmlFor="firstName">Tên <span>*</span></label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Văn An"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* SĐT */}
                            <div className="rd-field">
                                <label htmlFor="phone">Số điện thoại <span>*</span></label>
                                <div className="rd-input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="0901 234 567"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                        maxLength={11}
                                    />
                                </div>
                            </div>

                            {/* Chọn xe */}
                            <div className="rd-field">
                                <label htmlFor="CarID">Xe muốn lái thử <span>*</span></label>
                                <div className="rd-select-wrap">
                                    <svg className="rd-select-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                    </svg>
                                    <select
                                        id="CarID"
                                        name="carID"
                                        value={form.CarID}
                                        onChange={handleCarChange}
                                        required
                                    >
                                        <option value="">-- Chọn mẫu xe --</option>
                                        {cars.map((car) => (
                                            <option key={car.id} value={car.id}>
                                                {car.name}
                                            </option>
                                        ))}
                                    </select>
                                    <svg className="rd-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 10l5 5 5-5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Địa chỉ */}
                            <div className="rd-field">
                                <label htmlFor="address">Địa chỉ <span>*</span></label>
                                <div className="rd-input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="123 Đường ABC, Quận XYZ, TP. HCM"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Ghi chú */}
                            <p className="rd-note">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                                Chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc để xác nhận lịch hẹn.
                            </p>

                            <button
                                type="submit"
                                className="rd-btn rd-btn--primary"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <span className="rd-spinner" />
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                                        Gửi Đăng Ký
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
