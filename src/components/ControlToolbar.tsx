import React from 'react';
import { SectionId, SimulationState } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Droplets,
  RotateCw,
  Tag,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface ControlToolbarProps {
  activeSection: SectionId;
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onPourWater: () => void;
  onStir: () => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  activeSection,
  simState,
  setSimState,
  onPlay,
  onPause,
  onReset,
  onPourWater,
  onStir
}) => {
  const isSolubility = activeSection === 'solubility';
  const isPourable = activeSection === 'shape' || activeSection === 'flow' || activeSection === 'permeability';

  return (
    <div className="bg-white border-t-4 border-blue-200 px-4 py-3.5 shadow-xl z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Main Simulation Control Buttons */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Bắt đầu (Play) */}
          <button
            onClick={onPlay}
            disabled={simState.isPlaying && !simState.isPaused}
            className={`px-5 py-2.5 rounded-2xl text-base font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              simState.isPlaying && !simState.isPaused
                ? 'bg-emerald-200 text-emerald-800 border-2 border-emerald-300 cursor-not-allowed opacity-70'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 active:border-b-0 hover:scale-[1.02]'
            }`}
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Bắt đầu</span>
          </button>

          {/* Tạm dừng (Pause) */}
          <button
            onClick={onPause}
            disabled={!simState.isPlaying}
            className={`px-5 py-2.5 rounded-2xl text-base font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              !simState.isPlaying
                ? 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                : simState.isPaused
                ? 'bg-amber-400 text-amber-950 border-b-4 border-amber-600 hover:bg-amber-500'
                : 'bg-amber-100 text-amber-900 border-2 border-amber-300 hover:bg-amber-200'
            }`}
          >
            <Pause className="w-5 h-5 text-amber-800" />
            <span>{simState.isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
          </button>

          {/* Làm lại (Reset) */}
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-2xl text-base font-extrabold bg-sky-100 hover:bg-sky-200 text-blue-900 border-2 border-blue-300 shadow-sm flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <RotateCcw className="w-5 h-5 text-blue-600" />
            <span>Làm lại</span>
          </button>

          <div className="h-8 w-0.5 bg-blue-200 mx-1 hidden sm:block" />

          {/* Contextual Actions: Đổ nước & Khuấy */}
          {isPourable && (
            <button
              onClick={onPourWater}
              className={`px-5 py-2.5 rounded-2xl text-base font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                simState.isPoured
                  ? 'bg-blue-700 text-white border-b-4 border-blue-900'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-b-4 border-blue-800 hover:scale-[1.02]'
              }`}
            >
              <Droplets className="w-5 h-5 animate-bounce" />
              <span>Đổ nước</span>
            </button>
          )}

          {isSolubility && (
            <button
              onClick={onStir}
              className={`px-5 py-2.5 rounded-2xl text-base font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                simState.isStirred
                  ? 'bg-purple-700 text-white border-b-4 border-purple-900'
                  : 'bg-purple-600 hover:bg-purple-700 text-white border-b-4 border-purple-800 hover:scale-[1.02]'
              }`}
            >
              <RotateCw className="w-5 h-5 animate-spin" />
              <span>Khuấy cốc</span>
            </button>
          )}
        </div>

        {/* Secondary Toggles & Helper Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Bật/Tắt chú thích */}
          <button
            onClick={() =>
              setSimState((prev) => ({
                ...prev,
                showAnnotations: !prev.showAnnotations
              }))
            }
            className={`px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 border-2 transition-all cursor-pointer ${
              simState.showAnnotations
                ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Chú thích:</span>
            <span className="font-extrabold text-blue-700">{simState.showAnnotations ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* Ẩn/Hiện lời dẫn cho giáo viên */}
          <button
            onClick={() =>
              setSimState((prev) => ({
                ...prev,
                showTeacherScript: !prev.showTeacherScript
              }))
            }
            className={`px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 border-2 transition-all cursor-pointer ${
              simState.showTeacherScript
                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Lời dẫn:</span>
            <span className="font-extrabold text-emerald-800">{simState.showTeacherScript ? 'HIỆN' : 'ẨN'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
