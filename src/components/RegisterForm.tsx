/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PACKAGES } from '../data';
import { Registration } from '../types';
import { CheckCircle2, ShoppingBag, Sparkles, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface RegisterFormProps {
  selectedPackageName: string;
}

export default function RegisterForm({ selectedPackageName }: RegisterFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pkgName, setPkgName] = useState('D159V');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state if selected package changes from parent components
  useEffect(() => {
    if (selectedPackageName) {
      setPkgName(selectedPackageName);
    }
  }, [selectedPackageName]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick validation
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập Họ và tên.');
      return;
    }
    
    // Simple Vietnamese phone validate
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phoneNumber.trim()) {
      setErrorMsg('Vui lòng nhập Số điện thoại.');
      return;
    }
    if (!phoneRegex.test(phoneNumber.trim().replace(/\s/g, ''))) {
      setErrorMsg('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại (VD: 0912xxxxxx).');
      return;
    }

    const selectedPkgObj = PACKAGES.find(p => p.name === pkgName) || PACKAGES[3];

    // Create a new registration record
    const newReg: Registration = {
      id: 'REG-' + Date.now().toString().slice(-6),
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim() || 'Nhận trực tuyến / eSIM',
      packageId: selectedPkgObj.id,
      packageName: selectedPkgObj.name,
      notes: notes.trim(),
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'pending'
    };

    try {
      // Save to localStorage
      const existingStr = localStorage.getItem('vinaphone_registrations');
      const existing: Registration[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newReg);
      localStorage.setItem('vinaphone_registrations', JSON.stringify(existing));

      // Trigger success state
      setIsSuccess(true);
      
      // Clear Form fields
      setFullName('');
      setPhoneNumber('');
      setAddress('');
      setNotes('');
      
      // Dispatch a storage event so Admin panel updates instantly if active
      window.dispatchEvent(new Event('storage_update'));

    } catch (e) {
      setErrorMsg('Đã có lỗi xảy ra khi lưu đăng ký. Vui lòng liên hệ Hotline.');
    }
  };

  return (
    <section id="register" className="py-20 md:py-28 bg-gradient-to-b from-blue-50/10 via-blue-50 to-white relative overflow-hidden">
      {/* Decorative backdrop canvas shader animation or gradient */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none bg-gradient-to-tr from-accent/20 to-primary/20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="glass-card p-8 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-2xl relative bg-white/90"
        >
          {/* Form Header */}
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">
              Đăng Ký Nhận Ưu Đãi
            </h2>
            <p className="text-slate-500 font-medium">
              Để lại thông tin, nhân viên VinaPhone Bình Mỹ sẽ liên hệ kích hoạt ngay lập tức
            </p>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-3" />
          </div>

          {/* Form alert */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 text-sm font-semibold animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-medium text-slate-800"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">
                Số điện thoại liên hệ <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ví dụ: 0912xxxxxx"
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-medium text-slate-800"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">
                Địa chỉ nhận SIM vật lý <span className="text-xs font-normal text-slate-400">(Để trống nếu muốn đăng ký eSIM online)</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, ngõ ngách, tên đường, thôn/xóm..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-medium text-slate-800"
              />
            </div>

            {/* Select Package */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">
                Gói cước đăng ký <span className="text-rose-500">*</span>
              </label>
              <select
                value={pkgName}
                onChange={(e) => setPkgName(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-bold text-slate-800 cursor-pointer"
              >
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.priceValue >= 1000000 ? `${p.priceValue / 1000000}M` : `${p.priceValue / 1000}k`}{p.id === 'U1500' ? '/năm' : '/tháng'})
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Note */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">
                Ghi chú thêm
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Yêu cầu đặc biệt, chọn số, chuyển mạng giữ số..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-medium text-slate-800"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                className="w-full py-5 bg-accent text-white rounded-2xl font-bold text-base sm:text-lg uppercase tracking-wide shadow-md orange-glow hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Gửi yêu cầu đăng ký
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 font-semibold italic flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                Thông tin của bạn được bảo mật tuyệt đối theo chuẩn bảo mật an toàn VNPT
              </p>
            </div>

          </form>
        </motion.div>
      </div>

      {/* Success Dialog Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccess(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 text-center shadow-2xl z-10 border border-slate-100 overflow-hidden"
            >
              {/* Confetti element decoration */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-100 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-amber-100 rounded-full blur-3xl" />

              <button
                onClick={() => setIsSuccess(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-md shadow-emerald-100/50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Đăng ký thành công!
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Cảm Ơn Quý Khách!
                </h3>
                
                <p className="text-slate-500 font-medium text-sm mt-3.5 px-2">
                  Yêu cầu kích hoạt gói cước di động đã được gửi thành công đến VNPT Bình Mỹ. Nhân viên tư vấn sẽ liên lạc ngay với quý khách sau ít phút để hoàn tất thủ tục.
                </p>

                {/* Next Steps box */}
                <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left space-y-3 mt-6">
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Quy trình xử lý tiếp theo</p>
                  
                  <div className="flex gap-3 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <p className="text-slate-700 font-semibold">Tư vấn viên VNPT Bình Mỹ liên hệ điện thoại trong 5-10 phút.</p>
                  </div>
                  
                  <div className="flex gap-3 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <p className="text-slate-700 font-semibold">Cấp thông tin xác thực đấu nối SIM/eSIM chính chủ miễn phí.</p>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/95 transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  Đóng & quay lại
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
