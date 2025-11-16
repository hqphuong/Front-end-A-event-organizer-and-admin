import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import { EventContext } from '../../context/EventContext';
import { QlementineIconsMoney16 } from "../../Elements/QlementineIconsMoney16";
import { StashUserAvatar } from "../../Elements/StashUserAvatar";
import { Calendar } from "../../Elements/Calendar";
import rectangle7 from "../../Elements/rectangle-7.png";
import rectangle212 from "../../Elements/rectangle-21-2.png";
import TicketCreator from "./TicketCreator";
import rectangle622 from "../../Elements/rectangle-62.png";
import rectangle62 from "../../Elements/rectangle-62.png";
import rectangle53 from "../../Elements/rectangle-53.svg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import rectangle56 from "../../Elements/rectangle-56.svg";
import rectangle57 from "../../Elements/rectangle-57.svg";
import rectangle58 from "../../Elements/rectangle-58.svg";
import ticke12 from "../../Elements/ticke-1-2.png";
import TICKETZ_LOGO from '../../Elements/ticketZ.png';

const formatToDateTimePicker = (dateTimeString) => {
  if (!dateTimeString || !dateTimeString.includes(' ')) return '';
  
  const parts = dateTimeString.split(' '); // ["HH:mm", "DD/MM/YYYY"]
  if (parts.length !== 2) return '';

  const time = parts[0];
  const dateParts = parts[1].split('/'); // ["DD", "MM", "YYYY"]
  
  if (dateParts.length !== 3) return '';
  
  const [day, month, year] = dateParts;
  // Trả về định dạng "YYYY-MM-DDTHH:mm"
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
};

/**
 * Chuyển "YYYY-MM-DDTHH:mm" (từ input) sang "HH:mm DD/MM/YYYY" (lưu vào Context)
 */
const formatFromDateTimePicker = (pickerString) => {
  if (!pickerString || !pickerString.includes('T')) return '';
  
  const parts = pickerString.split('T'); // ["YYYY-MM-DD", "HH:mm"]
  if (parts.length !== 2) return '';

  const time = parts[1];
  const dateParts = parts[0].split('-'); // ["YYYY", "MM", "DD"]
  
  if (dateParts.length !== 3) return '';
  
  const [year, month, day] = dateParts;
  // Trả về định dạng "HH:mm DD/MM/YYYY"
  return `${time} ${day}/${month}/${year}`;
};

export const EventPage2 = () => {
  const navigate = useNavigate();
  const { eventData, setEventData } = useContext(EventContext);
  const { eventId } = useParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContinueClick = () => {
    if (eventId) {
      navigate(`/event-edit/${eventId}/buoc-3`);
    } else {
      navigate('/tao-su-kien/buoc-3');
    }
  };
  const [editingTicket, setEditingTicket] = useState(null);
  const handleDeleteTicket = (ticketId) => {
    const updatedTickets = eventData.tickets.filter(t => t.id !== ticketId);
    setEventData(prev => ({
      ...prev,
      tickets: updatedTickets
    }));
  };
  const handleEditClick = (ticketToEdit) => {
    setEditingTicket(ticketToEdit); 
    // Khi set state này, TicketCreator (con) sẽ nhận được và tự động mở modal
  };
  return (
    <div className="bg-[#d9d9d9] overflow-hidden border border-solid border-[#d9d9d9] w-full min-w-[1440px] min-h-[1905px] relative">

      {/* Sidebar và Header */}
      <div className="absolute top-[72px] left-[267px] w-[1500px] h-[1439px] bg-[#fff8f7]" />
      <div className="absolute top-0 left-0 w-[272px] h-[1511px] bg-[#f94f2f]" />
      <img className="absolute top-[-841px] left-[1484px] w-[203px] h-[45px]" alt="Rectangle" src={rectangle7} />
      
      {/* Nút Lưu */}
      {/* <div className="absolute top-[85px] left-[1206px] w-[102px] h-[45px]">
        <img className="absolute top-0 -left-1 w-[108px] h-[53px]" alt="Rectangle" src={rectangle202} />
        <img className="absolute top-0 -left-1 w-[108px] h-[53px]" alt="Rectangle" src={rectangle21} />
        <div className="absolute top-[15px] left-[38px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#f94f2f] text-xs text-center tracking-[0] leading-[normal]">
          Lưu
        </div>
      </div> */}

      {/* Nút Tiếp tục */}
      <div 
            className="absolute top-[85px] left-[1320px] w-[102px] h-[45px] cursor-pointer" // Thêm cursor-pointer
            onClick={handleContinueClick} // Gán sự kiện onClick vào đây
          >
            <img
              className="absolute top-0 -left-1 w-[108px] h-[53px]"
              alt="Rectangle"
              src={rectangle212} // Đảm bảo rectangle212 đã được import đúng
            />
            <div className="absolute top-[15px] left-[25px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
              Tiếp tục
            </div>
      </div>

      {/* Logo và Sidebar */}
      <div className="absolute top-2 left-[5px] w-[63px] h-[63px]">
              <img
                className="absolute top-0 left-0 w-[63px] h-[63px] object-contain" // <-- Điều chỉnh lại class
                alt="ticketZ Logo"
                src={TICKETZ_LOGO}
              />
            </div>
      
            <div 
              onClick={() => navigate('/su-kien-cua-toi')}
              className="absolute top-[27px] left-[89px] [font-family:'Moul-Regular',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[15px]">
              Organizer <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; center
            </div>
      
            

      {/* Header */}
      <div className="absolute top-0 left-[272px] w-[1500px] h-20 flex gap-[11px] bg-white shadow-[0px_4px_4px_#00000040]">
            
              {/* 1. Nút "Tạo sự kiện" (Dùng lại logic cũ) */}
              <div className="mt-[17px] w-[102px] h-[45px] relative ml-[989px]">
                <button
                  onClick={() => navigate('/')} 
                  className="flex items-center justify-center w-[108px] h-[45px] rounded-full bg-[#FF5331] text-white text-xs font-semibold [font-family:'Montserrat-SemiBold',Helvetica] shadow-[0_4px_8px_rgba(0,0,0,0.25)] border-none outline-none"
                >
                  Tạo sự kiện
                </button>
              </div>
      
              {/* 2. Bọc Avatar và Dropdown trong một div 'relative' (căn giữa theo chiều dọc) */}
              {/* Thêm 'items-center' vào flex cha và bỏ 'mt-[17px]' ở đây */}
              <div className="relative flex items-center h-full "> {/* Căn giữa avatar */}
                
                <div className="relative"> {/* Bọc trong 1 div relative nữa */}
                  {/* Thêm onClick cho Avatar để bật/tắt menu */}
                  <div 
                    onClick={() => setIsMenuOpen(prev => !prev)} 
                    className="cursor-pointer mt-[-27px]"
                  >
                    <StashUserAvatar className="w-12 h-12" />
                  </div>
      
                  {/* Menu Dropdown (hiển thị có điều kiện) */}
                  {isMenuOpen && (
                    <div 
                      className="
                        absolute top-full right-0 mt-2 w-60 
                        bg-white rounded-lg shadow-xl 
                        border border-gray-100 z-50 overflow-hidden
                      "
                    >
                      <div className="py-1">
                        <MenuItem 
                          text="Vé của tôi" 
                          onClick={() => navigate('/ve-cua-toi')} 
                        />
                        <MenuItem 
                          text="Sự kiện của tôi" 
                          onClick={() => navigate('/su-kien-cua-toi')} 
                        />
                        <MenuItem 
                          text="Tài khoản của tôi" 
                          onClick={() => navigate('/tai-khoan-cua-toi')} 
                        />
                        <div className="h-px bg-gray-200 my-1" />
                        <MenuItem 
                          text="Đăng xuất" 
                          onClick={() => { /* Logic đăng xuất */ }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

      {/* Thanh bước */}
      <div className="absolute top-[88px] left-[286px] w-[148px] h-8 flex gap-1 ">
        <div className="w-[34px] h-8 relative">
          <div className="absolute top-0 left-0 w-8 h-8 bg-white rounded-2xl" />

          <div className="left-3.5 absolute top-2 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
            1
          </div>
        </div>

        <div className="mt-2 w-[108px] h-[15px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
          Thông tin sự kiện
        </div>
      </div>

      <div className="absolute top-[90px] left-[572px] w-[150px] h-8 flex gap-0.5">
        <div className="w-[34px] h-8 relative">
          <div className="absolute top-0 left-0 w-8 h-8 bg-white rounded-2xl" />

          <div className="absolute top-2 left-[13px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
            2
          </div>
        </div>

        <p className="mt-2 w-28 h-[15px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
          Thời gian &amp; loại vé
        </p>
      </div>

      <div className="absolute top-[90px] left-[827px] w-[334px] h-[34px] flex">
        <div className="w-[92px] flex gap-3">
          <div className="w-[34px] h-8 relative">
            <div className="absolute top-0 left-0 w-8 h-8 bg-white rounded-2xl" />

            <div className="absolute top-2 left-[13px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
              3
            </div>
          </div>

          <div className="mt-2 w-11 h-[15px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
            Cài đặt
          </div>
        </div>

        <div className="mt-0.5 w-[34px] h-8 relative ml-[69px]">
          <div className="absolute top-0 left-0 w-8 h-8 bg-white rounded-2xl" />

          <div className="left-3 absolute top-2 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
            4
          </div>
        </div>

        <div className="mt-2.5 w-[132px] h-[15px] ml-[5px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
          Thông tin thanh toán
        </div>
      </div>
      {/* Line */}
    <div className="absolute top-[130px] left-[273px] w-[1500px] h-[3px] bg-gray-300 rounded-full opacity-70"></div>


      {/* Form thời gian */}
      <div className="absolute top-[156px] left-[305px] w-[1112px] h-[130px] bg-[#ffe8e2] rounded-md" />
      <div className="absolute top-[174px] left-[305px] w-[173px] h-[29px]">
        <div className="absolute top-0 left-[22px] w-[131px] h-[29px] bg-white rounded-lg" />
        <div className="absolute top-1.5 left-0 w-[171px] font-semibold text-[#f94f2f] text-xs text-center leading-[normal]">
          Thời gian bán vé
        </div>
      </div>

      <input
        type="datetime-local" // 1. Đổi type
        // 2. Dùng hàm chuyển đổi mới
        value={formatToDateTimePicker(eventData.startTime) || ''}
        // 3. Dùng hàm chuyển đổi mới
        onChange={(e) => {
          const newTime = formatFromDateTimePicker(e.target.value);
          setEventData(prev => ({ ...prev, startTime: newTime }));
        }}
        className="absolute top-[216px] left-[327px] w-[513px] h-[31px]  bg-white rounded border border-[#ccc] px-3 text-xs text-[#6e6e6e] font-light focus:outline-none focus:ring-1 focus:ring-[#6e6e6e]"
      />

      <input
        type="datetime-local" // 1. Đổi type
        // 2. Dùng hàm chuyển đổi mới
        value={formatToDateTimePicker(eventData.endTime) || ''}
        // 3. Dùng hàm chuyển đổi mới
        onChange={(e) => {
          const newTime = formatFromDateTimePicker(e.target.value);
          setEventData(prev => ({ ...prev, endTime: newTime }));
        }}
        className="absolute top-[216px] left-[871px] w-[513px] h-[31px]  bg-white rounded border border-[#ccc] px-3 text-xs text-[#6e6e6e] font-light focus:outline-none focus:ring-1 focus:ring-[#6e6e6e]"
      />
<div className="absolute top-[300px] left-[305px] w-[1064px] min-h-[100px] bg-[#ffe8e2] rounded-md p-6 flex flex-col">

  {/* 1. Label "Loại vé" - Đã bỏ `absolute` và thêm `mb-4` (margin-bottom) */}
  <div className="w-[173px] h-[29px] relative mb-4">
    <div className="absolute top-0 left-[0 px] w-[131px] h-[29px] bg-white rounded-lg" />
    <div className="absolute top-1.5 left-[-30px] w-[171px] font-semibold text-[#f94f2f] text-xs text-center leading-[normal]">
      Loại vé
    </div>
  </div>

  {/* 2. Danh sách vé - Đã bỏ `absolute` và thêm `mb-4` */}
  <div className="w-full space-y-2 mb-4">
    {/* Kiểm tra xem có vé nào không và map qua chúng */}
    {eventData.tickets && eventData.tickets.map(ticket => (
      <div 
        key={ticket.id} 
        // Bỏ w-[1053px] để nó tự dãn 100% theo cha
        className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm w-[1048px]"
      >
        <div className="flex items-center gap-3">
          <span className="cursor-grab">☰</span>
          <span className="font-semibold">{ticket.ticketName || "Chưa đặt tên"}</span>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 bg-white rounded-md hover:bg-gray-300"
            onClick={() => handleEditClick(ticket)}
          >
            <FaEdit />
          </button>
          <button 
            className="p-2 bg-[#F94F2F] rounded-md hover:bg-red-600"
            onClick={() => handleDeleteTicket(ticket.id)}
          >
            <FaTrash className="text-white w-4 h-4" />
          </button>


        </div>
      </div>
    ))}
  </div>

  {/* 3. Nút "Tạo vé" - Đã bỏ `absolute` và bọc trong div `justify-center` */}
<div className="flex justify-center">
          {/* 5. Truyền state "đang sửa" xuống cho component con */}
          <TicketCreator 
            editingTicket={editingTicket}
            setEditingTicket={setEditingTicket}
          />
        </div>

</div>
      {/* Sidebar buttons */}
      <div className="absolute top-[223px] left-[19px] w-60 h-[54px]">
              <img
                className="absolute top-0 left-0 w-[238px] h-[54px]"
                alt="Rectangle"
                src={rectangle622}
              />
      
              <div className="absolute top-[19px] left-[47px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs tracking-[0] leading-[normal]">
                Điều khoản BTC
              </div>
      
              <QlementineIconsMoney16 className="!absolute !top-[11px] !left-[9px] !w-8 !h-8 !aspect-[1]" />
            </div>

      <div className="absolute w-[238px] h-[54px] top-[140px] left-[19px] flex">
              <div
              onClick={() => navigate('/su-kien-cua-toi')}
               className="w-60 h-[54px] relative">
                <img
                  className="absolute top-0 left-0 w-[238px] h-[54px]"
                  alt="Rectangle"
                  src={rectangle62}
                />
      
                <div className="absolute top-[19px] left-[47px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs text-center tracking-[0] leading-[normal]">
                  Sự kiện của tôi
                </div>
                <Calendar className="!absolute !top-[11px] !left-[9px] !w-8 !h-8 !aspect-[1]" />
              </div>
            </div>
        {/* Footer */}
        <div className="absolute top-[1511px] left-0 w-[1472px] h-[581px]">
                <div className="absolute top-0 left-0 w-[1500px] h-[581px] bg-[#5d5c5c]" />
        
                <img
                  className="absolute top-[60px] left-[121px] w-[345px] h-[113px] aspect-[3.05]"
                  alt="Ticke"
                  src={ticke12}
                />
        
                <div className="absolute top-[90px] left-[851px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Giới thiệu về TickeZ.
                </div>
        
                <p className="absolute top-[309px] left-[589px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Bạn đang truy cập TickeZ. phiên bản Số 123456789
                </p>
        
                <div className="absolute top-[90px] left-[972px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Hợp đồng
                </div>
        
                <div className="absolute top-[90px] left-[1217px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Hotline: 033.33.333
                </div>
        
                <div className="top-[90px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[10px] whitespace-nowrap absolute left-[1337px] text-white text-center tracking-[0] leading-[normal]">
                  Thông báo
                </div>
        
                <div className="absolute top-[109px] left-[1337px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  About us
                </div>
        
                <div className="absolute top-32 left-[1337px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  FAQs
                </div>
        
                <div className="absolute top-[147px] left-[1337px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Góp ý
                </div>
        
                <div className="absolute top-[109px] left-[1217px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Chatbot hỗ trợ
                </div>
        
                <p className="absolute top-[109px] left-[972px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Điều khoản &amp; Điều kiện
                </p>
        
                <p className="absolute top-32 left-[972px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Chính sách bảo vệ người dùng
                </p>
        
                <div className="absolute top-[60px] left-[972px] [font-family:'Montserrat-ExtraBold',Helvetica] font-extrabold text-white text-xs text-center tracking-[0] leading-[normal]">
                  QUY ĐỊNH
                </div>
        
                <div className="absolute top-[60px] left-[1217px] [font-family:'Montserrat-ExtraBold',Helvetica] font-extrabold text-white text-xs text-center tracking-[0] leading-[normal]">
                  LIÊN HỆ
                </div>
        
                <div className="top-[60px] [font-family:'Montserrat-ExtraBold',Helvetica] font-extrabold text-xs absolute left-[1337px] text-white text-center tracking-[0] leading-[normal]">
                  THÔNG TIN
                </div>
        
                <div className="absolute top-[60px] left-[851px] [font-family:'Montserrat-ExtraBold',Helvetica] font-extrabold text-white text-xs text-center tracking-[0] leading-[normal]">
                  GIỚI THIỆU
                </div>
        
                <div className="absolute top-[199px] left-[121px] [font-family:'Montserrat-ExtraBold',Helvetica] font-extrabold text-white text-xs text-center tracking-[0] leading-[normal]">
                  FOLLOW US
                </div>
        
                <img
                  className="absolute top-[221px] left-[121px] w-10 h-10 object-cover"
                  alt="Rectangle"
                  src={rectangle53}
                />
        
                <img
                  className="absolute top-[221px] left-[182px] w-10 h-10 object-cover"
                  alt="Rectangle"
                  src={rectangle56}
                />
        
                <img
                  className="absolute top-[221px] left-[243px] w-10 h-10 object-cover"
                  alt="Rectangle"
                  src={rectangle57}
                />
        
                <img
                  className="absolute top-[221px] left-[304px] w-10 h-10 object-cover"
                  alt="Rectangle"
                  src={rectangle58}
                />
              </div>
    </div>
  
  );
};
const MenuItem = ({ text, onClick }) => {
  // Map tên với emoji
  const icons = {
    "Vé của tôi": "🎫",
    "Sự kiện của tôi": "📅",
    "Tài khoản của tôi": "👨‍💻",
    "Đăng xuất": "➔"
  };

  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-3 w-full text-left
        px-4 py-3 text-sm text-gray-700 
        hover:bg-gray-100 hover:text-gray-900
        transition-colors duration-150
        border-none bg-transparent cursor-pointer
      "
    >
      <span className="text-lg w-6 text-center">{icons[text] || '•'}</span>
      <span>{text}</span>
    </button>
  );
};
export default EventPage2;
