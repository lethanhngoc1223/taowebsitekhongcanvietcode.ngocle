import { WaterApplication } from '../types';

export const WATER_APPLICATIONS: WaterApplication[] = [
  {
    id: 'drinking_cooking',
    title: 'Sinh hoạt & Sức khỏe con người',
    category: 'sinh-hoat',
    description: 'Nước cung cấp cho cơ thể con người duy trì sự sống (uống 1.5 - 2 lít/ngày), nấu ăn, tắm rửa, giữ vệ sinh thân thể.',
    classroomQuestion: 'Điều gì xảy ra với cơ thể chúng ta nếu bị thiếu nước trong cả một ngày nóng bức?',
    icon: 'GlassWater',
    gradient: 'from-cyan-500 to-blue-600',
    illustrationType: 'drinking'
  },
  {
    id: 'watering_plants',
    title: 'Tưới cây & Nông nghiệp',
    category: 'nong-nghiep',
    description: 'Cây trồng hấp thụ nước từ đất để vận chuyển chất dinh dưỡng nuôi lá, hoa, quả. Nước giúp đồng ruộng, vườn cây xanh tốt.',
    classroomQuestion: 'Tại sao bác nông dân phải tưới nước đều đặn cho rau và lúa mỗi ngày?',
    icon: 'Sprout',
    gradient: 'from-emerald-500 to-teal-600',
    illustrationType: 'watering'
  },
  {
    id: 'cleaning_home',
    title: 'Vệ sinh nhà cửa & Đồ dùng',
    category: 'sinh-hoat',
    description: 'Nước hòa tan xà phòng giúp lau sạch sàn nhà, rửa bát đĩa, giặt quần áo, giữ môi trường sống luôn sạch sẽ, thơm tho.',
    classroomQuestion: 'Vì sao chúng ta sử dụng nước kết hợp xà phòng để làm sạch vết bẩn?',
    icon: 'Sparkles',
    gradient: 'from-sky-400 to-indigo-500',
    illustrationType: 'cleaning'
  },
  {
    id: 'hydroelectric',
    title: 'Thủy điện & Năng lượng clean',
    category: 'cong-nghiep',
    description: 'Sử dụng sức chảy của nước từ trên cao xuống để quay tuốc bin nhà máy thủy điện, tạo ra điện năng thắp sáng cho mọi nhà.',
    classroomQuestion: 'Tính chất nào của nước được con người tận dụng để sản xuất ra điện năng?',
    icon: 'Zap',
    gradient: 'from-amber-400 to-orange-500',
    illustrationType: 'hydroelectric'
  },
  {
    id: 'waterway_transport',
    title: 'Giao thông đường thủy & Thuyền bè',
    category: 'cong-nghiep',
    description: 'Thuyền, ghe, tàu thủy lưu thông chở hàng hóa và hành khách trên sông, biển một cách thuận tiện.',
    classroomQuestion: 'Tàu thuyền di chuyển trên sông nhờ vào lợi thế môi trường nước như thế nào?',
    icon: 'Ship',
    gradient: 'from-blue-500 to-indigo-600',
    illustrationType: 'boating'
  },
  {
    id: 'hygiene_handwashing',
    title: 'Rửa tay & Phòng chống dịch bệnh',
    category: 'sinh-hoat',
    description: 'Rửa tay bằng nước sạch và xà phòng giúp loại bỏ vi khuẩn, vi-rút bám trên tay, bảo vệ sức khỏe học sinh.',
    classroomQuestion: 'Tại sao rửa tay bằng nước sạch là thói quen tốt nhất để bảo vệ bản thân khỏi bệnh tật?',
    icon: 'ShieldCheck',
    gradient: 'from-teal-400 to-cyan-600',
    illustrationType: 'washing_hands'
  }
];
