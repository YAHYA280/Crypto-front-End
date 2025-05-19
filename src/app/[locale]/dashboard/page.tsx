'use client';

import Cookies from 'js-cookie';
import { Download, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Pagination from '@/components/dashboard/Pagination';
import Sidebar from '@/components/dashboard/Sidebar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  name: string;
  email: string;
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
  originalStatus: string; // Added for status badge styling
  originalType?: string; // Optional, for future use
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
  const transactionsPerPage = 10;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // State for date filters
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState(false);

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

  // Function to format status with first letter capitalized

  const formatStatus = (status: string): string => {
    // First, normalize the status to lowercase
    const normalizedStatus = status.toLowerCase();

    // Then use translations if available or capitalize first letter
    if (normalizedStatus === 'active') {
      return t('status_active');
    } else if (normalizedStatus === 'free') {
      return t('status_free');
    } else if (normalizedStatus === 'completed') {
      return t('status_completed');
    } else {
      // For any other status, just capitalize the first letter
      return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
    }
  };

  // Function to format type with proper translation
  const formatType = (type: string): string => {
    const normalizedType = type.toLowerCase();

    if (normalizedType === 'beginner') {
      return t('type_beginner');
    } else if (normalizedType === 'premium') {
      return t('type_premium');
    } else if (normalizedType === 'advanced' || normalizedType === 'gevorderd') {
      return t('type_advanced');
    } else {
      // For other types, just capitalize the first letter
      return normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1);
    }
  };

  // Function to download invoice PDF
  const downloadInvoice = async (transactionId: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const sessionToken = Cookies.get('session_token');

      if (!sessionToken) {
        console.error('No authentication token found');
        return;
      }

      const url = `${apiUrl}/subscription/invoice2/${transactionId}`;
      console.log('Download invoice URL:', url);

      // Create a hidden anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = `invoice-${transactionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
  };

  // Helper function to format dates for API
  const formatDateForAPI = (dateString: string) => {
    // Ensure we're sending the date in the correct format (YYYY-MM-DD)
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Function to fetch invoices by date range
  const fetchInvoicesByDateRange = async () => {
    if (!startDate || !endDate) {
      return; // Don't proceed if dates are not set
    }

    setIsFiltering(true);
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const sessionToken = Cookies.get('session_token');

      if (!sessionToken) {
        setError('No authentication token found. Please log in again.');
        setIsLoading(false);
        setIsFiltering(false);
        return;
      }

      // Validate that start date is before or equal to end date
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (startDateObj > endDateObj) {
        setError('Start date must be before or equal to end date');
        setIsLoading(false);
        setIsFiltering(false);
        return;
      }

      // Format dates properly for API
      const formattedStartDate = formatDateForAPI(startDate);
      const formattedEndDate = formatDateForAPI(endDate);

      // Use the date filter parameters directly in the API request
      const url = `${apiUrl}/subscription?start=${formattedStartDate}&end=${formattedEndDate}`;
      console.log('Filtering transactions URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication error. Please try refreshing the page or login again.');
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Filtered transactions data:', data);

      if (!data.result || !Array.isArray(data.result)) {
        console.error('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }

      // Format the transactions for display with the updated field mapping
      const formattedTransactions: DisplayTransaction[] = data.result.map((item: ApiTransaction) => {
        const status = item.status || (parseFloat(item.amount || '0') === 0 ? 'Free' : 'Completed');
        const normalizedStatus = status.toLowerCase();
        const type = item.plan || (item.subscriptionId ? 'Premium' : 'Beginner');
        const normalizedType = type.toLowerCase();

        return {
          id: item.id,
          date: new Date(item.created_at).toLocaleDateString(),
          tagName: item.name || `User #${item.clientId}`,
          type: formatType(type),
          email: item.email || `Client #${item.clientId}`,
          expiration: item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A',
          amount: `€${parseFloat(item.amount || '0').toFixed(2)}`,
          status: formatStatus(status),
          originalStatus: normalizedStatus, // Store original for the status badge styling
          originalType: normalizedType, // Store original for potential future use
        };
      });

      setTransactions(formattedTransactions);
      setTotalCount(data.count || formattedTransactions.length);
    } catch (error: any) {
      console.error('Failed to fetch filtered transactions:', error);
      setError(error.message || 'Failed to filter transactions. Please try again.');
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear filters and reset to normal view
  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setIsFiltering(false);
    fetchTransactions(currentPage);
  };

  // Download all invoices for the filtered date range
  const downloadFilteredInvoices = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates to download invoices');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const sessionToken = Cookies.get('session_token');

      if (!sessionToken) {
        setError('No authentication token found. Please log in again.');
        return;
      }

      // Validate that start date is before or equal to end date
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (startDateObj > endDateObj) {
        setError('Start date must be before or equal to end date');
        return;
      }

      // Format dates properly for API
      const formattedStartDate = formatDateForAPI(startDate);
      const formattedEndDate = formatDateForAPI(endDate);

      const url = `${apiUrl}/subscription/invoice?start=${formattedStartDate}&end=${formattedEndDate}`;
      console.log('Download invoices URL:', url);

      // Create a hidden anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = `invoices-${formattedStartDate}-to-${formattedEndDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error('Failed to download invoices:', error);
      setError(error.message || 'Failed to download invoices. Please try again.');
    }
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

      // Updated mapping to use new API fields
      const formattedTransactions: DisplayTransaction[] = data.result.map((item: ApiTransaction) => ({
        id: item.id,
        date: new Date(item.created_at).toLocaleDateString(),
        tagName: item.name || `User #${item.clientId}`,
        type: item.plan, // Now uses plan from API (e.g., "PREMIUM", "BEGINNER")
        email: item.email || `Client #${item.clientId}`, // Now uses actual email
        expiration: item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A',
        amount: `€${parseFloat(item.amount || '0').toFixed(2)}`,
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
    // Only fetch if we're not currently filtering by date
    if (!isFiltering) {
      fetchTransactions(currentPage);
    }
  }, [currentPage]);

  // Monitor isFiltering state and update data accordingly
  useEffect(() => {
    if (isFiltering && startDate && endDate) {
      fetchInvoicesByDateRange();
    }
  }, [isFiltering]);

  // Use the transactions directly from the API
  const currentTransactions = transactions;

  const handleClickTransaction = (transaction: DisplayTransaction) => {
    setSelectedTransaction(transaction);
  };

  const handleRefresh = () => {
    setError(null); // Clear any previous errors
    if (isFiltering && startDate && endDate) {
      fetchInvoicesByDateRange();
    } else {
      fetchTransactions(currentPage);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedTransaction(null); // Reset selected transaction when changing page
  };

  // Handle date input changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setError(null); // Clear any previous errors
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setError(null); // Clear any previous errors
  };

  // Apply date filters
  const handleApplyFilters = () => {
    if (startDate && endDate) {
      console.log('Applying filters for date range:', startDate, 'to', endDate);
      setIsFiltering(true);
    } else {
      setError('Please select both start and end dates');
    }
  };

  // fucntion to handle delete verification and execution

  const canDeleteSubscription = (transaction: DisplayTransaction) => {
    const status = transaction.status.toLowerCase();
    const isAdvanced = transaction.type.toLowerCase() === 'advanced' || transaction.type.toLowerCase() === 'gevorderd';

    const endDateIsValid = transaction.expiration && transaction.expiration !== 'N/A';
    const endDateExpired = endDateIsValid && new Date(transaction.expiration) < new Date();

    return status !== 'active' && !isAdvanced && endDateExpired;
  };

  const handleDeleteClick = (transaction: DisplayTransaction) => {
    if (canDeleteSubscription(transaction)) {
      setSubscriptionToDelete(transaction.id);
      setShowDeleteDialog(true);
      setDeleteError(null);
    } else {
      // Show error message explaining why it can't be deleted
      let errorMessage = t('dashboard_cantDelete');
      if (transaction.status.toLowerCase() === 'active') {
        errorMessage = t('dashboard_cantDeleteActive');
      } else if (transaction.type.toLowerCase() === 'advanced' || transaction.type.toLowerCase() === 'gevorderd') {
        errorMessage = t('dashboard_cantDeleteAdvanced');
      } else {
        errorMessage = t('dashboard_cantDeleteNotExpired');
      }
      setDeleteError(errorMessage);
      // Show the error for a few seconds
      setTimeout(() => setDeleteError(null), 5000);
    }
  };

  const executeDelete = async () => {
    if (!subscriptionToDelete) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const sessionToken = Cookies.get('session_token');

      if (!sessionToken) {
        setError('No authentication token found. Please log in again.');
        return;
      }

      console.log(`Attempting to delete subscription ID: ${subscriptionToDelete}`);
      console.log(`API URL: ${apiUrl}/subscription/${subscriptionToDelete}`);

      const response = await fetch(`${apiUrl}/subscription/${subscriptionToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        credentials: 'include',
      });

      console.log(`Delete response status: ${response.status}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Subscription not found. It may have been already deleted.');
        } else {
          // Try to get more details about the error
          const errorText = await response.text();
          console.error('Delete error details:', errorText);
          throw new Error(`Server returned ${response.status}: ${response.statusText || errorText}`);
        }
      }

      // Refresh the transaction list
      if (isFiltering && startDate && endDate) {
        fetchInvoicesByDateRange();
      } else {
        fetchTransactions(currentPage);
      }

      // Close the dialog and reset state
      setShowDeleteDialog(false);
      setSubscriptionToDelete(null);
    } catch (error: any) {
      console.error('Failed to delete subscription:', error);
      setDeleteError(error.message || 'Failed to delete subscription. Please try again.');
    }
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
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-3">
            <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row items-center">
              <div className="relative w-full md:w-auto">
                <label htmlFor="startDate" className="block text-xs text-gray-400 mb-1 ml-1">
                  {t('dashboard_startDate')}
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="bg-[#182915] text-white px-3 py-2 rounded-lg border border-gray-700 w-full md:w-auto text-sm focus:border-[#DDA909] focus:ring-1 focus:ring-[#DDA909] h-[45px]"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="relative w-full md:w-auto">
                <label htmlFor="endDate" className="block text-xs text-gray-400 mb-1 ml-1">
                  {t('dashboard_endDate')}
                </label>
                <Input
                  id="endDate"
                  type="date"
                  className="bg-[#182915] text-white px-3 py-2 rounded-lg border border-gray-700 w-full md:w-auto text-sm focus:border-[#DDA909] focus:ring-1 focus:ring-[#DDA909] h-[45px]"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="flex gap-2 mt-4 md:mt-6 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="bg-[#DDA909] hover:bg-[#B28700] text-white border-none px-3 py-2 flex items-center gap-2 w-full md:w-auto text-sm h-[45px]"
                  onClick={handleApplyFilters}
                  disabled={isLoading}
                >
                  {t('dashboard_applyFilters')}
                </Button>
                {(startDate || endDate) && (
                  <Button
                    variant="outline"
                    className="bg-[#4B6547] hover:bg-[#3D5138] text-white border-none px-3 py-2 flex items-center gap-2 w-full md:w-auto text-sm h-[45px]"
                    onClick={clearFilters}
                    disabled={isLoading}
                  >
                    {t('dashboard_clearFilters')}
                  </Button>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-[#182915] hover:bg-[#263D22] text-white px-4 py-2 flex items-center gap-2 w-full md:w-auto text-sm border border-gray-700 h-[45px] mt-2 md:mt-6"
              onClick={downloadFilteredInvoices}
              disabled={isLoading || !startDate || !endDate}
            >
              <Download size={16} />
              <span>{t('dashboard_downloadAll')}</span>
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
                            <StatusBadge
                              status={transaction.status}
                              originalStatus={transaction.status.toLowerCase()}
                            />
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
                                <DropdownMenuItem
                                  className="flex items-center gap-2 hover:bg-gray-700 cursor-pointer px-2 py-2"
                                  onClick={() => downloadInvoice(transaction.id)}
                                >
                                  <Download size={16} className="text-gray-300" /> {t('dashboard_downloadPdf')}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center gap-2 hover:bg-gray-700 text-red-500 cursor-pointer px-2 py-2"
                                  onClick={() => handleDeleteClick(transaction)}
                                >
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
                          {t('dashboard_transactionHistoryEmpty')}
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
                        <StatusBadge
                          status={selectedTransaction.status}
                          originalStatus={selectedTransaction.status.toLowerCase()}
                        />
                      </div>
                      <hr className="border-gray-700" />

                      <div className="flex justify-between items-center pt-1">
                        <span className="font-semibold text-sm">{t('dashboard_action')}:</span>
                        <div className="flex gap-2">
                          <Button
                            className="p-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 rounded-md text-xs"
                            onClick={() => downloadInvoice(selectedTransaction.id)}
                          >
                            <Download size={14} className="text-white" />
                            <span>PDF</span>
                          </Button>
                          <Button
                            className="p-2 flex items-center gap-1 bg-red-600 hover:bg-red-700 rounded-md text-xs"
                            onClick={() => handleDeleteClick(selectedTransaction)}
                          >
                            <Trash2 size={14} />
                            <span>{t('dashboard_delete')}</span>
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
                      <div className="text-center py-8 text-sm">{t('dashboard_transactionHistoryEmpty')}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {deleteError && (
            <div className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-md shadow-lg z-50 max-w-md">
              {deleteError}
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
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#091E06] border-[#a3a3a3] w-[90%] max-w-[480px] p-4 sm:p-6 rounded-xl mx-auto text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">{t('dashboard_confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">{t('dashboard_deleteWarning')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogCancel className="bg-[#182915] text-white border-gray-600 hover:bg-[#263D22]">
              {t('dashboard_cancel')}
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={executeDelete}>
              {t('dashboard_delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
