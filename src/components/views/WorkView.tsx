import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../data/projects';
import { HairlineDivider } from '../ui/HairlineDivider';
import { TextReveal } from '../ui/TextReveal';
import { ArrowUpRight, Grid, List, Clock } from 'lucide-react';

interface WorkViewProps {
  onHoverProject: (p: Project | null) => void;
  onSelectProject: (p: Project) => void;
  accentHex: string;
}

export const WorkView: React.FC<WorkViewProps> = ({
  onHoverProject,
  onSelectProject,
  accentHex,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const categories = ['all', 'Brand Identity', 'Web Experience', 'Design System', 'Product'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return (
      p.discipline.toLowerCase().includes(filter.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          INDEX / ALL COMMISSIONS
        </div>
        <TextReveal>
          <h1 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight">
            SELECTED WORK (2024—2026)
          </h1>
        </TextReveal>
        <p className="font-sans text-lg opacity-80 max-w-2xl leading-relaxed">
          A curated archive of brand systems, custom digital flagships, and interaction engines built for international founders and teams.
        </p>
      </div>

      {/* Filter & View Mode Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-hairline font-mono-data text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="opacity-50 uppercase tracking-widest mr-2">FILTER:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                filter === cat
                  ? 'bg-[var(--text-ink)] text-[var(--bg-paper)] font-bold'
                  : 'border border-hairline hover:border-current opacity-70 hover:opacity-100'
              }`}
            >
              {cat === 'all' ? 'ALL PROJECTS (6)' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 border border-hairline p-1 rounded">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-black/10 dark:bg-white/10' : 'opacity-50'}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-black/10 dark:bg-white/10' : 'opacity-50'}`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === 'list' ? (
        <div className="space-y-0">
          <HairlineDivider />
          {filteredProjects.map((project, idx) => (
            <React.Fragment key={project.id}>
              <div
                onMouseEnter={() => onHoverProject(project)}
                onMouseLeave={() => onHoverProject(null)}
                onClick={() => onSelectProject(project)}
                tabIndex={0}
                role="button"
                className="group py-8 sm:py-10 px-4 sm:px-6 transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 space-y-1">
                    <div className="flex items-baseline space-x-3">
                      <span className="font-mono-data text-xs opacity-40">0{idx + 1}</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight group-hover:translate-x-2 transition-transform">
                        {project.title}
                      </h3>
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

                  <div className="md:col-span-4 space-y-1">
                    <p className="text-xs sm:text-sm opacity-80">{project.summary}</p>
                    <div className="text-[11px] font-mono-data opacity-50 uppercase tracking-wider">
                      {project.discipline}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end">
                    <div
                      className="p-2 rounded-full border border-hairline group-hover:border-current"
                      style={{ color: accentHex }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              <HairlineDivider />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group border border-hairline rounded overflow-hidden cursor-pointer bg-black/[0.01] dark:bg-white/[0.01] hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[16/10] bg-neutral-900 overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between font-mono-data text-xs opacity-60">
                  <span>{project.client} — {project.year}</span>
                  {project.readTime && (
                    <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded border border-hairline bg-black/5 dark:bg-white/5 opacity-80">
                      <Clock className="w-2.5 h-2.5 opacity-70" />
                      <span>{project.readTime}</span>
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs opacity-80 line-clamp-2">{project.summary}</p>

                <div className="pt-2 flex items-center justify-between text-xs font-mono-data uppercase tracking-wider font-semibold" style={{ color: accentHex }}>
                  <span>READ CASE STUDY</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
