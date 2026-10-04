import React, { useEffect, useRef, useState } from 'react';
import { SimulationState } from '../../types';
import { CheckCircle, Info, Sparkles } from 'lucide-react';

interface ShapeSimulationProps {
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
}

export const ShapeSimulation: React.FC<ShapeSimulationProps> = ({
  simState,
  setSimState
}) => {
  const [fillLevels, setFillLevels] = useState<{ cup: number; bowl: number; bottle: number }>({
    cup: 0,
    bowl: 0,
    bottle: 0
  });
  const [activePour, setActivePour] = useState<'cup' | 'bowl' | 'bottle' | 'all' | null>(null);

  const requestRef = useRef<number | null>(null);

  // Animation loop when playing or pouring
  useEffect(() => {
    if (simState.isPlaying && !simState.isPaused) {
      const animate = () => {
        setFillLevels((prev) => {
          const speed = 0.008;
          let newCup = prev.cup;
          let newBowl = prev.bowl;
          let newBottle = prev.bottle;

          if (activePour === 'cup' || activePour === 'all' || simState.isPoured) {
            newCup = Math.min(1, newCup + speed);
          }
          if (activePour === 'bowl' || activePour === 'all' || simState.isPoured) {
            if (newCup >= 0.3 || activePour === 'bowl') {
              newBowl = Math.min(1, newBowl + speed);
            }
          }
          if (activePour === 'bottle' || activePour === 'all' || simState.isPoured) {
            if (newBowl >= 0.3 || activePour === 'bottle') {
              newBottle = Math.min(1, newBottle + speed);
            }
          }

          return { cup: newCup, bowl: newBowl, bottle: newBottle };
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
  }, [simState.isPlaying, simState.isPaused, simState.isPoured, activePour]);

  // Reset handler trigger from simState
  useEffect(() => {
    if (!simState.isPlaying && !simState.isPoured) {
      setFillLevels({ cup: 0, bowl: 0, bottle: 0 });
      setActivePour(null);
    }
  }, [simState.isPlaying, simState.isPoured]);

  const handleIndividualPour = (target: 'cup' | 'bowl' | 'bottle') => {
    setActivePour(target);
    setSimState((prev) => ({ ...prev, isPlaying: true, isPaused: false, isPoured: true }));
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white relative overflow-hidden rounded-3xl border-2 border-blue-200 shadow-xl">
      {/* Simulation Header banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-sky-50 p-3.5 rounded-2xl border-2 border-blue-200">
        <div>
          <h2 className="text-lg font-black font-heading text-blue-950 flex items-center gap-2">
            Thí nghiệm 1: Quan sát hình dạng của nước trong các vật chứa
          </h2>
          <p className="text-xs font-medium text-slate-700">
            Bấm nút <strong className="text-blue-700 font-bold">"Đổ nước"</strong> hoặc chọn từng vật chứa để quan sát mặt nước dâng lên.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleIndividualPour('cup')}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200 transition cursor-pointer"
          >
            Đổ vào Cốc
          </button>
          <button
            onClick={() => handleIndividualPour('bowl')}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200 transition cursor-pointer"
          >
            Đổ vào Bát
          </button>
          <button
            onClick={() => handleIndividualPour('bottle')}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200 transition cursor-pointer"
          >
            Đổ vào Chai
          </button>
        </div>
      </div>

      {/* Main Canvas / SVG Interactive Area */}
      <div className="relative flex-1 my-4 flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-2 border-blue-200 p-6 overflow-hidden min-h-[360px]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Pitcher Animation at Top */}
        {(simState.isPlaying || activePour) && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blue-900 bg-white px-4 py-1.5 rounded-full border-2 border-blue-300 text-xs font-bold animate-pulse z-20 shadow-md">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Đang rót nước từ bình chứa...</span>
          </div>
        )}

        {/* 3 Containers Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl z-10 items-end justify-items-center">
          
          {/* CONTAINER 1: CỐC THỦY TINH (Glass Cylindrical Cup) */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="relative w-36 h-52 flex items-end justify-center">
              {/* Pitcher Stream for Cup */}
              {(activePour === 'cup' || (simState.isPoured && fillLevels.cup < 1)) && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-blue-400 to-blue-600 h-28 rounded-full animate-pulse z-20 shadow-md" />
              )}

              {/* Outer Glass Shell */}
              <div className="absolute inset-0 rounded-b-2xl border-4 border-slate-400/80 bg-white/40 backdrop-blur-sm shadow-md overflow-hidden">
                {/* Glass reflections */}
                <div className="absolute top-0 left-2 w-1.5 h-full bg-white/70 rounded-full" />
                <div className="absolute top-0 right-3 w-1 h-full bg-white/50 rounded-full" />

                {/* Water Liquid Fill */}
                <div
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-600 via-sky-500 to-sky-400 transition-all duration-100 ease-out flex items-start justify-center shadow-md"
                  style={{ height: `${fillLevels.cup * 90}%` }}
                >
                  {/* Water Surface Wave */}
                  {fillLevels.cup > 0 && (
                    <div className="w-full h-3 bg-sky-200/80 rounded-full blur-[1px] animate-pulse -mt-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <span className="text-sm font-extrabold text-slate-800 block">1. Cốc thủy tinh</span>
              <span className="text-xs text-blue-700 font-bold">Hình trụ đứng</span>
            </div>

            {/* Annotation */}
            {simState.showAnnotations && fillLevels.cup > 0.1 && (
              <div className="text-xs font-bold bg-white text-blue-900 border-2 border-blue-300 px-3 py-1.5 rounded-xl shadow-md animate-in fade-in zoom-in text-center">
                🌊 Nước có hình trụ
              </div>
            )}
          </div>

          {/* CONTAINER 2: BÁT TRÒN (Round Shallow Bowl) */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="relative w-48 h-36 flex items-end justify-center">
              {/* Pitcher Stream for Bowl */}
              {(activePour === 'bowl' || (simState.isPoured && fillLevels.bowl < 1 && fillLevels.cup >= 0.3)) && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-2.5 bg-gradient-to-b from-blue-400 to-blue-600 h-28 rounded-full animate-pulse z-20 shadow-md" />
              )}

              {/* Outer Bowl Shell (Semi-hemispherical) */}
              <div className="absolute inset-0 rounded-b-[70px] border-4 border-slate-400/80 bg-white/40 backdrop-blur-sm overflow-hidden shadow-md">
                {/* Reflections */}
                <div className="absolute top-0 left-4 w-2 h-full bg-white/70 rounded-full rotate-12" />

                {/* Water Liquid Fill */}
                <div
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-600 via-sky-500 to-sky-400 transition-all duration-100 ease-out flex items-start justify-center shadow-md"
                  style={{ height: `${fillLevels.bowl * 85}%` }}
                >
                  {fillLevels.bowl > 0 && (
                    <div className="w-full h-3 bg-sky-200/80 rounded-full blur-[1px] animate-pulse -mt-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <span className="text-sm font-extrabold text-slate-800 block">2. Bát sứ tròn</span>
              <span className="text-xs text-blue-700 font-bold">Hình bán cầu xòe rộng</span>
            </div>

            {/* Annotation */}
            {simState.showAnnotations && fillLevels.bowl > 0.1 && (
              <div className="text-xs font-bold bg-white text-blue-900 border-2 border-blue-300 px-3 py-1.5 rounded-xl shadow-md animate-in fade-in zoom-in text-center">
                🥣 Nước có hình lòng bát
              </div>
            )}
          </div>

          {/* CONTAINER 3: CHAI THẮT EO (Tall Tapered Bottle) */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="relative w-28 h-56 flex items-end justify-center">
              {/* Pitcher Stream for Bottle */}
              {(activePour === 'bottle' || (simState.isPoured && fillLevels.bottle < 1 && fillLevels.bowl >= 0.3)) && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-blue-400 to-blue-600 h-24 rounded-full animate-pulse z-20 shadow-md" />
              )}

              {/* Outer Bottle Shell with Narrow Neck & Curved Waist */}
              <div className="relative w-full h-full flex flex-col items-center justify-end">
                {/* Neck */}
                <div className="w-12 h-10 border-t-4 border-x-4 border-slate-400/80 rounded-t-lg bg-white/30" />
                {/* Body */}
                <div className="w-full h-44 border-b-4 border-x-4 border-slate-400/80 rounded-b-3xl rounded-t-xl bg-white/40 backdrop-blur-sm overflow-hidden relative shadow-md">
                  {/* Reflections */}
                  <div className="absolute top-0 left-2 w-1.5 h-full bg-white/70 rounded-full" />

                  {/* Water Fill */}
                  <div
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-600 via-sky-500 to-sky-400 transition-all duration-100 ease-out flex items-start justify-center shadow-md"
                    style={{ height: `${fillLevels.bottle * 92}%` }}
                  >
                    {fillLevels.bottle > 0 && (
                      <div className="w-full h-2.5 bg-sky-200/80 rounded-full blur-[1px] animate-pulse -mt-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <span className="text-sm font-extrabold text-slate-800 block">3. Chai thắt eo</span>
              <span className="text-xs text-blue-700 font-bold">Đáy rộng, cổ hẹp</span>
            </div>

            {/* Annotation */}
            {simState.showAnnotations && fillLevels.bottle > 0.1 && (
              <div className="text-xs font-bold bg-white text-blue-900 border-2 border-blue-300 px-3 py-1.5 rounded-xl shadow-md animate-in fade-in zoom-in text-center">
                🏺 Nước có hình dáng chai
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Observation Summary Banner */}
      <div className="bg-sky-50 border-2 border-blue-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-sm shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-blue-900 uppercase tracking-wide">
              Kết luận từ quan sát:
            </h3>
            <p className="text-sm font-bold text-slate-800 mt-0.5">
              Nước là chất lỏng <strong className="text-blue-700">không có hình dạng nhất định</strong>. Nước luôn mang hình dạng của vật chứa nó!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
