import React from 'react';
import Badge from './Badge';

export const PageHero = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  children,
  align = 'center',
}) => {
  const alignmentClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className="relative pt-12 pb-10 md:pt-16 md:pb-14 border-b border-slate-200/60 bg-gradient-to-b from-white via-brand-50/20 to-slate-50 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-r from-emerald-100/40 via-brand-100/30 to-teal-100/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col max-w-3xl ${alignmentClass}`}>
          {badge && (
            <Badge variant="primary" icon={badgeIcon} className="mb-4">
              {badge}
            </Badge>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance max-w-2xl">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-6 w-full">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
