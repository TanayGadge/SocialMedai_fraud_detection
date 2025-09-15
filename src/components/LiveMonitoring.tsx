import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Users, Shield, Clock, Zap } from 'lucide-react';

interface LiveEvent {
  id: string;
  type: 'new_account' | 'suspicious_activity' | 'profile_match' | 'mass_action' | 'scam_detected';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  account: string;
  details: string;
}

export const LiveMonitoring: React.FC = () => {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isActive, setIsActive] = useState(true);

  const generateRandomEvent = (): LiveEvent => {
    const eventTypes = [
      { type: 'new_account', message: 'New account created with suspicious profile similarity', severity: 'medium' },
      { type: 'suspicious_activity', message: 'Unusual activity pattern detected', severity: 'high' },
      { type: 'profile_match', message: 'Profile matches verified celebrity account', severity: 'critical' },
      { type: 'mass_action', message: 'Mass following detected', severity: 'medium' },
      { type: 'scam_detected', message: 'Financial scam keywords detected in messages', severity: 'critical' }
    ];

    const accounts = ['@fake_elon_m', '@bill_gates_fan', '@oprah_fake', '@jeff_bezos_1', '@mark_z_official'];
    const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];

    return {
      id: Date.now().toString(),
      type: randomEvent.type as LiveEvent['type'],
      message: randomEvent.message,
      severity: randomEvent.severity as LiveEvent['severity'],
      timestamp: new Date().toISOString(),
      account: randomAccount,
      details: `Risk score: ${Math.floor(Math.random() * 40) + 60}/100`
    };
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newEvent = generateRandomEvent();
      setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'new_account': return <Users className="h-5 w-5" />;
      case 'suspicious_activity': return <Activity className="h-5 w-5" />;
      case 'profile_match': return <Shield className="h-5 w-5" />;
      case 'mass_action': return <Zap className="h-5 w-5" />;
      case 'scam_detected': return <AlertTriangle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const severityStats = {
    critical: events.filter(e => e.severity === 'critical').length,
    high: events.filter(e => e.severity === 'high').length,
    medium: events.filter(e => e.severity === 'medium').length,
    low: events.filter(e => e.severity === 'low').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Monitoring</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
            <span>{isActive ? 'Stop Monitoring' : 'Start Monitoring'}</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">Critical Events</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{severityStats.critical}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400">High Priority</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{severityStats.high}</p>
            </div>
            <Shield className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Medium Events</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{severityStats.medium}</p>
            </div>
            <Activity className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Low Priority</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{severityStats.low}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Live Events Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Events Feed</h2>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isActive ? 'Monitoring Active' : 'Monitoring Paused'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {events.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events detected. Start monitoring to see real-time alerts.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.message}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                          {event.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Account: {event.account}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{event.details}</span>
                        <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};