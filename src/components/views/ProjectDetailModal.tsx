import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../data/projects';
import { X, ArrowLeft, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { HairlineDivider } from '../ui/HairlineDivider';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  accentHex: string;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  accentHex,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !project) return;

    // Reset scroll to top on project change
    container.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setReadingProgress(0);

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
        setReadingProgress(progress);
      } else {
        setReadingProgress(0);
      }
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [project?.id]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const totalProjects = PROJECTS.length;
  const prevProject = PROJECTS[(currentIndex - 1 + totalProjects) % totalProjects];
  const nextProject = PROJECTS[(currentIndex + 1) % totalProjects];

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-0 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-5xl bg-[var(--bg-paper)] text-[var(--text-ink)] min-h-screen sm:min-h-0 rounded-none sm:rounded-sm shadow-2xl border-x sm:border border-hairline overflow-hidden my-0 sm:my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close & Navigation Header Bar */}
        <div className="sticky top-0 z-30 bg-[var(--bg-paper)]/95 backdrop-blur-md border-b border-hairline flex flex-col">
          {/* Top Reading Progress Bar */}
          <div className="w-full h-1 bg-black/5 dark:bg-white/5 overflow-hidden">
            <div
              className="h-full transition-all duration-75 ease-out"
              style={{
                width: `${readingProgress}%`,
                backgroundColor: project.accentHex || accentHex,
              }}
            />
          </div>

          <div className="px-6 py-3.5 flex items-center justify-between">
            <div className="font-mono-data text-xs uppercase tracking-widest opacity-60 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentHex || accentHex }} />
              <span>CASE STUDY {String(currentIndex + 1).padStart(2, '0')}/{String(totalProjects).padStart(2, '0')} — {project.client}</span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Quick Header Prev/Next Flow */}
              <div className="flex items-center space-x-1 border border-hairline rounded-full p-1 bg-black/5 dark:bg-white/5 mr-2">
                <button
                  onClick={() => onSelectProject(prevProject)}
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  title={`Previous: ${prevProject.title}`}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono-data text-[10px] px-1 opacity-60">
                  {currentIndex + 1}/{totalProjects}
                </span>
                <button
                  onClick={() => onSelectProject(nextProject)}
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  title={`Next: ${nextProject.title}`}
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Case Study Body */}
        <div className="p-6 sm:p-12 space-y-12">
          {/* Title Header */}
          <div className="space-y-4">
            <div className="text-xs font-mono-data uppercase tracking-widest opacity-50 flex items-center space-x-3">
              <span>{project.year} • {project.discipline}</span>
              {project.readTime && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded border border-hairline font-semibold opacity-90 bg-black/5 dark:bg-white/5">
                  <Clock className="w-3 h-3 opacity-70" />
                  <span>{project.readTime}</span>
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight">
              {project.title}
            </h1>
            <p className="font-sans text-xl sm:text-2xl font-light opacity-90 max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 p-6 border border-hairline rounded bg-black/[0.015] dark:bg-white/[0.015] font-mono-data text-xs">
            <div>
              <div className="opacity-50 uppercase tracking-widest mb-1">CLIENT</div>
              <div className="font-semibold">{project.client}</div>
            </div>
            <div>
              <div className="opacity-50 uppercase tracking-widest mb-1">YEAR</div>
              <div>{project.year}</div>
            </div>
            <div>
              <div className="opacity-50 uppercase tracking-widest mb-1">READ DEPTH</div>
              <div className="font-semibold">{project.readTime || '4 MIN READ'}</div>
            </div>
            <div>
              <div className="opacity-50 uppercase tracking-widest mb-1">SERVICES</div>
              <div>{project.discipline}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="opacity-50 uppercase tracking-widest mb-1">OUTCOME</div>
              <div className="text-emerald-500 font-semibold">{project.outcome}</div>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="aspect-[16/9] w-full bg-neutral-900 rounded overflow-hidden border border-hairline">
            <img
              src={project.heroImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 text-xs font-mono-data uppercase tracking-widest opacity-50">
              THE DESIGN BRIEF &amp; EXECUTION
            </div>
            <div className="md:col-span-8 space-y-6 font-sans text-base leading-relaxed opacity-90">
              <p>{project.description}</p>
              
              <div className="space-y-2 pt-2">
                <div className="font-mono-data text-xs font-bold uppercase tracking-widest opacity-60">
                  KEY DELIVERABLES &amp; TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded border border-hairline font-mono-data text-xs uppercase tracking-wider bg-black/[0.02] dark:bg-white/[0.02]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Gallery Images */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-6">
              <div className="font-mono-data text-xs uppercase tracking-widest opacity-50">
                GALLERY ARCHIVE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.galleryImages.map((imgUrl, i) => (
                  <div key={i} className="aspect-[4/3] rounded overflow-hidden border border-hairline bg-neutral-900">
                    <img
                      src={imgUrl}
                      alt={`${project.title} gallery frame ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Quote Callout */}
          {project.clientQuote && (
            <div className="p-8 border border-hairline rounded bg-black/[0.02] dark:bg-white/[0.02] space-y-4">
              <blockquote className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight leading-snug">
                &ldquo;{project.clientQuote.text}&rdquo;
              </blockquote>
              <div className="font-mono-data text-xs uppercase tracking-widest opacity-70">
                — {project.clientQuote.author}, {project.clientQuote.title}
              </div>
            </div>
          )}

          <HairlineDivider />

          {/* Next / Prev Project Navigator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-data uppercase tracking-widest opacity-50">
              <span>CONTINUE EXPLORING ARCHIVE</span>
              <span>PROJECT {String(currentIndex + 1).padStart(2, '0')} OF {String(totalProjects).padStart(2, '0')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-data text-xs">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="p-5 rounded border border-hairline text-left hover:bg-black/5 dark:hover:bg-white/5 hover:border-current transition-all space-y-2 group"
              >
                <div className="opacity-50 uppercase tracking-widest flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>PREVIOUS CASE STUDY</span>
                  </span>
                  {prevProject.readTime && (
                    <span className="text-[10px] opacity-80 px-1.5 py-0.5 rounded border border-hairline bg-black/5 dark:bg-white/5">
                      {prevProject.readTime}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider group-hover:underline">
                    {prevProject.title}
                  </div>
                  <div className="text-[11px] opacity-60 mt-0.5">
                    {prevProject.client} — {prevProject.year}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectProject(nextProject)}
                className="p-5 rounded border border-hairline text-right hover:bg-black/5 dark:hover:bg-white/5 hover:border-current transition-all space-y-2 group"
              >
                <div className="opacity-50 uppercase tracking-widest flex items-center justify-between">
                  {nextProject.readTime && (
                    <span className="text-[10px] opacity-80 px-1.5 py-0.5 rounded border border-hairline bg-black/5 dark:bg-white/5">
                      {nextProject.readTime}
                    </span>
                  )}
                  <span className="flex items-center space-x-1 ml-auto">
                    <span>NEXT CASE STUDY</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <div>
                  <div className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider group-hover:underline">
                    {nextProject.title}
                  </div>
                  <div className="text-[11px] opacity-60 mt-0.5">
                    {nextProject.client} — {nextProject.year}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
