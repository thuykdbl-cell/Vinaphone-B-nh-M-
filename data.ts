/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Package, Persona, Benefit, FAQItem } from './types';

export const BENEFITS: Benefit[] = [
  {
    id: 'speed',
    icon: 'wifi',
    title: 'Mạng 4G/5G tốc độ cao'
  },
  {
    id: 'coverage',
    icon: 'public',
    title: 'Phủ sóng toàn quốc'
  },
  {
    id: 'price',
    icon: 'payments',
    title: 'Giá chỉ từ 3.300đ/ngày'
  },
  {
    id: 'free_apps',
    icon: 'play_circle',
    title: 'Miễn phí TikTok, FB, YT'
  },
  {
    id: 'huge_data',
    icon: 'database',
    title: 'Data lên tới 8GB/ngày'
  },
  {
    id: 'free_calls',
    icon: 'call',
    title: 'Gọi nội mạng tới 1.500 phút'
  },
  {
    id: 'quick_reg',
    icon: 'speed',
    title: 'Đăng ký nhanh'
  },
  {
    id: 'support',
    icon: 'support_agent',
    title: 'Hỗ trợ kỹ thuật 24/7'
  },
  {
    id: 'prestige',
    icon: 'verified',
    title: 'Uy tín từ VNPT'
  },
  {
    id: 'esim',
    icon: 'qr_code_2',
    title: 'Kích hoạt eSIM dễ dàng'
  }
];

export const PACKAGES: Package[] = [
  {
    id: 'YOLO100M',
    name: 'YOLO100M',
    price: '100k',
    priceValue: 100000,
    targetGroup: 'Dành cho giới trẻ',
    dataPerDay: '1GB/ngày',
    extraBenefits: ['1GB/ngày tốc độ cao', 'Miễn phí Data truy cập TikTok, YouTube, Facebook'],
    notIncluded: ['Không hỗ trợ gọi thoại miễn phí'],
    isHot: false
  },
  {
    id: 'VD120M',
    name: 'VD120M',
    price: '120k',
    priceValue: 120000,
    targetGroup: 'Liên lạc thả ga',
    dataPerDay: '1GB/ngày',
    voiceInternal: '1.500 phút gọi nội mạng (cuộc gọi < 10 phút)',
    extraBenefits: ['1GB/ngày tốc độ cao', 'Miễn phí gọi nội mạng VNPT', 'Miễn phí data FB, YT, TikTok'],
    isHot: false
  },
  {
    id: 'SODA125',
    name: 'SODA125',
    price: '125k',
    priceValue: 125000,
    targetGroup: 'Siêu data 5G',
    dataPerDay: '8GB/ngày',
    extraBenefits: ['8GB/ngày tốc độ cao (240GB/tháng)', 'Tặng tài khoản học tiếng Anh Cambridge', 'Miễn phí hoàn toàn Data xem TikTok'],
    isHot: false
  },
  {
    id: 'D159V',
    name: 'D159V',
    price: '159k',
    priceValue: 159000,
    targetGroup: 'Bán Chạy Nhất',
    dataPerDay: '6GB/ngày',
    voiceInternal: '1500 phút gọi nội mạng',
    voiceExternal: '200 phút gọi ngoại mạng',
    extraBenefits: ['6GB/ngày tốc độ cao (180GB/tháng)', '1500 phút gọi nội mạng di động VinaPhone', '200 phút gọi ngoại mạng miễn phí', 'Miễn phí xem phim trên MyTV (gói Chuẩn)'],
    isHot: true
  },
  {
    id: 'U1500',
    name: 'U1500',
    price: '1.5M',
    priceValue: 1500000,
    targetGroup: 'Gói năm tiết kiệm',
    dataPerDay: '500GB/tháng',
    extraBenefits: ['500GB/tháng tốc độ cao (không giới hạn ngày sử dụng)', 'Tương đương chỉ 125k/tháng', 'Dùng trọn gói 1 năm (12 tháng) không lo nạp tiền', 'Giao sim và kích hoạt tại nhà miễn phí'],
    isHot: false
  }
];

export const PERSONAS: Persona[] = [
  {
    id: 'hoc-sinh',
    name: 'Học sinh',
    description: 'Thích lướt mạng xã hội, xem video ngắn, livestream giải trí thường ngày.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpclxCjf4RyF8-dc87lOyc_vRJVxAqeqM6-6gJXYF0pw96VCqI22QdHyeIg2lEjqR6-ZjB0snqjJ48siPBcjM0P-EI4sWq5oi9Pu3psr2m8NI8oJOAHRiwH2f9oohYGjkMNbOPqntS6VR2b7H7losG7nB0QwsWDOjUC3qBFe8rvne1OLsBE1Ll92G5UTNJ5tufEwO056AOSn-tu4c4sEbeDDGmTJPyFQWljEYsutE27nn6vYEMD17m',
    recommendedPackageId: 'YOLO100M',
    recommendedPackageName: 'YOLO100M'
  },
  {
    id: 'cong-nhan',
    name: 'Công nhân',
    description: 'Cần liên lạc thoại nhiều với gia đình, bạn bè đồng hương và kết nối internet ổn định.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd2BpoHxtU4dUzOuffKiaVbbO2PylImBAEbXIs0PMh-OR3P1tqCYN6lH76qqnoytStDNJQaR8hyZbRoPerhhL8yfe9yeU4FmrZVWL3S0-X1NGKXly7eodCmZcy_FkXy5LH0_KJ05owdJO1HPKNMIKgfFkueL6D250hnd80KeXd4La_lAwPTV8Kpiu63E4ZU4Av_Ub0pnUX1jEhci4LNRSZs6LkSY3bp8E4CqO_WEAF2wnoTzoHxVsp',
    recommendedPackageId: 'VD120M',
    recommendedPackageName: 'VD120M'
  },
  {
    id: 'livestream',
    name: 'Livestream',
    description: 'Cần dung lượng data cực kỳ khủng và độ trễ thấp tối đa để bán hàng, sáng tạo nội dung không giật lag.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ht2MiA8pldC_36Pnl2QMwlwHDFOPwFPRm1YPub3Kluu0tAkYIUe01bGPEgBboaCaHpmHBhw-nmmDUqx_fB1fr8rNTQdE-bOExJhBw_EDEquTlsgOsRcEQy_Pnky3D-ASOqocDp8tDwm56Z6ndrXg98wOJ5MfpxibDFUJJpyt5eJk4ZPkzBBQdJTI4bJ0RHzjYftTwFvbp04eayC_wYQqCrAP3lp4IiVT_E_3PJnLF77zOux5-k7f',
    recommendedPackageId: 'SODA125',
    recommendedPackageName: 'SODA125'
  },
  {
    id: 'van-phong',
    name: 'Văn phòng',
    description: 'Nhu cầu liên lạc toàn diện cả ngày: data tốc độ cao, gọi nội & ngoại mạng thả ga cùng dịch vụ giải trí.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYtMI_VnI_7xGTagwlIt_LyLGwtF6pa4FqVTE6uxT1nrYqpq_ksHcRw_JVpg5GRb5-IZTXbP5zkglhacRtFn4_A0fq--hai90japKr_FF8PaTDPGBByuYNU0nuSRKWQH99pA0qBMbDmUWMcMh-4OMXClSgkF56IKWHTwtdYpV51-9kueHY0QuiSGLByX1RfEze1xQo_epV7EwPbVWl6l4YjFm4YFqdCaSxZp8NL5XY4qk7Y9RM8IAW',
    recommendedPackageId: 'D159V',
    recommendedPackageName: 'D159V'
  },
  {
    id: 'tai-xe',
    name: 'Tài xế',
    description: 'Cần duy trì kết nối mạng liên tục 24/7 cho các app bản đồ, đón khách với chi phí rẻ nhất.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtHW9f_0GI3T7VnOfpFXGg7RXLoLsPvGLIhN61C86WMl-tdiHZCC1pusAJlg-skVZsLjNToolImTBGvJecKmawvCAsRMpWqHGCZUW3Z7JIbgLBF9aRxP23o8jXJfaHz7e_qFon9rlB229lVV98O9erlhBjMocUwb44BPOk8twqtYCtuwhm8uZqv4NJT1GFYeHdFMUUy7S_J885QmXBPEJApH0ulz4-CLlKIj9eKBGpDVlhGue51jov',
    recommendedPackageId: 'U1500',
    recommendedPackageName: 'U1500'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'fee',
    question: 'Lệ phí đăng ký gói cước là bao nhiêu?',
    answer: 'Lệ phí đăng ký hoàn toàn MIỄN PHÍ. Quý khách chỉ cần thanh toán đúng giá tiền thực tế của gói cước đã chọn (ví dụ 100.000đ cho gói YOLO100M). Tuyệt đối không phát sinh phụ phí.'
  },
  {
    id: 'time',
    question: 'Mất bao lâu để kích hoạt gói cước?',
    answer: 'Ngay sau khi quý khách xác nhận thông tin và được nhân viên hỗ trợ đấu nối, gói cước sẽ được kích hoạt sử dụng ngay lập tức trong vòng từ 5 - 15 phút.'
  },
  {
    id: 'home_support',
    question: 'VinaPhone VNPT Bình Mỹ có hỗ trợ tại nhà không?',
    answer: 'Có! Đối với tất cả khách hàng tại khu vực Bình Mỹ và vùng lân cận, chúng tôi hỗ trợ giao SIM vật lý, chuyển đổi eSIM và đăng ký thông tin chính chủ tận nhà hoàn toàn MIỄN PHÍ.'
  },
  {
    id: 'auto_renew',
    question: 'Gói cước có tự động gia hạn hay không?',
    answer: 'Hầu hết các gói cước của VinaPhone sẽ tự động gia hạn sau mỗi chu kỳ (30 ngày hoặc 1 năm) nếu tài khoản chính của quý khách đủ số dư tối thiểu. Hệ thống luôn gửi SMS thông báo nhắc lịch 1-2 ngày trước khi gia hạn để quý khách chủ động nắm thông tin.'
  },
  {
    id: 'esim_convert',
    question: 'Tôi có thể chuyển đổi sim thường sang eSIM trực tuyến không?',
    answer: 'Hoàn toàn được! Quý khách chỉ cần điền thông tin vào form đăng ký, chọn gói cước và ghi rõ nhu cầu "Muốn đăng ký eSIM". Nhân viên của chúng tôi sẽ hướng dẫn quý khách quét mã QR để kích hoạt eSIM trực tuyến nhanh chóng trong 10 phút.'
  }
];
