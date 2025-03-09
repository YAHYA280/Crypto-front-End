'use client';

import { Download, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Pagination from '@/components/dashboard/Pagination';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/input';
import StatusBadge from '@/components/ui/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

const transactionsData = [
  {
    id: 1,
    date: '18/01/25',
    tagName: '#John Smith',
    type: 'Beginner',
    email: 'John.smith02@gmail.com',
    expiration: '31/01/25',
    amount: '€20.00',
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
    status: 'Pending',
  },
  {
    id: 3,
    date: '18/01/25',
    tagName: '#Alan Rhodes',
    type: 'Premium',
    email: 'Rhodes.123@gmail.com',
    expiration: '31/01/25',
    amount: '€50.00',
    status: 'Cancelled',
  },
  {
    id: 4,
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
  const [transactions] = useState(transactionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Function to fetch transactions (replace with real API call)
  // const fetchTransactions = async () => {
  //   const response = await fetch('/api/transactions');
  //   const data = await response.json();
  //   setTransactions(data);
  // };

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar />
      <div className="flex flex-col flex-grow p-6">
        <DashboardHeader title="Transaction History" />

        <div className="bg-own-primary-5 border border-gray-700 rounded-lg p-6">
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
            <Table>
              <TableHeader className="bg-green-900 text-white">
                <TableRow>
                  <TableHead className="p-3">Date</TableHead>
                  <TableHead className="p-3">Tag Name</TableHead>
                  <TableHead className="p-3">Type</TableHead>
                  <TableHead className="p-3">Email</TableHead>
                  <TableHead className="p-3">Expiration</TableHead>
                  <TableHead className="p-3">Amount</TableHead>
                  <TableHead className="p-3">Status</TableHead>
                  <TableHead className="p-3">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="bg-green-1000 text-gray-300">
                {currentTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-b border-black">
                    <TableCell className="p-3">{transaction.date}</TableCell>
                    <TableCell className="p-3">{transaction.tagName}</TableCell>
                    <TableCell className="p-3">{transaction.type}</TableCell>
                    <TableCell className="p-3">{transaction.email}</TableCell>
                    <TableCell className="p-3">{transaction.expiration}</TableCell>
                    <TableCell className="p-3">{transaction.amount}</TableCell>
                    <TableCell className="p-3">
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
                            <Download size={16} className="text-gray-300" /> Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700 text-red-500 cursor-pointer px-2 py-2">
                            <Trash2 size={16} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination
            totalTransactions={transactions.length}
            transactionsPerPage={transactionsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
