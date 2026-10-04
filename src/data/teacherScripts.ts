import { TeacherScript, SectionInfo } from '../types';

export const SECTIONS: SectionInfo[] = [
  {
    id: 'shape',
    title: '1. Hình dạng của nước',
    shortTitle: 'Hình dạng',
    iconName: 'Shapes',
    description: 'Quan sát nước thay đổi hình dạng theo từng loại vật chứa (cốc, bát, chai).'
  },
  {
    id: 'flow',
    title: '2. Hướng chảy & Lan rộng',
    shortTitle: 'Hướng chảy',
    iconName: 'Waves',
    description: 'Quan sát nước chảy từ mặt phẳng nghiêng xuống khay và lan ra các hướng.'
  },
  {
    id: 'permeability',
    title: '3. Tính thấm qua một số vật',
    shortTitle: 'Tính thấm',
    iconName: 'Droplets',
    description: 'Quan sát hiện tượng nước thấm qua khăn vải, giấy và không thấm qua đĩa nhựa.'
  },
  {
    id: 'solubility',
    title: '4. Tính hòa tan',
    shortTitle: 'Tính hòa tan',
    iconName: 'Sparkles',
    description: 'Khuấy muối, đường và cát trong nước để quan sát chất tan và chất không tan.'
  },
  {
    id: 'applications',
    title: '5. Nước với cuộc sống',
    shortTitle: 'Ứng dụng',
    iconName: 'HeartHandshake',
    description: 'Khám phá các vai trò quan trọng của nước trong đời sống con người và tự nhiên.'
  }
];

export const TEACHER_SCRIPTS: Record<string, TeacherScript> = {
  shape: {
    sectionId: 'shape',
    title: 'Bài học 1: Nước có hình dạng cố định không?',
    preparation: 'Giáo viên chuẩn bị 3 vật chứa có hình dạng khác nhau: Cốc thủy tinh hình trụ, Bát tròn, Chai thắt eo.',
    openQuestions: [
      'Nước ở trong bình chứa ban đầu có hình dạng gì?',
      'Khi đổ nước lần lượt vào cốc, bát và chai, em thấy hình dạng của nước thay đổi như thế nào?',
      'Nước có tự giữ một hình dạng cố định khi không nằm trong vật chứa không?'
    ],
    keyObservation: 'Nước chảy linh hoạt và lập tức biến đổi hình dạng để lấp đầy phần đáy của từng vật chứa (cốc trụ, bát tròn, chai eo).',
    conclusion: 'Nước là chất lỏng, không màu, không mùi, không vị và KHÔNG CÓ HÌNH DẠNG NHẤT ĐỊNH. Nước có hình dạng của vật chứa nó.',
    extendedThought: 'Liên hệ thực tế: Tại sao khi đóng chai nước giải khát, người ta có thể làm nhiều kiểu dáng chai đẹp mắt khác nhau?'
  },
  flow: {
    sectionId: 'flow',
    title: 'Bài học 2: Nước chảy như thế nào?',
    preparation: 'Chuẩn bị một mặt phẳng nghiêng (máng chảy) phía trên một khay phẳng rộng.',
    openQuestions: [
      'Khi đổ nước ở đỉnh mặt phẳng nghiêng, nước di chuyển theo hướng nào?',
      'Khi dòng nước chạm xuống khay phẳng ở đáy, điều gì xảy ra với lượng nước đó?',
      'Em hãy so sánh chuyển động của nước ở dốc nghiêng và ở mặt khay bằng phẳng.'
    ],
    keyObservation: 'Nước lập tức chảy nhanh từ vị trí cao xuống vị trí thấp dọc theo dốc nghiêng, sau đó tràn lan đều ra khắp mọi phía trên khay phẳng.',
    conclusion: 'Nước CHẢY TỪ CAO XUỐNG THẤP và LAN RA KHẮP MỌI PHÍA khi gặp mặt phẳng.',
    extendedThought: 'Ứng dụng trong thực tế: Con người đã ứng dụng tính chất chảy từ cao xuống thấp của nước để làm gì? (Làm ruộng bậc thang, xây đập thủy điện, làm mái nhà nghiêng để thoát nước mưa...).'
  },
  permeability: {
    sectionId: 'permeability',
    title: 'Bài học 3: Nước thấm qua những vật nào?',
    preparation: 'Chuẩn bị 3 vật liệu khác nhau: Khăn vải, Đĩa nhựa/thủy tinh, Tờ giấy ăn.',
    openQuestions: [
      'Khi nhỏ từng giọt nước lên khăn vải, đĩa nhựa và tờ giấy, em quan sát thấy hiện tượng gì ở từng vật?',
      'Vật nào hấp thụ giọt nước vào bên trong và cho nước chui qua? Vật nào giữ giọt nước tròn trĩnh trên bề mặt?',
      'Theo em, vật liệu nào thấm nước và vật liệu nào không thấm nước?'
    ],
    keyObservation: 'Nước loang rộng và thấm sâu qua khăn vải và giấy làm chúng bị ướt sũng. Ngược lại, giọt nước đọng thành hạt lăn trên đĩa nhựa mà không thấm vào trong.',
    conclusion: 'Nước THẤM QUA MỘT SỐ VẬT (như vải, giấy, bông, đất,...) và KHÔNG THẤM QUA MỘT SỐ VẬT (như nhựa, thủy tinh, kim loại, cao su,...).',
    extendedThought: 'Ứng dụng thực tế: Tại sao áo mưa được làm bằng nilon/nhựa, còn khăn lau tay lại được làm bằng vải sợi bông?'
  },
  solubility: {
    sectionId: 'solubility',
    title: 'Bài học 4: Nước hòa tan được những chất nào?',
    preparation: '3 cốc nước trong suốt, 3 thìa đựng: Muối ăn, Đường trắng, Cát mịn.',
    openQuestions: [
      'Trước khi khuấy, các hạt muối, đường, cát nằm ở vị trí nào trong cốc?',
      'Sau khi dùng thìa khuấy đều 10 giây, em còn nhìn thấy hạt muối và đường trong cốc 1 và cốc 2 không?',
      'Quan sát cốc thứ 3 đựng cát: Cát có biến mất không hay đọng lại ở đáy cốc?'
    ],
    keyObservation: 'Muối và đường dần dần phân rã nhỏ và biến mất hoàn toàn tạo thành dung dịch trong suốt. Hạt cát không bị phân rã, lắng xuống đáy cốc dù khuấy mạnh.',
    conclusion: 'Nước HÒA TAN ĐƯỢC MỘT SỐ CHẤT (như muối, đường, mì chính, bột nêm,...) và KHÔNG HÒA TAN ĐƯỢC MỘT SỐ CHẤT (như cát, đất, dầu ăn, nhựa,...).',
    extendedThought: 'Liên hệ đời sống: Khi pha nước cam hay pha nước muối súc miệng, chúng ta cần làm gì để đường/muối tan nhanh hơn?'
  },
  applications: {
    sectionId: 'applications',
    title: 'Bài học 5: Vai trò của nước đối với đời sống',
    preparation: 'Bộ tranh ảnh minh họa sống động về nước trong sinh hoạt, nông nghiệp, công nghiệp và tự nhiên.',
    openQuestions: [
      'Hãy kể tên những hoạt động hằng ngày của em và gia đình cần sử dụng đến nước?',
      'Cây cối và động vật sẽ ra sao nếu thiếu nước trong nhiều ngày?',
      'Chúng ta cần làm gì để bảo vệ nguồn nước sạch và sử dụng nước tiết kiệm?'
    ],
    keyObservation: 'Nước có mặt ở khắp mọi nơi và là yếu tố sinh tồn không thể thay thế cho con người, động vật, cây cối cũng như sản xuất điện năng, giao thông.',
    conclusion: 'Nước đóng vai trò vô cùng quan trọng đối với sự sống của con người, động vật và thực vật. Nước phục vụ sinh hoạt, sản xuất nông nghiệp, công nghiệp, giao thông và tạo ra năng lượng.',
    extendedThought: 'Thông điệp xanh: Hãy giữ giữ vệ sinh nguồn nước, tắt vòi nước khi không sử dụng và tái sử dụng nước hợp lý!'
  }
};
