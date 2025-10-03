import React from 'react';

interface Column {
  key: string;
  title: string;
}

interface SimpleTableProps {
  columns?: Column[];
  data?: Record<string, any>[];
}

export function SimpleTable({ columns = [], data = [] }: SimpleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            {columns.map((c) => (
              <th
                key={c.key}
                className="py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300"
                >
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
