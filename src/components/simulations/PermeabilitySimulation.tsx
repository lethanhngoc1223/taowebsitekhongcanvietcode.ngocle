import React, { useEffect, useRef, useState } from 'react';
import { SimulationState } from '../../types';
import { CheckCircle, XCircle, Droplets, ArrowDown, Sparkles } from 'lucide-react';

interface PermeabilitySimulationProps {
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
}

export const PermeabilitySimulation: React.FC<PermeabilitySimulationProps> = ({
  simState,
  setSimState
}) => {
  const [wetLevels, setWetLevels] = useState<{ towel: number; plate: number; paper: number }>({
    towel: 0,
    plate: 0,
    paper: 0
  });

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (simState.isPlaying && !simState.isPaused) {
      const animate = () => {
        setWetLevels((prev) => {
          const speed = 0.012;
          return {
            towel: Math.min(1, prev.towel + speed),
            plate: Math.min(1, prev.plate + speed), // plate collects surface beads
            paper: Math.min(1, prev.paper + speed)
          };
        });
        requestRef.current = requestAnimationFrame(animate);
      };

      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [simState.isPlaying, simState.isPaused]);

  useEffect(() => {
    if (!simState.isPlaying && !simState.isPoured) {
      setWetLevels({ towel: 0, plate: 0, paper: 0 });
    }
  }, [simState.isPlaying, simState.isPoured]);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-950 relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-heading text-cyan-300 flex items-center gap-2">
            Thí nghiệm 3: Kiểm tra tính thấm nước của các vật liệu
          </h2>
          <p className="text-xs text-slate-300">
            Nhỏ nước lên <strong className="text-cyan-400">Khăn vải</strong>, <strong className="text-amber-400">Đĩa nhựa</strong> và <strong className="text-emerald-400">Tờ giấy</strong> để so sánh sự thấm nước.
          </p>
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative flex-1 my-4 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800/80 p-6 overflow-hidden min-h-[380px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* 3 Test Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10 items-end">
          
          {/* STATION 1: KHĂN VẢI (Fabric Towel) */}
          <div className="flex flex-col items-center gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm relative">
            {/* Dropper Pipette at Top */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-12 bg-slate-600 rounded-t-lg border border-slate-400 flex items-end justify-center">
                <div className="w-2 h-3 bg-cyan-400 rounded-b-sm" />
              </div>

              {/* Falling Droplet Animation */}
              {(simState.isPlaying || wetLevels.towel > 0) && (
                <div className="my-2 flex flex-col items-center gap-1 animate-bounce">
                  <Droplets className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                </div>
              )}
            </div>

            {/* Material Object: Khăn vải sợi bông */}
            <div className="relative w-44 h-28 rounded-xl border-2 border-amber-600/60 bg-gradient-to-br from-amber-700 to-amber-900 p-2 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Texture lines for fabric */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:6px_6px]" />

              {/* Wet Soak Overlay */}
              <div
                className="absolute inset-0 bg-blue-950/80 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center"
                style={{ opacity: wetLevels.towel }}
              >
                <div className="text-center p-2">
                  <span className="text-xs font-bold text-cyan-300 block">Nước thấm sũng vào vải!</span>
                  <div className="flex justify-center mt-1 gap-1">
                    <Droplets className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
                  </div>
                </div>
              </div>

              <span className="relative z-10 text-sm font-extrabold text-amber-100 drop-shadow">
                1. Khăn vải bông
              </span>
            </div>

            {/* Status Indicator */}
            <div className="w-full text-center">
              {wetLevels.towel > 0.1 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" /> THẤM NƯỚC RẤT TỐT
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">Chờ thử nghiệm...</span>
              )}
            </div>

            {/* Annotation */}
            {simState.showAnnotations && wetLevels.towel > 0.2 && (
              <div className="text-xs font-bold bg-emerald-950/90 text-emerald-200 border border-emerald-400/50 px-3 py-1 rounded-lg text-center animate-in fade-in">
                🧵 Sợi vải hút nước nhanh
              </div>
            )}
          </div>

          {/* STATION 2: ĐĨA NHỰA (Plastic Dish) */}
          <div className="flex flex-col items-center gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm relative">
            {/* Dropper Pipette at Top */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-12 bg-slate-600 rounded-t-lg border border-slate-400 flex items-end justify-center">
                <div className="w-2 h-3 bg-cyan-400 rounded-b-sm" />
              </div>

              {/* Falling Droplet Animation */}
              {(simState.isPlaying || wetLevels.plate > 0) && (
                <div className="my-2 flex flex-col items-center gap-1 animate-bounce">
                  <Droplets className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                </div>
              )}
            </div>

            {/* Material Object: Đĩa nhựa trong suốt */}
            <div className="relative w-44 h-28 rounded-full border-4 border-slate-400/60 bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-2 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Glass reflection */}
              <div className="absolute top-2 left-4 w-3 h-16 bg-white/20 rounded-full rotate-45" />

              {/* Water Beads Sitting on Surface */}
              {wetLevels.plate > 0 && (
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_10px_rgba(56,189,248,0.8)] animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                  <div className="w-6 h-6 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_10px_rgba(56,189,248,0.8)] animate-pulse" />
                </div>
              )}

              <span className="relative z-10 text-sm font-extrabold text-slate-200 drop-shadow">
                2. Đĩa nhựa / Thủy tinh
              </span>
            </div>

            {/* Status Indicator */}
            <div className="w-full text-center">
              {wetLevels.plate > 0.1 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-xs">
                  <XCircle className="w-4 h-4" /> KHÔNG THẤM NƯỚC
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">Chờ thử nghiệm...</span>
              )}
            </div>

            {/* Annotation */}
            {simState.showAnnotations && wetLevels.plate > 0.2 && (
              <div className="text-xs font-bold bg-rose-950/90 text-rose-200 border border-rose-400/50 px-3 py-1 rounded-lg text-center animate-in fade-in">
                🛡️ Giọt nước đọng đọng thành hạt
              </div>
            )}
          </div>

          {/* STATION 3: TỜ GIẤY (Paper) */}
          <div className="flex flex-col items-center gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm relative">
            {/* Dropper Pipette at Top */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-12 bg-slate-600 rounded-t-lg border border-slate-400 flex items-end justify-center">
                <div className="w-2 h-3 bg-cyan-400 rounded-b-sm" />
              </div>

              {/* Falling Droplet Animation */}
              {(simState.isPlaying || wetLevels.paper > 0) && (
                <div className="my-2 flex flex-col items-center gap-1 animate-bounce">
                  <Droplets className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                </div>
              )}
            </div>

            {/* Material Object: Tờ giấy ăn / Giấy viết */}
            <div className="relative w-44 h-28 rounded-lg border-2 border-slate-300 bg-slate-100 p-2 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Wet Spot Expanding */}
              <div
                className="absolute rounded-full bg-cyan-500/50 border border-cyan-400 backdrop-blur-sm transition-all duration-300"
                style={{
                  width: `${wetLevels.paper * 120}px`,
                  height: `${wetLevels.paper * 120}px`
                }}
              />

              <span className="relative z-10 text-sm font-extrabold text-slate-900 drop-shadow">
                3. Tờ giấy viết
              </span>
            </div>

            {/* Status Indicator */}
            <div className="w-full text-center">
              {wetLevels.paper > 0.1 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" /> THẤM NƯỚC
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">Chờ thử nghiệm...</span>
              )}
            </div>

            {/* Annotation */}
            {simState.showAnnotations && wetLevels.paper > 0.2 && (
              <div className="text-xs font-bold bg-emerald-950/90 text-emerald-200 border border-emerald-400/50 px-3 py-1 rounded-lg text-center animate-in fade-in">
                📄 Giấy loang vết ướt và mềm đi
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Observation Summary Banner */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/90 border border-emerald-500/40 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/30 shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-wide">
              Kết luận từ quan sát:
            </h3>
            <p className="text-sm font-semibold text-white mt-0.5">
              Nước <strong className="text-emerald-300">thấm qua một số vật</strong> (như khăn vải, giấy) và <strong className="text-amber-300">không thấm qua một số vật</strong> (như nhựa, thủy tinh, kim loại)!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
