import React from 'react';
import { TEACHER_SCRIPTS } from '../data/teacherScripts';
import { SectionId } from '../types';
import { Award, CheckCircle2, Sparkles, X } from 'lucide-react';

interface ConclusionModalProps {
  activeSection: SectionId;
  isOpen: boolean;
  onClose: () => void;
}

export const ConclusionModal: React.FC<ConclusionModalProps> = ({
  activeSection,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const script = TEACHER_SCRIPTS[activeSection] || TEACHER_SCRIPTS.shape;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-amber-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b-2 border-amber-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-amber-950 font-bold shadow-sm border-b-2 border-amber-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider">
                Ghi nhớ Khoa học Lớp 4
              </span>
              <h3 className="text-lg font-black text-slate-900 font-heading">{script.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-sm relative overflow-hidden">
            <Sparkles className="w-12 h-12 text-amber-400/30 absolute right-3 top-3" />
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Rút ra kết luận quan trọng:
            </h4>
            <p className="text-base md:text-lg font-black text-amber-950 leading-relaxed">
              "{script.conclusion}"
            </p>
          </div>

          <div className="p-4 bg-sky-50 border-2 border-blue-200 rounded-2xl">
            <h5 className="text-xs font-black text-blue-900 uppercase tracking-wider mb-2">
              Tóm tắt ghi nhớ toàn bài:
            </h5>
            <ul className="space-y-2 text-xs md:text-sm text-slate-800 font-medium list-disc list-inside">
              <li><strong>Hình dạng:</strong> Nước không có hình dạng nhất định, mang hình dạng của vật chứa.</li>
              <li><strong>Hướng chảy:</strong> Nước chảy từ cao xuống thấp và lan ra khắp mọi phía.</li>
              <li><strong>Tính thấm:</strong> Nước thấm qua một số vật (vải, giấy) và không thấm qua một số vật (nhựa, thủy tinh, kim loại).</li>
              <li><strong>Tính hòa tan:</strong> Nước hòa tan được một số chất (muối, đường) và không hòa tan được một số chất (cát, dầu ăn).</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm border-b-4 border-amber-600 shadow-md transition-all cursor-pointer"
          >
            Đã hiểu bài học
          </button>
        </div>
      </div>
    </div>
  );
};
