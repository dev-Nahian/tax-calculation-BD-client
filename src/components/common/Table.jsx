import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Table = ({
  columns = [],
  data = [],
  keyField = 'id',
  striped = false,
  hover = true,
  emptyMessage = 'No data available',
  className = '',
}) => {
  return (
    <div className={twMerge('w-full overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm', className)}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-600">
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={clsx(
                  'py-3.5 px-4 font-semibold text-slate-700',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                  col.headerClassName
                )}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-sm text-slate-400 italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row[keyField] || rowIdx}
                className={clsx(
                  'transition-colors',
                  striped && rowIdx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white',
                  hover && 'hover:bg-brand-50/30'
                )}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key || colIdx}
                    className={clsx(
                      'py-3 px-4 text-sm',
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                      col.cellClassName
                    )}
                  >
                    {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
