import React from 'react';
import { AlertTriangle, Clock, Users, MessageSquare, Shield, Eye } from 'lucide-react';
import { Account } from '../types';

interface AccountCardProps {
  account: Account;
  onViewDetails: (account: Account) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, onViewDetails }) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
    if (score >= 60) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flagged': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'suspicious': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const criticalActivities = account.suspiciousActivities.filter(activity => 
    activity.severity === 'critical' || activity.severity === 'high'
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={account.profileImage} 
            alt={account.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{account.displayName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{account.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.verificationStatus)}`}>
            {account.verificationStatus.charAt(0).toUpperCase() + account.verificationStatus.slice(1)}
          </span>
          {account.verificationStatus === 'verified' && (
            <Shield className="h-4 w-4 text-blue-500" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {account.followersCount.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{account.postsCount}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{account.accountAge}d</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(account.riskScore)}`}>
            {account.riskScore}/100
          </span>
        </div>
        {criticalActivities > 0 && (
          <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">{criticalActivities} Critical</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {account.suspiciousActivities.slice(0, 2).map((activity) => (
          <div key={activity.id} className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${
              activity.severity === 'critical' ? 'bg-red-500' :
              activity.severity === 'high' ? 'bg-orange-500' :
              activity.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}></div>
            <span className="text-gray-600 dark:text-gray-400 truncate flex-1">{activity.description}</span>
          </div>
        ))}
        {account.suspiciousActivities.length > 2 && (
          <div className="text-xs text-blue-600 dark:text-blue-400">
            +{account.suspiciousActivities.length - 2} more activities
          </div>
        )}
      </div>

      <button
        onClick={() => onViewDetails(account)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <Eye className="h-4 w-4" />
        <span>View Details</span>
      </button>
    </div>
  );
};