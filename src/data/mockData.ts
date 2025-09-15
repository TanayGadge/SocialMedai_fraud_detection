import { Account, DetectionRule, FraudAlert, AnalyticsData } from '../types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    username: 'elon_musk_official',
    displayName: 'Elon Musk',
    profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    followersCount: 1200,
    followingCount: 50,
    postsCount: 25,
    verificationStatus: 'flagged',
    accountAge: 3,
    riskScore: 95,
    createdAt: '2024-01-15T10:30:00Z',
    lastActivity: '2024-01-18T14:20:00Z',
    suspiciousActivities: [
      {
        id: '1',
        type: 'impersonation',
        description: 'Profile matches verified account with 98% similarity',
        severity: 'critical',
        timestamp: '2024-01-18T14:20:00Z',
        details: { similarityScore: 98, originalAccount: '@elonmusk' }
      },
      {
        id: '2',
        type: 'financial_scam',
        description: 'Requesting cryptocurrency transfers in DMs',
        severity: 'critical',
        timestamp: '2024-01-18T13:15:00Z',
        details: { reportCount: 15 }
      }
    ],
    similarAccounts: [
      {
        id: '2',
        username: 'elonmusk',
        displayName: 'Elon Musk',
        profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
        similarityScore: 98,
        similarityFactors: ['Profile Image', 'Display Name', 'Bio Content']
      }
    ]
  },
  {
    id: '2',
    username: 'bill_gates_foundation',
    displayName: 'Bill Gates',
    profileImage: 'https://images.pexels.com/photos/5922293/pexels-photo-5922293.jpeg?auto=compress&cs=tinysrgb&w=150',
    followersCount: 800,
    followingCount: 30,
    postsCount: 12,
    verificationStatus: 'suspicious',
    accountAge: 5,
    riskScore: 78,
    createdAt: '2024-01-10T09:15:00Z',
    lastActivity: '2024-01-18T16:45:00Z',
    suspiciousActivities: [
      {
        id: '3',
        type: 'profile_similarity',
        description: 'Profile elements match verified account',
        severity: 'high',
        timestamp: '2024-01-18T16:45:00Z',
        details: { similarityScore: 85 }
      },
      {
        id: '4',
        type: 'unusual_behavior',
        description: 'Rapid follower acquisition (500 in 24 hours)',
        severity: 'medium',
        timestamp: '2024-01-17T12:30:00Z',
        details: { followersGained: 500 }
      }
    ],
    similarAccounts: [
      {
        id: '3',
        username: 'billgates',
        displayName: 'Bill Gates',
        profileImage: 'https://images.pexels.com/photos/5922293/pexels-photo-5922293.jpeg?auto=compress&cs=tinysrgb&w=150',
        similarityScore: 85,
        similarityFactors: ['Display Name', 'Bio Keywords']
      }
    ]
  },
  {
    id: '3',
    username: 'oprah_winfrey_show',
    displayName: 'Oprah Winfrey',
    profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
    followersCount: 2500,
    followingCount: 100,
    postsCount: 45,
    verificationStatus: 'unverified',
    accountAge: 15,
    riskScore: 35,
    createdAt: '2024-01-01T12:00:00Z',
    lastActivity: '2024-01-18T18:20:00Z',
    suspiciousActivities: [
      {
        id: '5',
        type: 'mass_following',
        description: 'Following 200+ accounts in short timeframe',
        severity: 'low',
        timestamp: '2024-01-15T10:00:00Z',
        details: { accountsFollowed: 200 }
      }
    ],
    similarAccounts: []
  }
];

export const mockDetectionRules: DetectionRule[] = [
  {
    id: '1',
    name: 'Profile Image Similarity',
    description: 'Detects accounts using identical or highly similar profile images to verified accounts',
    category: 'profile',
    severity: 'critical',
    enabled: true,
    threshold: 90,
    parameters: { algorithm: 'perceptual_hash', tolerance: 0.1 }
  },
  {
    id: '2',
    name: 'Display Name Matching',
    description: 'Identifies accounts with display names matching prominent figures',
    category: 'profile',
    severity: 'high',
    enabled: true,
    threshold: 95,
    parameters: { fuzzy_matching: true, celebrity_database: true }
  },
  {
    id: '3',
    name: 'Rapid Follower Growth',
    description: 'Flags accounts with unusually rapid follower acquisition patterns',
    category: 'behavior',
    severity: 'medium',
    enabled: true,
    threshold: 100,
    parameters: { time_window: '24h', threshold: 100 }
  },
  {
    id: '4',
    name: 'Financial Scam Keywords',
    description: 'Detects messages containing cryptocurrency or money transfer requests',
    category: 'content',
    severity: 'critical',
    enabled: true,
    threshold: 1,
    parameters: { keywords: ['bitcoin', 'crypto', 'investment', 'send money'] }
  }
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: '1',
    accountId: '1',
    type: 'Critical Impersonation',
    message: 'Account matches Elon Musk profile with 98% similarity and is requesting crypto transfers',
    severity: 'critical',
    timestamp: '2024-01-18T14:20:00Z',
    status: 'investigating',
    assignee: 'Sarah Chen'
  },
  {
    id: '2',
    accountId: '2',
    type: 'Profile Similarity',
    message: 'Account shows 85% similarity to Bill Gates official profile',
    severity: 'high',
    timestamp: '2024-01-18T16:45:00Z',
    status: 'open'
  },
  {
    id: '3',
    accountId: '3',
    type: 'Unusual Activity',
    message: 'Mass following detected: 200 accounts in 2 hours',
    severity: 'medium',
    timestamp: '2024-01-15T10:00:00Z',
    status: 'resolved'
  }
];

export const mockAnalytics: AnalyticsData = {
  totalAccounts: 125000,
  suspiciousAccounts: 1250,
  flaggedAccounts: 85,
  resolvedCases: 342,
  dailyDetections: [
    { date: '2024-01-12', count: 12 },
    { date: '2024-01-13', count: 8 },
    { date: '2024-01-14', count: 15 },
    { date: '2024-01-15', count: 23 },
    { date: '2024-01-16', count: 18 },
    { date: '2024-01-17', count: 31 },
    { date: '2024-01-18', count: 27 }
  ],
  riskDistribution: [
    { range: '0-25', count: 98500 },
    { range: '26-50', count: 15200 },
    { range: '51-75', count: 8100 },
    { range: '76-100', count: 3200 }
  ],
  topThreats: [
    { type: 'Profile Impersonation', count: 45 },
    { type: 'Financial Scam', count: 32 },
    { type: 'Mass Following', count: 28 },
    { type: 'Fake Engagement', count: 21 }
  ]
};