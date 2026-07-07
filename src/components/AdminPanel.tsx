/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Registration } from '../types';
import { Trash2, CheckCircle, Clock, PhoneCall, XCircle, Search, Filter, ShieldAlert, KeyRound, Download, RefreshCw } from 'lucide-react';

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pkgFilter, setPkgFilter] = useState<string>('all');
  const [errorMsg, setErrorMsg] = useState('');

  // Load from localStorage
  const loadRegistrations = () => {
    const dataStr = localStorage.getItem('vinaphone_registrations');
    if (dataStr) {
      try {
        setRegistrations(JSON.parse(dataStr));
      } catch (e) {
        console.error('Lỗi khi đọc dữ liệu đăng ký');
      }
    } else {
      // Mock seed data if completely empty so admin has something to see
      const seed: Registration[] = [
        {
          id: 'REG-104921',
          fullName: 'Nguyễn Văn Nam',
          phoneNumber: '0912456789',
          address: 'Thôn Đông, xã Bình Mỹ, huyện Bình Mỹ, Ninh Bình',
          packageId: 'D159V',
          packageName: 'D159V',
          notes: 'Muốn chuyển đổi sang eSIM di động luôn',
          createdAt: '07/07/2026, 08:30:15',
          status: 'pending'
        },
        {
          id: 'REG-094821',
          fullName: 'Trần Thị Thuỷ',
          phoneNumber: '0915334455',
          address: 'Nhận trực tuyến / eSIM',
          packageId: 'YOLO100M',
          packageName: 'YOLO100M',
          notes: 'Đăng ký cho con trai đi học',
          createdAt: '06/07/2026, 15:45:00',
          status: 'contacted'
        },
        {
          id: 'REG-081293',
          fullName: 'Lê Hoàng Hải',
          phoneNumber: '0812778899',
          address: 'Phố mới Bình Mỹ, Ninh Bình',
          packageId: 'U1500',
          packageName: 'U1500',
          notes: 'Giao sim tận nhà buổi chiều',
          createdAt: '05/07/2026, 10:12:30',
          status: 'activated'
        }
      ];
      localStorage.setItem('vinaphone_registrations', JSON.stringify(seed));
      setRegistrations(seed);
    }
  };

  useEffect(() => {
    loadRegistrations();

    // Listen to storage update events
    const handleStorageUpdate = () => {
      loadRegistrations();
    };
    window.addEventListener('storage_update', handleStorageUpdate);
    return () => window.removeEventListener('storage_update', handleStorageUpdate);
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === '1234' || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Mật khẩu sai. Gợi ý: mật khẩu mặc định là "1234"');
    }
  };

  const updateStatus = (id: string, newStatus: Registration['status']) => {
    const updated = registrations.map((reg) => {
      if (reg.id === id) {
        return { ...reg, status: newStatus };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('vinaphone_registrations', JSON.stringify(updated));
  };

  const deleteRegistration = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá yêu cầu đăng ký này?')) {
      const filtered = registrations.filter((reg) => reg.id !== id);
      setRegistrations(filtered);
      localStorage.setItem('vinaphone_registrations', JSON.stringify(filtered));
    }
  };

  const handleExportCSV = () => {
    // Basic CSV exporter
    const headers = 'Mã ĐK,Họ tên,Số điện thoại,Địa chỉ,Gói cước,Ghi chú,Ngày tạo,Trạng thái\n';
    const rows = registrations.map(reg => 
      `"${reg.id}","${reg.fullName}","${reg.phoneNumber}","${reg.address}","${reg.packageName}","${reg.notes}","${reg.createdAt}","${reg.status}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `DS_DangKy_VinaPhone_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search logic
  const filteredRegs = registrations.filter((reg) => {
    const matchesSearch =
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phoneNumber.includes(searchTerm) ||
      reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const matchesPkg = pkgFilter === 'all' || reg.packageName === pkgFilter;

    return matchesSearch && matchesStatus && matchesPkg;
  });

  return (
    <section id="admin" className="py-16 md:py-24 bg-slate-100/60 border-t border-b border-slate-200/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-primary" />
              Bảng Quản Trị Đăng Ký
            </h2>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Đại lý VinaPhone VNPT Bình Mỹ
            </p>
          </div>

          {isAuthenticated && (
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Xuất danh sách
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-all cursor-pointer"
              >
                Khóa trang
              </button>
            </div>
          )}
        </div>

        {/* Password Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-xl text-center">
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <KeyRound className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Đăng nhập tài khoản đại lý</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Vui lòng nhập mật khẩu để quản lý thông tin khách hàng đăng ký di động.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-bold leading-relaxed">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Nhập mật khẩu (Gợi ý: 1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4.5 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-center font-bold tracking-widest focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white font-extrabold rounded-xl text-sm uppercase tracking-wider hover:bg-primary/95 transition-all cursor-pointer"
              >
                Mở khóa tài khoản
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Interface */
          <div className="space-y-6">
            
            {/* Filters panel */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center gap-4">
              
              {/* Search bar */}
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm theo Mã ĐK, Họ tên hoặc Số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold focus:outline-none"
                />
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="contacted">Đang liên hệ</option>
                  <option value="activated">Đã kích hoạt</option>
                  <option value="cancelled">Đã huỷ</option>
                </select>
              </div>

              {/* Package Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={pkgFilter}
                  onChange={(e) => setPkgFilter(e.target.value)}
                  className="px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white cursor-pointer"
                >
                  <option value="all">Tất cả gói cước</option>
                  <option value="YOLO100M">Gói YOLO100M</option>
                  <option value="VD120M">Gói VD120M</option>
                  <option value="SODA125">Gói SODA125</option>
                  <option value="D159V">Gói D159V</option>
                  <option value="U1500">Gói U1500</option>
                </select>
              </div>

              {/* Reset database mock values */}
              <button
                onClick={() => {
                  if (confirm('Bạn có muốn đặt lại cơ sở dữ liệu mẫu ban đầu?')) {
                    localStorage.removeItem('vinaphone_registrations');
                    loadRegistrations();
                  }
                }}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shrink-0"
                title="Tải lại dữ liệu mẫu"
              >
                <RefreshCw className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* List Table desktop */}
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold text-[11px] uppercase tracking-wider">
                    <th className="py-4.5 px-6">Mã ĐK</th>
                    <th className="py-4.5 px-6">Khách hàng</th>
                    <th className="py-4.5 px-6">Gói cước</th>
                    <th className="py-4.5 px-6">Địa chỉ nhận SIM</th>
                    <th className="py-4.5 px-6">Ghi chú</th>
                    <th className="py-4.5 px-6">Trạng thái</th>
                    <th className="py-4.5 px-6 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredRegs.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/20 font-medium">
                      
                      {/* REG code */}
                      <td className="py-4.5 px-6 font-mono text-xs font-bold text-slate-500">
                        {reg.id}
                      </td>

                      {/* User metadata */}
                      <td className="py-4.5 px-6">
                        <div className="space-y-0.5">
                          <p className="font-extrabold text-slate-800 leading-none">{reg.fullName}</p>
                          <p className="text-slate-500 font-semibold">{reg.phoneNumber}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{reg.createdAt}</p>
                        </div>
                      </td>

                      {/* Package badge */}
                      <td className="py-4.5 px-6 font-extrabold text-primary">
                        {reg.packageName}
                      </td>

                      {/* Address */}
                      <td className="py-4.5 px-6 text-xs text-slate-500 max-w-xs truncate" title={reg.address}>
                        {reg.address}
                      </td>

                      {/* Notes */}
                      <td className="py-4.5 px-6 text-xs text-slate-500 max-w-xs truncate" title={reg.notes}>
                        {reg.notes || <span className="text-slate-300">Không có</span>}
                      </td>

                      {/* Status indicator drop down */}
                      <td className="py-4.5 px-6">
                        <select
                          value={reg.status}
                          onChange={(e) => updateStatus(reg.id, e.target.value as Registration['status'])}
                          className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white border cursor-pointer ${
                            reg.status === 'pending'
                              ? 'text-amber-700 border-amber-200 bg-amber-50'
                              : reg.status === 'contacted'
                              ? 'text-blue-700 border-blue-200 bg-blue-50'
                              : reg.status === 'activated'
                              ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
                              : 'text-rose-700 border-rose-200 bg-rose-50'
                          }`}
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="contacted">Đang liên hệ</option>
                          <option value="activated">Đã kích hoạt</option>
                          <option value="cancelled">Đã huỷ</option>
                        </select>
                      </td>

                      {/* Delete actions */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => deleteRegistration(reg.id)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                            title="Xóa thông tin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRegs.length === 0 && (
                <div className="text-center py-12 text-slate-400 font-bold">
                  Không tìm thấy đăng ký nào phù hợp.
                </div>
              )}
            </div>

            {/* Mobile Cards view */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredRegs.map((reg) => (
                <div key={reg.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-black text-slate-400">{reg.id}</span>
                    <select
                      value={reg.status}
                      onChange={(e) => updateStatus(reg.id, e.target.value as Registration['status'])}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border bg-white ${
                        reg.status === 'pending'
                          ? 'text-amber-700 border-amber-200 bg-amber-50'
                          : reg.status === 'contacted'
                          ? 'text-blue-700 border-blue-200 bg-blue-50'
                          : reg.status === 'activated'
                          ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
                          : 'text-rose-700 border-rose-200 bg-rose-50'
                      }`}
                    >
                      <option value="pending">Chờ ĐK</option>
                      <option value="contacted">Đã Alo</option>
                      <option value="activated">Kích hoạt</option>
                      <option value="cancelled">Đã Hủy</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-extrabold text-slate-900">{reg.fullName}</p>
                    <p className="text-sm font-bold text-slate-700">{reg.phoneNumber}</p>
                    <p className="text-xs text-slate-500"><span className="font-bold">Gói cước:</span> <span className="text-primary font-black">{reg.packageName}</span></p>
                    <p className="text-xs text-slate-500 leading-relaxed"><span className="font-bold">Địa chỉ:</span> {reg.address}</p>
                    <p className="text-xs text-slate-500 leading-relaxed"><span className="font-bold">Ghi chú:</span> {reg.notes || 'Không'}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>{reg.createdAt}</span>
                    <button
                      onClick={() => deleteRegistration(reg.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredRegs.length === 0 && (
                <div className="text-center py-8 text-slate-400 font-bold">
                  Không tìm thấy đăng ký nào.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
