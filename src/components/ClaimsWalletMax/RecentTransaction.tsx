import React from 'react';

interface Transaction {
  date: string;
  description: string;
  amount: string;
  status: string;
  method: string;
}

export const RecentTransactions = ({ transactions }: { transactions: Transaction[] }) => (
  <div className="max-w-5xl mx-auto mb-16">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4">Date</th>
              <th className="text-left py-4 px-4">Description</th>
              <th className="text-left py-4 px-4">Amount</th>
              <th className="text-left py-4 px-4">Status</th>
              <th className="text-left py-4 px-4">Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-4 px-4">{tx.date}</td>
                <td className="py-4 px-4">{tx.description}</td>
                <td className="py-4 px-4">{tx.amount}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 px-4">{tx.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
