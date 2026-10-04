import React from 'react';
import { SECTIONS } from '../data/teacherScripts';
import { SectionId } from '../types';
import { BackgroundAudio } from './BackgroundAudio';
import {
  Shapes,
  Waves,
  Droplets,
  Sparkles,
  HeartHandshake,
  BookOpen,
  Maximize,
  Minimize,
  Award,
  Video
} from 'lucide-react';

interface HeaderProps {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  showTeacherScript: boolean;
  setShowTeacherScript: React.Dispatch<React.SetStateAction<boolean>>;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  onOpenVideo?: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Shapes: (props) => <Shapes {...props} />,
  Waves: (props) => <Waves {...props} />,
  Droplets: (props) => <Droplets {...props} />,
  Sparkles: (props) => <Sparkles {...props} />,
  HeartHandshake: (props) => <HeartHandshake {...props} />,
};

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  showTeacherScript,
  setShowTeacherScript,
  isFullscreen,
  toggleFullscreen,
  onOpenVideo
}) => {
  return (
    <header className="bg-white border-b-4 border-blue-200 sticky top-0 z-30 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* App Title & Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-sky-100 rounded-2xl border-2 border-blue-300 shadow-sm overflow-hidden flex items-center justify-center w-12 h-12 shrink-0">
              <img
                src="https://i.postimg.cc/HLJZqB8F/Gemini-Generated-Image-8bwkx8bwkx8bwkx8.png"
                alt="Tính chất của nước"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-blue-600 text-white shadow-xs">
                  Khoa học Lớp 4
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" /> Trình chiếu lớp học
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-extrabold font-heading text-blue-900 tracking-tight leading-tight mt-0.5">
                Tính chất của nước &amp; Nước với cuộc sống
              </h1>
              <p className="text-xs font-bold text-red-600 mt-0.5">
                Sản phẩm này thuộc bản quyền của cô Lê Ngọc.
              </p>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <BackgroundAudio />
            {onOpenVideo && (
              <button
                onClick={onOpenVideo}
                className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm border-b-2 border-red-800 transition-all cursor-pointer"
                title="Xem Video bài học"
              >
                <Video className="w-4 h-4" />
                <span>Video</span>
              </button>
            )}
            <button
              onClick={() => setShowTeacherScript(!showTeacherScript)}
              className={`p-2 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                showTeacherScript
                  ? 'bg-amber-400 text-amber-950 shadow-md border-b-2 border-amber-600'
                  : 'bg-slate-100 text-slate-700 border border-slate-300'
              }`}
              title="Lời dẫn giáo viên"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Lời dẫn</span>
            </button>
          </div>
        </div>

        {/* Section Tabs - Large Vibrant Tabs for Classroom */}
        <nav className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {SECTIONS.map((section) => {
            const IconComponent = ICON_MAP[section.iconName] || Droplets;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg border-b-4 border-blue-800 scale-[1.02]'
                    : 'bg-white text-blue-800 hover:bg-blue-50 border-2 border-blue-200 shadow-xs'
                }`}
              >
                <IconComponent className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span>{section.shortTitle}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <BackgroundAudio />

          {onOpenVideo && (
            <button
              onClick={onOpenVideo}
              className="px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-md border-b-4 border-red-800 transition-all cursor-pointer hover:scale-[1.02]"
              title="Xem Video thí nghiệm bài học"
            >
              <Video className="w-4.5 h-4.5 text-white" />
              <span>Video Bài Học</span>
            </button>
          )}

          <button
            onClick={() => setShowTeacherScript(!showTeacherScript)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              showTeacherScript
                ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md border-b-4 border-amber-600'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300'
            }`}
            title="Ẩn/Hiện lời dẫn cho giáo viên"
          >
            <BookOpen className="w-4.5 h-4.5 text-amber-600" />
            <span>Lời dẫn GV</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 shadow-xs transition-all cursor-pointer"
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình trình chiếu'}
          >
            {isFullscreen ? <Minimize className="w-5 h-5 text-slate-700" /> : <Maximize className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
