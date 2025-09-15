export interface Account {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  verificationStatus: 'verified' | 'unverified' | 'suspicious' | 'flagged';
  accountAge: number; // days
  riskScore: number; // 0-100
  createdAt: string;
  lastActivity: string;
  suspiciousActivities: SuspiciousActivity[];
  similarAccounts: SimilarAccount[];
}

export interface SuspiciousActivity {
  id: string;
  type: 'profile_similarity' | 'unusual_behavior' | 'mass_following' | 'fake_engagement' | 'impersonation' | 'financial_scam';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  details: Record<string, any>;
}

export interface SimilarAccount {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  similarityScore: number; // 0-100
  similarityFactors: string[];
}

export interface DetectionRule {
  id: string;
  name: string;
  description: string;
  category: 'profile' | 'behavior' | 'network' | 'content';
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  threshold: number;
  parameters: Record<string, any>;
}

export interface FraudAlert {
  id: string;
  accountId: string;
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignee?: string;
}

export interface AnalyticsData {
  totalAccounts: number;
  suspiciousAccounts: number;
  flaggedAccounts: number;
  resolvedCases: number;
  dailyDetections: Array<{ date: string; count: number }>;
  riskDistribution: Array<{ range: string; count: number }>;
  topThreats: Array<{ type: string; count: number }>;
}