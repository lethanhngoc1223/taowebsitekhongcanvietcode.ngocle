import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

interface BackgroundAudioProps {
  className?: string;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Pleasant background volume level
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play failed or blocked by browser:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Invisible HTML5 Audio Tag */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/Nhạc.mp3" type="audio/mpeg" />
        <source src="/Nhạc nền.mp3" type="audio/mpeg" />
        <source src="Nhạc.mp3" type="audio/mpeg" />
        <source src="Nhạc nền.mp3" type="audio/mpeg" />
      </audio>

      {/* Main Music Control Button */}
      <button
        onClick={togglePlay}
        className={`px-3.5 py-2 rounded-2xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
          isPlaying
            ? 'bg-sky-500 text-white border-b-4 border-sky-700 shadow-md animate-pulse'
            : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border-2 border-sky-300'
        }`}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền bài học'}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'text-white animate-bounce' : 'text-sky-600'}`} />
        <span>{isPlaying ? 'Nhạc nền: BẬT' : 'Bật Nhạc'}</span>

        {/* Quick Mute button when playing */}
        {isPlaying && (
          <span
            onClick={toggleMute}
            className="p-1 hover:bg-sky-600 rounded-lg transition-colors ml-0.5"
            title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </span>
        )}
      </button>
    </div>
  );
};
