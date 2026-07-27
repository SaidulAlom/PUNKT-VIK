import React from 'react';
import { Project } from '../../types';
import { HairlineDivider } from '../ui/HairlineDivider';
import { TextReveal } from '../ui/TextReveal';
import { ArrowUpRight, Clock } from 'lucide-react';

interface ProjectListSectionProps {
  projects: Project[];
  onHoverProject: (p: Project | null) => void;
  onSelectProject: (p: Project) => void;
  accentHex: string;
}

export const ProjectListSection: React.FC<ProjectListSectionProps> = ({
  projects,
  onHoverProject,
  onSelectProject,
  accentHex,
}) => {
  return (
    <section className="py-20 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="text-xs font-mono-data uppercase tracking-widest opacity-50 mb-1">
            02 / SELECTED ARCHIVE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
            FEATURED CASE STUDIES
          </h2>
        </div>
        <div className="text-xs font-mono-data opacity-60 uppercase tracking-widest">
          SHOWING {projects.length} COMMISSIONS (2024—2026)
        </div>
      </div>

      {/* Vertically Stacked List */}
      <div className="space-y-0">
        <HairlineDivider />
        {projects.map((project, idx) => (
          <React.Fragment key={project.id}>
            <div
              onMouseEnter={() => onHoverProject(project)}
              onMouseLeave={() => onHoverProject(null)}
              onClick={() => onSelectProject(project)}
              tabIndex={0}
              role="button"
              aria-label={`View case study for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              className="group relative py-8 sm:py-12 px-4 sm:px-6 transition-colors duration-300 hover:bg-black/[0.025] dark:hover:bg-white/[0.025] cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Number & Title */}
                <div className="md:col-span-6 space-y-1">
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono-data text-xs opacity-40 font-semibold">
                      0{idx + 1}
                    </span>
                    <TextReveal>
                      <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                    </TextReveal>
                  </div>
                  <div className="flex items-center space-x-3 pl-8 font-mono-data text-xs opacity-60">
                    <span>{project.client} — {project.year}</span>
                    {project.readTime && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded border border-hairline text-[10px] uppercase font-semibold opacity-80 bg-black/5 dark:bg-white/5">
                        <Clock className="w-2.5 h-2.5 opacity-70" />
                        <span>{project.readTime}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: Short Description & Tags */}
                <div className="md:col-span-4 space-y-2">
                  <p className="text-xs sm:text-sm opacity-80 line-clamp-2 font-sans">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1 items-center">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded border border-hairline text-[10px] font-mono-data uppercase tracking-wider opacity-60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Micro Label & Arrow */}
                <div className="md:col-span-2 flex items-center justify-end space-x-2 font-mono-data text-xs uppercase tracking-wider">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline">
                    EXPLORE
                  </span>
                  <div
                    className="p-2 rounded-full border border-hairline group-hover:border-current transition-colors"
                    style={{ color: accentHex }}
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Mobile Fallback Image (shown on touch devices) */}
              <div className="mt-4 sm:hidden overflow-hidden rounded border border-hairline aspect-video bg-neutral-900">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <HairlineDivider />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
