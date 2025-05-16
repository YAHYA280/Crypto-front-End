'use client';

import Cookies from 'js-cookie';
import { Download, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Pagination from '@/components/dashboard/Pagination';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/input';
import StatusBadge from '@/components/ui/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

// API Transaction interface to match the API response
interface ApiTransaction {
  id: number;
  updated_at: string | null;
  created_at: string;
  subscriptionId: string | null;
  clientId: number;
  plan: string;
  months: number | null;
  status: string | null;
  startDate: string;
  endDate: string | null;
  amount: string;
  paymentId: string | null;
}

// Display Transaction interface for UI
interface DisplayTransaction {
  id: number;
  date: string;
  tagName: string;
  type: string;
  email: string;
  expiration: string;
  amount: string;
  status: string;
}

export default function Dashboard() {
  const t = useTranslations('dashboardTranslation');

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<DisplayTransaction | null>(null);
  const [transactions, setTransactions] = useState<DisplayTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const transactionsPerPage = 8;

  // Helper function to get all the cookies
  const getAllCookies = () => {
    const cookies: Record<string, string> = {};
    const cookieString = document.cookie;

    if (cookieString) {
      const cookiePairs = cookieString.split(';');
      cookiePairs.forEach((pair) => {
        const [key, value] = pair.trim().split('=');
        cookies[key] = value;
      });
    }

    return cookies;
  };

  // Fetch transactions from the subscription endpoint
  const fetchTransactions = async (page = 1, limit = transactionsPerPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      // Get session token and ensure it's included in cookies
      const sessionToken = Cookies.get('session_token');

      if (!sessionToken) {
        setError('No authentication token found. Please log in again.');
        setIsLoading(false);
        return;
      }

      // Ensure session token is in cookies
      Cookies.set('session_token', sessionToken, { path: '/' });

      console.log('All cookies:', getAllCookies());
      console.log('Session token:', sessionToken);

      // Construct the API URL
      const url = `${apiUrl}/subscription?page=${page}&limit=${limit}`;
      console.log('Request URL:', url);

      // Set up fetch request with credentials included
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // This is critical for including cookies in cross-origin requests
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      // Log response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Response headers:', responseHeaders);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication error. Please try refreshing the page or login again.');
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response data structure:', Object.keys(data));

      if (!data.result || !Array.isArray(data.result)) {
        console.error('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }

      const formattedTransactions: DisplayTransaction[] = data.result.map((item: ApiTransaction) => ({
        id: item.id,
        date: new Date(item.created_at).toLocaleDateString(),
        tagName: item.plan,
        type: item.subscriptionId ? 'Subscription' : 'One-time',
        email: `Client #${item.clientId}`,
        expiration: item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A',
        amount: `$${parseFloat(item.amount || '0').toFixed(2)}`,
        status: item.status || (parseFloat(item.amount || '0') === 0 ? 'Free' : 'Completed'),
      }));

      console.log('Transactions processed:', formattedTransactions.length);
      setTransactions(formattedTransactions);
      setTotalCount(data.count || formattedTransactions.length);
    } catch (error: any) {
      console.error('Failed to fetch transactions:', error);
      setError(error.message || 'Failed to fetch transactions. Please try again.');
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for normal operation
  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  // Use the transactions directly from the API
  const currentTransactions = transactions;

  const handleClickTransaction = (transaction: DisplayTransaction) => {
    setSelectedTransaction(transaction);
  };

  const handleRefresh = () => {
    fetchTransactions(currentPage);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedTransaction(null); // Reset selected transaction when changing page
  };

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-grow p-2 md:p-6 mt-2 md:mt-5 overflow-y-auto">
        <DashboardHeader
          title={t('dashboard_transactionHistory')}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onRefresh={handleRefresh}
        />

        <div className="bg-own-primary-5 border border-gray-700 rounded-lg p-3 md:p-6">
          {selectedTransaction && (
            <div className="bg-own-primary-5 rounded-lg pb-4">
              <button
                className="flex items-center gap-1 mb-4 text-white hover:text-gray-300 transition text-sm md:text-base"
                onClick={() => setSelectedTransaction(null)}
              >
                ← {t('dashboard_back')}
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:justify-end items-center mb-4 gap-3">
            <div className="flex gap-2 w-full md:w-auto flex-col md:flex-row">
              <Input
                type="date"
                className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-900 w-full md:w-auto text-sm"
                placeholder="Start date"
              />
              <Input
                type="date"
                className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-900 w-full md:w-auto text-sm"
                placeholder="End date"
              />
            </div>
            <Button
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 flex items-center gap-2 w-full md:w-auto text-sm"
            >
              <Download size={16} />
              <span>Download</span>
            </Button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Error message */}
          {error && !isLoading && (
            <div className="flex justify-center items-center py-6 text-red-400 text-center px-3">
              <div>
                <p className="font-semibold mb-2 text-sm md:text-base">Error loading data</p>
                <p className="text-xs md:text-sm">{error}</p>
                <Button
                  onClick={handleRefresh}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Transaction Table */}
          {!isLoading && !error && (
            <div className="overflow-hidden rounded-lg">
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
                    {currentTransactions.length > 0 ? (
                      currentTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-gray-800/50">
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
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-800 border rounded-md shadow-lg text-xs"
                              >
                                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 cursor-pointer px-2 py-2">
                                  <Download size={16} className="text-gray-300" /> {t('dashboard_downloadPdf')}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 text-red-500 cursor-pointer px-2 py-2">
                                  <Trash2 size={16} /> {t('dashboard_delete')}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                {selectedTransaction ? (
                  <div className="bg-own-primary-5 p-3 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{t('dashboard_date')}:</span>
                        <span className="text-sm">{selectedTransaction.date}</span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm mt-1">{t('dashboard_tagName')}:</span>
                        <span className="text-right max-w-40 break-words text-sm">{selectedTransaction.tagName}</span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{t('dashboard_type')}:</span>
                        <span className="text-sm">{selectedTransaction.type}</span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm mt-1">{t('dashboard_email')}:</span>
                        <span className="text-right max-w-40 break-words text-sm">{selectedTransaction.email}</span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{t('dashboard_expirationDate')}:</span>
                        <span className="text-sm">{selectedTransaction.expiration}</span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{t('dashboard_amount')}:</span>
                        <span className="text-sm">{selectedTransaction.amount}</span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{t('dashboard_status')}:</span>
                        <StatusBadge status={selectedTransaction.status} />
                      </div>
                      <hr className="border-gray-700" />

                      <div className="flex justify-between items-center pt-1">
                        <span className="font-semibold text-sm">{t('dashboard_action')}:</span>
                        <div className="flex gap-2">
                          <Button
                            className="p-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 rounded-md text-xs"
                            onClick={() => {
                              /* Download logic */
                            }}
                          >
                            <Download size={14} className="text-white" />
                            <span>PDF</span>
                          </Button>
                          <Button
                            className="p-2 flex items-center gap-1 bg-red-600 hover:bg-red-700 rounded-md text-xs"
                            onClick={() => {
                              /* Delete logic */
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Simplified rows (Mobile)
                  <div className="space-y-2">
                    {currentTransactions.length > 0 ? (
                      currentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="bg-[#182915] rounded-md p-3 cursor-pointer hover:bg-[#1d321a] transition border border-gray-800/50"
                          onClick={() => handleClickTransaction(transaction)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-sm font-semibold truncate">{transaction.tagName}</div>
                              <div className="text-xs text-gray-400 flex justify-between mt-1">
                                <span>{transaction.type}</span>
                                <span>{transaction.amount}</span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-400">{transaction.date}</span>
                                <StatusBadge status={transaction.status} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-sm">No transactions found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {!selectedTransaction && !isLoading && !error && transactions.length > 0 && (
            <>
              {/* Pagination */}
              <div className="mt-4">
                <Pagination
                  totalTransactions={totalCount}
                  transactionsPerPage={transactionsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
