import React, { useState, useEffect } from 'react';
import { SectionId, SimulationState } from './types';
import { Header } from './components/Header';
import { ControlToolbar } from './components/ControlToolbar';
import { TeacherScriptPanel } from './components/TeacherScriptPanel';
import { ShapeSimulation } from './components/simulations/ShapeSimulation';
import { FlowSimulation } from './components/simulations/FlowSimulation';
import { PermeabilitySimulation } from './components/simulations/PermeabilitySimulation';
import { SolubilitySimulation } from './components/simulations/SolubilitySimulation';
import { LifeApplicationsView } from './components/simulations/LifeApplicationsView';
import { ConclusionModal } from './components/ConclusionModal';
import { VideoModal } from './components/VideoModal';
import { BookOpen, Sparkles, Award, Video } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('shape');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showConclusionModal, setShowConclusionModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  const [simState, setSimState] = useState<SimulationState>({
    isPlaying: false,
    isPaused: false,
    isPoured: false,
    isStirred: false,
    showAnnotations: true,
    showTeacherScript: false,
    speed: 1
  });

  // Handle section switching - reset state
  const handleSelectSection = (id: SectionId) => {
    setActiveSection(id);
    setSimState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      isPoured: false,
      isStirred: false
    }));
  };

  // Keyboard navigation for classroom projector convenience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (simState.isPlaying && !simState.isPaused) {
          handlePause();
        } else {
          handlePlay();
        }
      } else if (e.code === 'KeyR') {
        handleReset();
      } else if (e.code === 'KeyT') {
        setSimState((prev) => ({ ...prev, showTeacherScript: !prev.showTeacherScript }));
      } else if (e.code === 'KeyA') {
        setSimState((prev) => ({ ...prev, showAnnotations: !prev.showAnnotations }));
      } else if (e.key >= '1' && e.key <= '5') {
        const sections: SectionId[] = ['shape', 'flow', 'permeability', 'solubility', 'applications'];
        const target = sections[parseInt(e.key) - 1];
        if (target) handleSelectSection(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [simState.isPlaying, simState.isPaused]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Fullscreen request error:', err);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Toolbar Actions
  const handlePlay = () => {
    setSimState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      isPoured: true
    }));
  };

  const handlePause = () => {
    setSimState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  const handleReset = () => {
    setSimState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      isPoured: false,
      isStirred: false
    }));
  };

  const handlePourWater = () => {
    setSimState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      isPoured: true
    }));
  };

  const handleStir = () => {
    setSimState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      isStirred: true
    }));
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col font-sans select-none antialiased">
      {/* Top Header & Navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={handleSelectSection}
        showTeacherScript={simState.showTeacherScript}
        setShowTeacherScript={(val) =>
          setSimState((prev) => ({
            ...prev,
            showTeacherScript: typeof val === 'function' ? val(prev.showTeacherScript) : val
          }))
        }
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        onOpenVideo={() => setShowVideoModal(true)}
      />

      {/* Main Classroom Projection Display Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-5 flex flex-col lg:flex-row gap-4 overflow-hidden relative">
        {/* Active Simulation Container */}
        <div className="flex-1 flex flex-col min-h-[500px]">
          {activeSection === 'shape' && (
            <ShapeSimulation simState={simState} setSimState={setSimState} />
          )}

          {activeSection === 'flow' && (
            <FlowSimulation simState={simState} setSimState={setSimState} />
          )}

          {activeSection === 'permeability' && (
            <PermeabilitySimulation simState={simState} setSimState={setSimState} />
          )}

          {activeSection === 'solubility' && (
            <SolubilitySimulation simState={simState} setSimState={setSimState} />
          )}

          {activeSection === 'applications' && <LifeApplicationsView />}

          {/* Quick Classroom Floating Banner for Conclusion & Video */}
          {activeSection !== 'applications' && (
            <div className="mt-3 flex flex-wrap items-center justify-between bg-white border-2 border-blue-200 px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 shadow-xs gap-2">
              <span className="text-slate-600">
                Phím tắt: <strong className="text-blue-700">Space</strong> (Bắt đầu/Tạm dừng) | <strong className="text-blue-700">R</strong> (Làm lại) | <strong className="text-blue-700">T</strong> (Lời dẫn) | <strong className="text-blue-700">1-5</strong> (Chuyển bài)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black flex items-center gap-1.5 transition cursor-pointer shadow-sm border-b-2 border-red-800"
                >
                  <Video className="w-4 h-4 text-white" />
                  <span>Video bài học</span>
                </button>
                <button
                  onClick={() => setShowConclusionModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black flex items-center gap-1.5 transition cursor-pointer shadow-sm border-b-2 border-amber-600"
                >
                  <Award className="w-4 h-4 text-amber-900" />
                  <span>Xem kết luận SGK</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible / Floating Teacher Script Panel */}
        <TeacherScriptPanel
          activeSection={activeSection}
          isOpen={simState.showTeacherScript}
          onClose={() => setSimState((prev) => ({ ...prev, showTeacherScript: false }))}
        />
      </main>

      {/* Bottom Control Toolbar - Large & Accessible */}
      <ControlToolbar
        activeSection={activeSection}
        simState={simState}
        setSimState={setSimState}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onPourWater={handlePourWater}
        onStir={handleStir}
      />

      {/* Scientific Conclusion Modal */}
      <ConclusionModal
        activeSection={activeSection}
        isOpen={showConclusionModal}
        onClose={() => setShowConclusionModal(false)}
      />

      {/* Embedded Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  );
}
