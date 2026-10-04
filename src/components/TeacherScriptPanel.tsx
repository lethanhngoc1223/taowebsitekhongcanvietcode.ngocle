import React from 'react';
import { TEACHER_SCRIPTS } from '../data/teacherScripts';
import { SectionId } from '../types';
import {
  BookOpen,
  HelpCircle,
  Eye,
  CheckCircle2,
  Lightbulb,
  X,
  Sparkles
} from 'lucide-react';

interface TeacherScriptPanelProps {
  activeSection: SectionId;
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherScriptPanel: React.FC<TeacherScriptPanelProps> = ({
  activeSection,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const script = TEACHER_SCRIPTS[activeSection] || TEACHER_SCRIPTS.shape;

  return (
    <div className="bg-white border-2 border-emerald-300 text-slate-800 p-5 w-full lg:w-96 shadow-xl rounded-3xl flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300 z-20">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shadow-sm border-b-2 border-emerald-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold font-heading text-emerald-950">
              Lời dẫn cho Giáo viên
            </h2>
            <p className="text-xs font-medium text-emerald-700">Hướng dẫn gợi mở bài học Lớp 4</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-emerald-50 transition-colors cursor-pointer"
          title="Đóng bảng hướng dẫn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Script Title */}
      <div className="mt-4 p-3.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
        <h3 className="text-sm font-extrabold text-emerald-900">{script.title}</h3>
        <p className="text-xs text-slate-700 mt-1">
          <strong className="text-emerald-800">Chuẩn bị:</strong> {script.preparation}
        </p>
      </div>

      {/* Open Questions for Students */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-2 text-blue-800 text-xs font-black uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Câu hỏi gợi mở cho học sinh</span>
        </div>
        <ul className="space-y-2 text-sm text-slate-800">
          {script.openQuestions.map((q, idx) => (
            <li
              key={idx}
              className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start gap-2.5 font-medium"
            >
              <span className="font-black text-blue-600 shrink-0">{idx + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Observation Guidance */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider">
          <Eye className="w-4 h-4 text-emerald-600" />
          <span>Hiện tượng cần hướng dẫn chú ý</span>
        </div>
        <div className="p-3.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-sm text-emerald-950 font-medium leading-relaxed">
          {script.keyObservation}
        </div>
      </div>

      {/* Official Conclusion Box */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-black uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>Kết luận Khoa học Lớp 4</span>
        </div>
        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-sm text-amber-950 text-sm font-bold leading-relaxed relative overflow-hidden">
          <Sparkles className="w-6 h-6 text-amber-400/40 absolute right-2 top-2" />
          <p className="relative z-10">{script.conclusion}</p>
        </div>
      </div>

      {/* Extended Discussion */}
      <div className="mt-5 space-y-2 mb-4">
        <div className="flex items-center gap-2 text-purple-900 text-xs font-black uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-purple-600" />
          <span>Liên hệ mở rộng thực tế</span>
        </div>
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-950 leading-relaxed font-medium italic">
          {script.extendedThought}
        </div>
      </div>
    </div>
  );
};
