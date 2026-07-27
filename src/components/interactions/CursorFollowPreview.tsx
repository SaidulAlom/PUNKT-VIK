import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';

interface CursorFollowPreviewProps {
  activeProject: Project | null;
  mousePos: { x: number; y: number };
  isHoverSupported: boolean;
}

export const CursorFollowPreview: React.FC<CursorFollowPreviewProps> = ({
  activeProject,
  mousePos,
  isHoverSupported,
}) => {
  if (!isHoverSupported || !activeProject) return null;

  // Offset preview slightly so cursor is at top-left corner
  const offsetX = 24;
  const offsetY = 24;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300"
      style={{
        transform: `translate3d(${mousePos.x + offsetX}px, ${mousePos.y + offsetY}px, 0)`,
      }}
    >
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 overflow-hidden bg-[#111110] text-[#F2F1EE] border border-white/20 shadow-2xl p-2 rounded-sm"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
              <img
                src={activeProject.heroImage}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-[10px] font-mono-data uppercase tracking-wider text-white">
                {activeProject.year}
              </div>
            </div>

            <div className="p-2 space-y-1">
              <div className="flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider">
                <span>{activeProject.title}</span>
                <span style={{ color: activeProject.accentHex || '#D9A441' }}>↗</span>
              </div>
              <p className="text-[11px] text-white/70 line-clamp-1 font-mono-data">
                {activeProject.discipline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
