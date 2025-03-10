'use client';

import { Download, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Pagination from '@/components/dashboard/Pagination';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/input';
import StatusBadge from '@/components/ui/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

interface Transaction {
  id: number;
  date: string;
  tagName: string;
  type: string;
  email: string;
  expiration: string;
  amount: string;
  status: string;
}

const transactionsData = [
  {
    id: 1,
    date: '18/01/25',
    tagName: '#EL MAHDANI Souhail',
    type: 'Premium',
    email: 'elmahdanisouhail@gmail.com',
    expiration: '31/01/25',
    amount: '€50.00',
    status: 'Active',
  },
  {
    id: 2,
    date: '18/01/25',
    tagName: '#Joe Wale',
    type: 'Beginner',
    email: 'Joe.Wale@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Active',
  },
  {
    id: 3,
    date: '18/01/25',
    tagName: '#Alan Rhodes',
    type: 'Premium',
    email: 'Rhodes.123@gmail.com',
    expiration: '31/01/25',
    amount: '€50.00',
    status: 'Active',
  },
  {
    id: 4,
    date: '18/01/25',
    tagName: '#John Smith',
    type: 'Beginner',
    email: 'John.smith02@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Active',
  },
  {
    id: 5,
    date: '18/01/25',
    tagName: '#John Smith',
    type: 'Beginner',
    email: 'John.smith02@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Active',
  },
  {
    id: 6,
    date: '18/01/25',
    tagName: '#Joe Wale',
    type: 'Beginner',
    email: 'Joe.Wale@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Active',
  },
  {
    id: 7,
    date: '18/01/25',
    tagName: '#Alan Rhodes',
    type: 'Premium',
    email: 'Rhodes.123@gmail.com',
    expiration: '31/01/25',
    amount: '€50.00',
    status: 'Active',
  },
  {
    id: 8,
    date: '18/01/25',
    tagName: '#John Smith',
    type: 'Beginner',
    email: 'John.smith02@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Pending',
  },
  {
    id: 9,
    date: '18/01/25',
    tagName: '#John Smith',
    type: 'Beginner',
    email: 'John.smith02@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Active',
  },
  {
    id: 10,
    date: '18/01/25',
    tagName: '#Joe Wale',
    type: 'Beginner',
    email: 'Joe.Wale@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Pending',
  },
  {
    id: 11,
    date: '18/01/25',
    tagName: '#Alan Rhodes',
    type: 'Premium',
    email: 'Rhodes.123@gmail.com',
    expiration: '31/01/25',
    amount: '€50.00',
    status: 'Cancelled',
  },
  {
    id: 12,
    date: '18/01/25',
    tagName: '#John Smith',
    type: 'Beginner',
    email: 'John.smith02@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
    status: 'Pending',
  },
];

export default function Dashboard() {
  const t = useTranslations('dashboardTranslation');

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [transactions, setTransactions] = useState(transactionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Function to fetch transactions (replace with real API call)
  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  const handleClickTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    console.log(selectedTransaction);
  };

  const handleRefresh = () => {
    console.log('Handle refresh transactions clicked');
  };

  return (
    <div className="flex h-screen bg-dark ">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-grow p-6 mt-5">
        <DashboardHeader
          title={t('dashboard_transactionHistory')}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onRefresh={handleRefresh}
        />

        <div className="bg-own-primary-5 border border-gray-700 rounded-lg p-6">
          {selectedTransaction && (
            <div className="bg-own-primary-5  rounded-lg p-6">
              <button className="flex items-center gap-1 mb-4 text-white" onClick={() => setSelectedTransaction(null)}>
                ← {t('dashboard_back')}
              </button>
            </div>
          )}
          {/* Filters */}
          <div className="flex justify-end items-center mb-4 gap-8">
            <div className="flex gap-2">
              <Input type="date" className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-900" />
              <Input type="date" className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-900" />
            </div>
            <Button
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 flex items-center gap-2"
            >
              <Download size={18} />
            </Button>
          </div>

          {/* Transaction Table */}
          <div className="overflow-hidden rounded-lg  ">
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <tr>
                    <TableHead className="p-3">{t('dashboard_date')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_tagName')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_type')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_email')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_expirationDate')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_amount')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_status')}</TableHead>
                    <TableHead className="p-3">{t('dashboard_action')}</TableHead>
                  </tr>
                </TableHeader>

                <TableBody className="text-gray-300">
                  {currentTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="">
                      <TableCell className="p-3 relative">{transaction.date}</TableCell>
                      <TableCell className="p-3 relative">{transaction.tagName}</TableCell>
                      <TableCell className="p-3 relative">{transaction.type}</TableCell>
                      <TableCell className="p-3 relative">{transaction.email}</TableCell>
                      <TableCell className="p-3 relative">{transaction.expiration}</TableCell>
                      <TableCell className="p-3 relative">{transaction.amount}</TableCell>
                      <TableCell className="p-3 relative">
                        <StatusBadge status={transaction.status} />
                      </TableCell>

                      <TableCell className="p-3 relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="p-0.5 rounded bg-green-1000 border border-gray-300 hover:bg-gray-600 h-6 w-6"
                            >
                              <MoreHorizontal size={12} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border  rounded-md shadow-lg text-xs">
                            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 cursor-pointer px-2 py-2  ">
                              <Download size={16} className="text-gray-300" /> {t('dashboard_downloadPdf')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 text-red-500 cursor-pointer px-2 py-2">
                              <Trash2 size={16} /> {t('dashboard_delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="md:hidden">
              {selectedTransaction ? (
                <div className="bg-own-primary-5 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_date')}:</span>
                      <span>{selectedTransaction.date}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_tagName')}:</span>
                      <span>{selectedTransaction.tagName}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_type')}:</span>
                      <span>{selectedTransaction.type}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_email')}:</span>
                      <span>{selectedTransaction.email}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_expirationDate')}:</span>
                      <span>{selectedTransaction.expiration}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_amount')}:</span>
                      <span>{selectedTransaction.amount}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_status')}:</span>
                      <StatusBadge status={selectedTransaction.status} />
                    </div>
                    <hr className="border-gray-700" />

                    <div className="flex justify-between">
                      <span className="font-semibold">{t('dashboard_action')}:</span>

                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="p-0.5 rounded bg-green-1000 border border-gray-300 hover:bg-gray-600 h-6 w-6"
                            >
                              <MoreHorizontal size={12} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border  rounded-md shadow-lg text-xs">
                            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 cursor-pointer px-2 py-2  ">
                              <Download size={16} className="text-gray-300" /> {t('dashboard_downloadPdf')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 text-red-500 cursor-pointer px-2 py-2">
                              <Trash2 size={16} /> {t('dashboard_delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    </div>
                    <hr className="border-gray-700" />
                  </div>
                </div>
              ) : (
                // Simplified rows (Mobile)
                <div className="space-y-2">
                  {currentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-[#182915] rounded-md p-3 cursor-pointer"
                      onClick={() => handleClickTransaction(transaction)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm font-semibold">{transaction.tagName}</div>
                          <div className="text-xs text-gray-400">{transaction.type}</div>
                        </div>
                        <div className="text-xs text-gray-400">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!selectedTransaction && (
            <>
              {/* Pagination */}
              <Pagination
                totalTransactions={transactions.length}
                transactionsPerPage={transactionsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
