import React from 'react';
import { AlertTriangle, Calendar, Users, MessageSquare, Clock, Shield, ExternalLink, Flag } from 'lucide-react';
import { Account } from '../types';

interface AccountDetailsProps {
  account: Account;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
    if (score >= 60) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img 
              src={account.profileImage} 
              alt={account.displayName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{account.displayName}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">@{account.username}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  account.verificationStatus === 'flagged' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  account.verificationStatus === 'suspicious' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                  account.verificationStatus === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {account.verificationStatus.charAt(0).toUpperCase() + account.verificationStatus.slice(1)}
                </span>
                {account.verificationStatus === 'verified' && (
                  <Shield className="h-5 w-5 text-blue-500" />
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score:</span>
              <span className={`px-4 py-2 rounded-full text-lg font-bold ${getRiskColor(account.riskScore)}`}>
                {account.riskScore}/100
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors">
                <Flag className="h-4 w-4" />
                <span>Flag Account</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>View Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{account.followersCount.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Users className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{account.followingCount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <MessageSquare className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{account.postsCount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{account.accountAge}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days Old</div>
          </div>
        </div>

        {/* Account Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Created:</span>
            <span className="text-gray-900 dark:text-white">{new Date(account.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Last Activity:</span>
            <span className="text-gray-900 dark:text-white">{new Date(account.lastActivity).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Suspicious Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Suspicious Activities</h2>
        <div className="space-y-4">
          {account.suspiciousActivities.map((activity) => (
            <div key={activity.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    activity.severity === 'critical' ? 'text-red-500' :
                    activity.severity === 'high' ? 'text-orange-500' :
                    activity.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                    {activity.type.replace('_', ' ')}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                  {activity.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(activity.timestamp).toLocaleString()}</span>
                <span>Details: {JSON.stringify(activity.details)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Accounts */}
      {account.similarAccounts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Similar Accounts Detected</h2>
          <div className="space-y-4">
            {account.similarAccounts.map((similar) => (
              <div key={similar.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <img 
                  src={similar.profileImage} 
                  alt={similar.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{similar.displayName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@{similar.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Similarity factors: {similar.similarityFactors.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(similar.similarityScore)}`}>
                    {similar.similarityScore}% match
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};