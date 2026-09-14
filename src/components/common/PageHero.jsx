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
    <div className="relative pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-14 border-b border-slate-200/60 bg-gradient-to-b from-white via-brand-50/20 to-slate-50 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-r from-emerald-100/40 via-brand-100/30 to-teal-100/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col max-w-3xl ${alignmentClass}`}>
          {badge && (
            <div className="w-full flex justify-center items-center mb-3 sm:mb-4 px-2">
              <Badge variant="primary" icon={badgeIcon} className="text-[11px] sm:text-xs px-3 py-1 max-w-full text-center leading-tight">
                {badge}
              </Badge>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight mb-3 sm:mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-balance max-w-2xl">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-5 sm:mt-6 w-full">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
