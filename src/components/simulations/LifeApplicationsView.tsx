import React, { useState } from 'react';
import { WATER_APPLICATIONS } from '../../data/waterApplications';
import { WaterApplication } from '../../types';
import {
  GlassWater,
  Sprout,
  Sparkles,
  Zap,
  Ship,
  ShieldCheck,
  HelpCircle,
  Heart,
  Droplet,
  Info
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  GlassWater: (props) => <GlassWater {...props} />,
  Sprout: (props) => <Sprout {...props} />,
  Sparkles: (props) => <Sparkles {...props} />,
  Zap: (props) => <Zap {...props} />,
  Ship: (props) => <Ship {...props} />,
  ShieldCheck: (props) => <ShieldCheck {...props} />,
};

export const LifeApplicationsView: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<WaterApplication | null>(null);

  // Custom vector graphics for each application type
  const renderIllustration = (type: string) => {
    switch (type) {
      case 'drinking':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-cyan-900 to-blue-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-cyan-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] opacity-20 [background-size:12px_12px]" />
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-24 bg-gradient-to-t from-cyan-400 to-sky-200/40 rounded-b-xl border-2 border-white/60 p-1 flex items-end justify-center shadow-lg shadow-cyan-500/50">
                <div className="w-full h-3/4 bg-cyan-400/80 rounded-b-lg animate-pulse" />
              </div>
              <span className="text-xs font-bold text-cyan-200">Uống 1.5 - 2 Lít Nước Sạch/Ngày</span>
            </div>
          </div>
        );
      case 'watering':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-emerald-900 to-teal-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-emerald-500/30">
            <div className="flex items-center gap-6 z-10">
              {/* Watering Can */}
              <div className="relative animate-bounce">
                <div className="w-14 h-10 bg-emerald-500 rounded-lg border border-emerald-200 shadow-md flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-emerald-100" />
                </div>
                <div className="w-8 h-2 bg-emerald-400 absolute top-2 -right-6 rotate-12" />
              </div>
              {/* Green Plant */}
              <div className="flex flex-col items-center">
                <Sprout className="w-16 h-16 text-emerald-400 animate-pulse" />
                <div className="w-20 h-4 bg-amber-800 rounded-t-lg border-t border-amber-600" />
              </div>
            </div>
          </div>
        );
      case 'cleaning':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-sky-900 to-indigo-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-sky-500/30">
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="flex gap-2 text-sky-300">
                <Sparkles className="w-10 h-10 animate-spin" />
                <Sparkles className="w-14 h-14 text-cyan-200 animate-pulse" />
              </div>
              <span className="text-xs font-bold text-sky-200">Giữ Môi Trường Sống Sạch Sẽ</span>
            </div>
          </div>
        );
      case 'hydroelectric':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-amber-950 to-orange-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-amber-500/30">
            <div className="flex items-center gap-4 z-10">
              <div className="flex flex-col items-center">
                <div className="text-xs font-bold text-amber-300">Đập Thủy Điện</div>
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin flex items-center justify-center my-1">
                  <Zap className="w-8 h-8 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'boating':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-blue-500/30">
            <div className="flex flex-col items-center gap-2 z-10">
              <Ship className="w-16 h-16 text-blue-300 animate-pulse" />
              <div className="w-36 h-3 bg-blue-500/60 rounded-full blur-[1px]" />
            </div>
          </div>
        );
      case 'washing_hands':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-teal-900 to-cyan-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-teal-500/30">
            <div className="flex flex-col items-center gap-2 z-10">
              <ShieldCheck className="w-16 h-16 text-teal-300 animate-bounce" />
              <span className="text-xs font-bold text-teal-200">Rửa Tay Xà Phòng 6 Bước</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-950 relative overflow-y-auto rounded-2xl border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="z-10 bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold font-heading text-cyan-300 flex items-center gap-2">
            5. Vai trò của Nước đối với Con người, Động vật và Thực vật
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Nhấp vào từng thẻ để thảo luận chi tiết với học sinh về ứng dụng của nước trong đời sống.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Heart className="w-4 h-4 text-emerald-400" />
          <span>Bảo vệ nguồn nước sạch</span>
        </div>
      </div>

      {/* Grid of Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4 z-10">
        {WATER_APPLICATIONS.map((app) => {
          const IconComp = ICON_MAP[app.icon] || Droplet;
          return (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Illustration Preview */}
                {renderIllustration(app.illustrationType)}

                {/* Card Header */}
                <div className="flex items-center gap-2.5 mt-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${app.gradient} text-white shadow-md`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {app.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {app.description}
                </p>
              </div>

              {/* Classroom Prompt button */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Hỏi học sinh</span>
                </span>
                <span className="text-cyan-400 group-hover:underline font-bold">
                  Xem chi tiết &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Classroom Discussion Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${selectedApp.gradient} text-white`}>
                  {React.createElement(ICON_MAP[selectedApp.icon] || Droplet, { className: 'w-6 h-6' })}
                </div>
                <h3 className="text-xl font-bold text-white font-heading">{selectedApp.title}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm font-bold"
              >
                Đóng ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {renderIllustration(selectedApp.illustrationType)}

              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {selectedApp.description}
              </p>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  Câu hỏi thảo luận cho lớp học:
                </h4>
                <p className="text-base font-bold text-amber-100 mt-1">
                  "{selectedApp.classroomQuestion}"
                </p>
              </div>

              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Giáo viên liên hệ thực tế: Nhắc nhở học sinh giữ gìn vệ sinh nguồn nước, không vứt rác xuống sông hồ và luôn khóa kỹ vòi nước sau khi dùng.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Environmental Message Footer */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/90 border border-emerald-500/40 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/30 shrink-0">
            <Heart className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-wide">
              Thông điệp giáo dục ý thức:
            </h3>
            <p className="text-sm font-semibold text-white mt-0.5">
              Nước là vô giá! Hãy <strong className="text-amber-300">tiết kiệm nước sạch</strong> và <strong className="text-cyan-300">bảo vệ nguồn nước</strong> khỏi bị ô nhiễm vì sự sống trên Trái Đất!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
