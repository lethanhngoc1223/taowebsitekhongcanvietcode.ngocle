import React, { useEffect, useRef, useState } from 'react';
import { SimulationState } from '../../types';
import { CheckCircle, XCircle, RotateCw, Sparkles } from 'lucide-react';

interface SolubilitySimulationProps {
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
}

export const SolubilitySimulation: React.FC<SolubilitySimulationProps> = ({
  simState,
  setSimState
}) => {
  const [stirProgress, setStirProgress] = useState<number>(0); // 0 to 1
  const [saltDissolved, setSaltDissolved] = useState<number>(0);
  const [sugarDissolved, setSugarDissolved] = useState<number>(0);
  const [sandSettled, setSandSettled] = useState<boolean>(true);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if ((simState.isPlaying || simState.isStirred) && !simState.isPaused) {
      const animate = () => {
        setStirProgress((prev) => (prev + 0.05) % (Math.PI * 2));

        setSaltDissolved((prev) => Math.min(1, prev + 0.012));
        setSugarDissolved((prev) => Math.min(1, prev + 0.012));
        setSandSettled(false);

        requestRef.current = requestAnimationFrame(animate);
      };

      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setSandSettled(true);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [simState.isPlaying, simState.isPaused, simState.isStirred]);

  useEffect(() => {
    if (!simState.isPlaying && !simState.isStirred) {
      setStirProgress(0);
      setSaltDissolved(0);
      setSugarDissolved(0);
      setSandSettled(true);
    }
  }, [simState.isPlaying, simState.isStirred]);

  const handleStirClick = () => {
    setSimState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      isStirred: true
    }));
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-950 relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-heading text-cyan-300 flex items-center gap-2">
            Thí nghiệm 4: Quan sát tính hòa tan của muối, đường và cát trong nước
          </h2>
          <p className="text-xs text-slate-300">
            Bấm nút <strong className="text-purple-400">"Khuấy cốc"</strong> để dùng thìa khuấy đều cả 3 cốc nước.
          </p>
        </div>
        <div>
          <button
            onClick={handleStirClick}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className="w-4 h-4 animate-spin" />
            <span>Khuấy thìa trong nước</span>
          </button>
        </div>
      </div>

      {/* Main Glass Cups Stage */}
      <div className="relative flex-1 my-4 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800/80 p-6 overflow-hidden min-h-[380px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* 3 Glasses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10 items-end justify-items-center">
          
          {/* CUP 1: MUỐI (SALT) */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-52 flex items-end justify-center">
              {/* Animated Stirring Spoon */}
              {(simState.isPlaying || simState.isStirred) && (
                <div
                  className="absolute top-2 w-4 h-36 bg-slate-300 rounded-full border border-slate-500 z-20 transition-transform origin-top"
                  style={{
                    transform: `rotate(${Math.sin(stirProgress) * 15}deg) translateX(${Math.cos(stirProgress) * 8}px)`
                  }}
                >
                  <div className="absolute bottom-0 w-8 h-10 -left-2 bg-slate-300 rounded-b-full border border-slate-500" />
                </div>
              )}

              {/* Glass Cup Outer */}
              <div className="absolute inset-0 rounded-b-2xl border-4 border-slate-400/50 bg-slate-800/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden">
                <div className="absolute top-0 left-2 w-1.5 h-full bg-white/20 rounded-full" />

                {/* Water Liquid Fill */}
                <div className="absolute bottom-0 inset-x-0 h-[80%] bg-gradient-to-t from-blue-600/80 via-cyan-500/70 to-sky-400/60 p-2 flex flex-col justify-end items-center overflow-hidden">
                  
                  {/* Salt Particles (Fading out when dissolved) */}
                  <div
                    className="w-full h-full flex flex-wrap gap-1 items-end justify-center transition-opacity duration-500"
                    style={{ opacity: 1 - saltDissolved }}
                  >
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-white rounded-sm shadow-[0_0_4px_#fff]"
                      />
                    ))}
                  </div>

                  {/* Soluble sparkle effect when dissolved */}
                  {saltDissolved > 0.8 && (
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-200 text-xs font-bold animate-pulse">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <span className="text-sm font-bold text-slate-200 block">1. Cốc Muối Ăn</span>
              <span className="text-xs text-slate-400">Tinh thể trắng</span>
            </div>

            {/* Status */}
            {saltDissolved > 0.5 ? (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> HÒA TAN HOÀN TOÀN
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-semibold">Chưa khuấy...</span>
            )}

            {/* Annotation */}
            {simState.showAnnotations && saltDissolved > 0.5 && (
              <div className="text-xs font-bold bg-emerald-950/90 text-emerald-200 border border-emerald-400/50 px-3 py-1 rounded-lg text-center animate-in fade-in">
                🧂 Hạt muối phân rã biến mất
              </div>
            )}
          </div>

          {/* CUP 2: ĐƯỜNG (SUGAR) */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-52 flex items-end justify-center">
              {/* Stirring Spoon */}
              {(simState.isPlaying || simState.isStirred) && (
                <div
                  className="absolute top-2 w-4 h-36 bg-slate-300 rounded-full border border-slate-500 z-20 transition-transform origin-top"
                  style={{
                    transform: `rotate(${Math.sin(stirProgress + 1) * 15}deg) translateX(${Math.cos(stirProgress + 1) * 8}px)`
                  }}
                >
                  <div className="absolute bottom-0 w-8 h-10 -left-2 bg-slate-300 rounded-b-full border border-slate-500" />
                </div>
              )}

              {/* Glass Cup Outer */}
              <div className="absolute inset-0 rounded-b-2xl border-4 border-slate-400/50 bg-slate-800/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden">
                <div className="absolute top-0 left-2 w-1.5 h-full bg-white/20 rounded-full" />

                {/* Water Liquid Fill */}
                <div className="absolute bottom-0 inset-x-0 h-[80%] bg-gradient-to-t from-blue-600/80 via-cyan-500/70 to-sky-400/60 p-2 flex flex-col justify-end items-center overflow-hidden">
                  
                  {/* Sugar Crystals (Fading out when dissolved) */}
                  <div
                    className="w-full h-full flex flex-wrap gap-1.5 items-end justify-center transition-opacity duration-500"
                    style={{ opacity: 1 - sugarDissolved }}
                  >
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-sky-100/90 rounded-sm shadow-[0_0_4px_#e0f2fe]"
                      />
                    ))}
                  </div>

                  {/* Soluble sparkle */}
                  {sugarDissolved > 0.8 && (
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-200 text-xs font-bold animate-pulse">
                      <Sparkles className="w-5 h-5 text-sky-200" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <span className="text-sm font-bold text-slate-200 block">2. Cốc Đường Kính</span>
              <span className="text-xs text-slate-400">Hạt đường trong suốt</span>
            </div>

            {/* Status */}
            {sugarDissolved > 0.5 ? (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> HÒA TAN HOÀN TOÀN
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-semibold">Chưa khuấy...</span>
            )}

            {/* Annotation */}
            {simState.showAnnotations && sugarDissolved > 0.5 && (
              <div className="text-xs font-bold bg-emerald-950/90 text-emerald-200 border border-emerald-400/50 px-3 py-1 rounded-lg text-center animate-in fade-in">
                🍬 Đường tan hoàn toàn thành vị ngọt
              </div>
            )}
          </div>

          {/* CUP 3: CÁT MỊN (SAND - INSOLUBLE) */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-52 flex items-end justify-center">
              {/* Stirring Spoon */}
              {(simState.isPlaying || simState.isStirred) && (
                <div
                  className="absolute top-2 w-4 h-36 bg-slate-300 rounded-full border border-slate-500 z-20 transition-transform origin-top"
                  style={{
                    transform: `rotate(${Math.sin(stirProgress + 2) * 15}deg) translateX(${Math.cos(stirProgress + 2) * 8}px)`
                  }}
                >
                  <div className="absolute bottom-0 w-8 h-10 -left-2 bg-slate-300 rounded-b-full border border-slate-500" />
                </div>
              )}

              {/* Glass Cup Outer */}
              <div className="absolute inset-0 rounded-b-2xl border-4 border-slate-400/50 bg-slate-800/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden">
                <div className="absolute top-0 left-2 w-1.5 h-full bg-white/20 rounded-full" />

                {/* Water Liquid Fill */}
                <div className="absolute bottom-0 inset-x-0 h-[80%] bg-gradient-to-t from-blue-600/80 via-cyan-500/70 to-sky-400/60 p-2 flex flex-col justify-end items-center overflow-hidden">
                  
                  {/* Sand granules - swirling during stir, settling down at bottom when paused */}
                  <div className={`w-full transition-all duration-700 flex flex-wrap gap-1 justify-center ${
                    sandSettled ? 'h-8 items-end bg-amber-800/80 rounded-b-lg border-t border-amber-600' : 'h-full items-center animate-pulse'
                  }`}>
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_2px_#f59e0b]"
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <span className="text-sm font-bold text-slate-200 block">3. Cốc Cát Mịn</span>
              <span className="text-xs text-slate-400">Hạt cát màu nâu sẫm</span>
            </div>

            {/* Status */}
            {simState.isStirred || simState.isPlaying ? (
              <span className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1">
                <XCircle className="w-4 h-4" /> KHÔNG HÒA TAN
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-semibold">Chưa khuấy...</span>
            )}

            {/* Annotation */}
            {simState.showAnnotations && (simState.isStirred || simState.isPlaying) && (
              <div className="text-xs font-bold bg-rose-950/90 text-rose-200 border border-rose-400/50 px-3 py-1 rounded-lg text-center animate-in fade-in">
                🏜️ Hạt cát lắng xuống đáy cốc
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Observation Summary Banner */}
      <div className="bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-500/40 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/30 shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wide">
              Kết luận từ quan sát:
            </h3>
            <p className="text-sm font-semibold text-white mt-0.5">
              Nước <strong className="text-emerald-300">hòa tan được một số chất</strong> (như muối, đường) và <strong className="text-rose-300">không hòa tan được một số chất</strong> (như cát, dầu ăn)!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
