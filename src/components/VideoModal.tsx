import React from 'react';
import { Video, X, Youtube, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const videoUrl = "https://www.youtube.com/embed/gYMPexIRuqQ?autoplay=1";

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-red-300 rounded-3xl max-w-3xl w-full shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b-2 border-red-100 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600 text-white font-bold shadow-sm border-b-2 border-red-800 flex items-center justify-center">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black text-red-700 uppercase tracking-wider">
                Tư liệu bài học Khoa học Lớp 4
              </span>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Video Thí nghiệm & Bài học về Nước
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-red-100 transition-colors cursor-pointer"
            title="Đóng video"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Embed Container */}
        <div className="relative w-full bg-black aspect-video flex items-center justify-center">
          <iframe
            src={videoUrl}
            title="Video Thí nghiệm Tính chất của Nước"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Modal Footer / Extra Actions */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Video className="w-4 h-4 text-red-600" />
            <span>Video tham khảo bài giảng Khoa học Lớp 4</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://youtu.be/gYMPexIRuqQ?si=FweaD0aSk7d8IswA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-300 transition-colors"
            >
              <span>Mở trên YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md border-b-4 border-red-800 transition-all cursor-pointer"
            >
              Đóng Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
