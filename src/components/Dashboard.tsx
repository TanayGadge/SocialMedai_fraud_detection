import React from 'react';
import { AlertTriangle, Shield, Users, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { mockAnalytics } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { totalAccounts, suspiciousAccounts, flaggedAccounts, resolvedCases, dailyDetections, riskDistribution, topThreats } = mockAnalytics;

  const detectionRate = ((suspiciousAccounts / totalAccounts) * 100).toFixed(2);
  const resolutionRate = ((resolvedCases / (resolvedCases + flaggedAccounts)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fraud Detection Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Accounts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAccounts.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+2.1% from last week</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Suspicious Accounts</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{suspiciousAccounts.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-600 dark:text-orange-400">
            <span>Detection Rate: {detectionRate}%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Flagged Accounts</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{flaggedAccounts}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
            <span>High Priority Cases</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved Cases</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{resolvedCases}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
            <span>Resolution Rate: {resolutionRate}%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Detections Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Fraud Detections</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {dailyDetections.map((day, index) => {
              const height = (day.count / Math.max(...dailyDetections.map(d => d.count))) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-500"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{day.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Score Distribution</h3>
          <div className="space-y-4">
            {riskDistribution.map((range, index) => {
              const percentage = (range.count / totalAccounts) * 100;
              const colors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
              return (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">{range.range}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${colors[index]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-16">{range.count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Threats */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Threat Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topThreats.map((threat, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{threat.count}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{threat.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};