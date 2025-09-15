import React, { useState } from 'react';
import { Settings, Plus, Edit, Trash2, ToggleLeft as Toggle, AlertTriangle } from 'lucide-react';
import { mockDetectionRules } from '../data/mockData';
import { DetectionRule } from '../types';

export const DetectionRules: React.FC = () => {
  const [rules, setRules] = useState<DetectionRule[]>(mockDetectionRules);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredRules = rules.filter(rule => 
    filterCategory === 'all' || rule.category === filterCategory
  );

  const toggleRule = (ruleId: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'profile': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'behavior': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'network': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'content': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Detection Rules</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add New Rule</span>
        </button>
      </div>

      {/* Rules Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Settings className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Rules</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{rules.length}</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2 mb-2">
            <Toggle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Active Rules</span>
          </div>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {rules.filter(rule => rule.enabled).length}
          </p>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">Critical Rules</span>
          </div>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {rules.filter(rule => rule.severity === 'critical').length}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Settings className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disabled Rules</span>
          </div>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {rules.filter(rule => !rule.enabled).length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="profile">Profile</option>
            <option value="behavior">Behavior</option>
            <option value="network">Network</option>
            <option value="content">Content</option>
          </select>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <div key={rule.id} className={`bg-white dark:bg-gray-800 rounded-xl border p-6 transition-all ${
            rule.enabled 
              ? 'border-gray-200 dark:border-gray-700' 
              : 'border-gray-200 dark:border-gray-700 opacity-60'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{rule.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(rule.category)}`}>
                    {rule.category.charAt(0).toUpperCase() + rule.category.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                    {rule.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{rule.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Threshold: {rule.threshold}</span>
                  <span>ID: {rule.id}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    rule.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    rule.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Rule Parameters */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parameters:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {Object.entries(rule.parameters).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{key.replace('_', ' ')}:</span>
                    <span className="text-gray-900 dark:text-white font-mono">
                      {typeof value === 'boolean' ? value.toString() : JSON.stringify(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRules.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No rules found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  );
};