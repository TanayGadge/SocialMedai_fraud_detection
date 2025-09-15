import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Shield, Users, Activity } from 'lucide-react';
import { AccountCard } from './AccountCard';
import { AccountDetails } from './AccountDetails';
import { mockAccounts } from '../data/mockData';
import { Account } from '../types';

export const AccountAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || account.verificationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (selectedAccount) {
    return (
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedAccount(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>← Back to Analysis</span>
          </button>
        </div>
        <AccountDetails account={selectedAccount} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Analysis</h1>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Real-time Analysis Active</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts by username or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="flagged">Flagged</option>
            <option value="suspicious">Suspicious</option>
            <option value="unverified">Unverified</option>
            <option value="verified">Verified</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Flagged</span>
          </div>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-2">
            {mockAccounts.filter(a => a.verificationStatus === 'flagged').length}
          </p>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Suspicious</span>
          </div>
          <p className="text-2xl font-bold text-orange-700 dark:text-orange-300 mt-2">
            {mockAccounts.filter(a => a.verificationStatus === 'suspicious').length}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Unverified</span>
          </div>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-2">
            {mockAccounts.filter(a => a.verificationStatus === 'unverified').length}
          </p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Verified</span>
          </div>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
            {mockAccounts.filter(a => a.verificationStatus === 'verified').length}
          </p>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <AccountCard 
            key={account.id} 
            account={account} 
            onViewDetails={setSelectedAccount}
          />
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No accounts found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};