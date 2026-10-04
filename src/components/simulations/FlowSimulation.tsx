import React, { useEffect, useRef, useState } from 'react';
import { SimulationState } from '../../types';
import { ArrowDownRight, ArrowRight, ArrowLeft, Waves, CheckCircle, Sparkles } from 'lucide-react';

interface FlowSimulationProps {
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
}

export const FlowSimulation: React.FC<FlowSimulationProps> = ({
  simState,
  setSimState
}) => {
  const [flowProgress, setFlowProgress] = useState<number>(0); // 0 to 1 along slope
  const [spreadProgress, setSpreadProgress] = useState<number>(0); // 0 to 1 in tray

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (simState.isPlaying && !simState.isPaused) {
      const animate = () => {
        setFlowProgress((prevFlow) => {
          if (prevFlow < 1) {
            return Math.min(1, prevFlow + 0.015);
          } else {
            setSpreadProgress((prevSpread) => Math.min(1, prevSpread + 0.02));
            return 1;
          }
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
      setFlowProgress(0);
      setSpreadProgress(0);
    }
  }, [simState.isPlaying, simState.isPoured]);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-950 relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-heading text-cyan-300 flex items-center gap-2">
            Thí nghiệm 2: Quan sát hướng chảy và sự lan rộng của nước
          </h2>
          <p className="text-xs text-slate-300">
            Đổ nước lên đỉnh <strong className="text-amber-300">mặt phẳng nghiêng</strong> để xem nước chảy đi đâu và lan như thế nào.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/30">
            Mặt phẳng nghiêng &rarr; Khay chứa phẳng
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas Stage */}
      <div className="relative flex-1 my-4 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800/80 p-6 overflow-hidden min-h-[380px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Slope & Water Flow Diagram SVG */}
        <div className="relative w-full max-w-3xl h-[320px] flex items-center justify-center">
          <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-2xl">
            {/* Defs for gradients */}
            <defs>
              <linearGradient id="slopeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="waterStreamGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="trayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* 1. INCLINED PLANE (Mặt phẳng nghiêng) */}
            {/* Top-left: (120, 80) to Bottom-middle: (480, 280) */}
            <polygon
              points="100,80 480,280 480,310 100,310"
              fill="url(#slopeGrad)"
              stroke="#64748b"
              strokeWidth="4"
              rx="4"
            />
            {/* Surface Line */}
            <line x1="100" y1="80" x2="480" y2="280" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

            {/* Support Wooden/Metal Legs */}
            <line x1="120" y1="92" x2="120" y2="310" stroke="#475569" strokeWidth="8" strokeLinecap="round" />

            {/* 2. FLAT TRAY (Khay chứa ở đáy) */}
            {/* Tray Base: (420, 280) to (740, 280) */}
            <rect x="420" y="280" width="320" height="30" fill="url(#trayGrad)" stroke="#64748b" strokeWidth="3" rx="6" />

            {/* 3. WATER PITCHER AT TOP */}
            <g transform={`translate(${simState.isPlaying || flowProgress > 0 ? '110, 30' : '90, 20'}) rotate(${simState.isPlaying || flowProgress > 0 ? '-35' : '0'})`} className="transition-transform duration-500">
              {/* Pitcher Body */}
              <path d="M 0 0 L 30 0 L 25 50 L -5 50 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="3" />
              <path d="M -5 50 C 10 55, 20 55, 25 50" fill="none" stroke="#7dd3fc" strokeWidth="3" />
              <circle cx="-10" cy="20" r="12" fill="none" stroke="#7dd3fc" strokeWidth="3" />
            </g>

            {/* 4. WATER FLOW ALONG INCLINED SLOPE */}
            {flowProgress > 0 && (
              <path
                d={`M 120 90 L ${120 + flowProgress * 350} ${90 + flowProgress * 185}`}
                stroke="url(#waterStreamGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              />
            )}

            {/* Continuous dripping stream when active */}
            {flowProgress > 0 && flowProgress < 1 && (
              <circle
                cx={120 + flowProgress * 350}
                cy={90 + flowProgress * 185}
                r="8"
                fill="#e0f2fe"
                className="animate-ping"
              />
            )}

            {/* 5. WATER SPREADING IN TRAY */}
            {spreadProgress > 0 && (
              <g>
                {/* Spreading puddle in tray */}
                <ellipse
                  cx="580"
                  cy="290"
                  rx={Math.min(140, spreadProgress * 140)}
                  ry={Math.min(10, spreadProgress * 10)}
                  fill="#38bdf8"
                  fillOpacity="0.8"
                  stroke="#7dd3fc"
                  strokeWidth="2"
                  className="filter drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] transition-all"
                />

                {/* Concentric ripples */}
                <ellipse
                  cx="580"
                  cy="290"
                  rx={Math.min(120, spreadProgress * 120)}
                  ry={Math.min(8, spreadProgress * 8)}
                  fill="none"
                  stroke="#e0f2fe"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </g>
            )}

            {/* TEXT & SVG ANNOTATIONS */}
            <text x="130" y="50" fill="#cbd5e1" fontSize="14" fontWeight="bold">Mặt phẳng nghiêng (Cao)</text>
            <text x="580" y="340" fill="#cbd5e1" fontSize="14" fontWeight="bold" textAnchor="middle">Khay phẳng ở đáy (Thấp)</text>

          </svg>

          {/* OVERLAY ANNOTATION BADGES */}
          {simState.showAnnotations && flowProgress > 0.1 && (
            <div className="absolute top-24 left-1/3 -translate-x-1/2 bg-cyan-950/90 text-cyan-200 border border-cyan-400/60 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in zoom-in z-20">
              <ArrowDownRight className="w-5 h-5 text-cyan-400 animate-bounce" />
              <span className="text-xs font-bold">Nước chảy từ CAO xuống THẤP</span>
            </div>
          )}

          {simState.showAnnotations && spreadProgress > 0.2 && (
            <div className="absolute bottom-16 right-12 bg-blue-950/90 text-blue-200 border border-blue-400/60 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in zoom-in z-20">
              <div className="flex gap-1 text-cyan-300">
                <ArrowLeft className="w-4 h-4 animate-pulse" />
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-xs font-bold">Nước LAN RỘNG RA KHẮP MỌI PHÍA</span>
            </div>
          )}
        </div>
      </div>

      {/* Observation Summary Banner */}
      <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-cyan-950/90 border border-cyan-500/40 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30 shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-cyan-200 uppercase tracking-wide">
              Kết luận từ quan sát:
            </h3>
            <p className="text-sm font-semibold text-white mt-0.5">
              Nước chảy <strong className="text-amber-300">từ cao xuống thấp</strong> và <strong className="text-cyan-300">lan ra khắp mọi phía</strong> khi gặp mặt phẳng!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
