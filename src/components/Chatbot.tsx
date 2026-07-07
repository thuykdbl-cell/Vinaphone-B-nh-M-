/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles, PhoneCall } from 'lucide-react';
import { PACKAGES } from '../data';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ Lý Ảo VinaPhone Bình Mỹ. Tôi có thể giúp gì cho bạn hôm nay? (Bạn có thể nhấn các câu hỏi nhanh bên dưới để bắt đầu)',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickReplies = [
    'Gói cước nào hot nhất?',
    'Tôi muốn đăng ký eSIM',
    'Gói cước nhiều Data nhất?',
    'Có giao SIM tận nơi không?'
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with a small delay
    setTimeout(() => {
      let botResponse = '';
      const inputLower = text.toLowerCase();

      if (inputLower.includes('gói') && (inputLower.includes('hot') || inputLower.includes('bán chạy') || inputLower.includes('d159v'))) {
        botResponse = '🔥 Gói cước **D159V** (159k/tháng) hiện là gói cước bán chạy nhất! Ưu đãi gồm: **6GB/ngày** (180GB/tháng), miễn phí **1500 phút** gọi nội mạng di động VinaPhone, **200 phút** gọi ngoại mạng và miễn phí xem phim MyTV. Bạn có muốn tôi điền gói này vào form đăng ký giúp bạn không?';
      } else if (inputLower.includes('esim') || inputLower.includes('sim điện tử')) {
        botResponse = '📱 VinaPhone VNPT Bình Mỹ hỗ trợ kích hoạt **eSIM trực tuyến miễn phí** cực kỳ nhanh chóng! Bạn chỉ cần điền thông tin đăng ký ở form dưới cùng, chúng tôi sẽ liên hệ hướng dẫn quét mã QR kích hoạt trong 10 phút. Không cần đổi sim vật lý!';
      } else if (inputLower.includes('data') || inputLower.includes('mạng') || inputLower.includes('dung lượng')) {
        botResponse = '⚡ Nếu cần cực nhiều Data tốc độ cao, bạn hãy chọn gói **SODA125** (125k/tháng) có đến **8GB/ngày** (240GB/tháng) hoặc gói năm **U1500** có **500GB/tháng** dùng thả ga cả năm không lo nạp tiền!';
      } else if (inputLower.includes('giao sim') || inputLower.includes('tại nhà') || inputLower.includes('nhà')) {
        botResponse = '🚚 Có chứ! VNPT Bình Mỹ hỗ trợ **giao SIM tận nhà và kích hoạt thông tin chính chủ hoàn toàn miễn phí** cho khách hàng tại địa bàn Bình Mỹ. Quý khách chỉ cần điền địa chỉ vào form đăng ký bên dưới nhé.';
      } else if (inputLower.includes('rẻ') || inputLower.includes('sinh viên') || inputLower.includes('học sinh') || inputLower.includes('yolo')) {
        botResponse = '🎓 Gói cước tiết kiệm nhất là **YOLO100M** (chỉ 100k/tháng) có ngay **1GB/ngày** và **miễn phí hoàn toàn** data truy cập các ứng dụng Facebook, YouTube, TikTok. Cực kỳ thích hợp cho học sinh, sinh viên lướt mạng xã hội thoải mái!';
      } else if (inputLower.includes('gọi') || inputLower.includes('thoại') || inputLower.includes('alo') || inputLower.includes('vd120m')) {
        botResponse = '📞 Để gọi thoại thoải mái, bạn nên chọn gói **VD120M** (120k/tháng) miễn phí **1.500 phút gọi nội mạng** (mỗi cuộc dưới 10 phút), 1GB/ngày tốc độ cao và miễn phí truy cập Facebook, YouTube, TikTok.';
      } else if (inputLower.includes('đăng ký') || inputLower.includes('mua') || inputLower.includes('đăng kí')) {
        botResponse = '✍️ Để đăng ký gói cước nhanh nhất, bạn vui lòng kéo xuống phần **"Đăng ký nhận ưu đãi"** ở gần cuối trang, điền Họ tên và Số điện thoại là nhân viên VNPT sẽ hỗ trợ gọi lại kích hoạt ngay nhé!';
      } else {
        botResponse = 'Cảm ơn câu hỏi của bạn! VNPT Bình Mỹ cung cấp nhiều gói cước 4G/5G chất lượng cao từ 100k - 159k/tháng với các ưu đãi Data khủng, gọi nội mạng miễn phí và giao sim tận nhà. Bạn muốn tìm hiểu gói cước ưu đãi hay chuyển đổi eSIM online ạ?';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (replyText: string) => {
    handleSendMessage(replyText);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
      
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white shadow-xl flex items-center justify-center cursor-pointer relative group border-2 border-white"
        title="Trợ lý ảo VinaPhone"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white" />
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-primary text-white px-5 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white relative">
                  <Bot className="w-5.5 h-5.5" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                    Trợ Lý VinaPhone AI
                    <Sparkles className="w-3.5 h-3.5 text-accent fill-accent animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-blue-100 font-semibold tracking-wide">VNPT Bình Mỹ • Trực tuyến</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message History area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/50'
                    }`}
                  >
                    {msg.text.split('**').map((part, idx) => 
                      idx % 2 === 1 ? <strong key={idx} className="text-primary font-black">{part}</strong> : part
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200/40 px-4.5 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="p-3 border-t border-slate-100 bg-white space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Gợi ý câu hỏi nhanh:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-primary/5 hover:text-primary text-[11px] font-bold text-slate-600 border border-slate-200/30 cursor-pointer transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-200/60 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn tại đây..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs sm:text-sm font-semibold focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
