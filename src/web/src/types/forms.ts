export interface SubmissionReceipt {
  referenceId: string;
  status: string;
  autoResponseDelivered: boolean;
  supportNotificationDelivered: boolean;
  receivedAt: string;
}

export interface CareerSubmissionPayload {
  primaryCompanyInterest: string;
  roleTrack: string;
  availabilityWindow: string;
  location: string;
  adjacentCompanyInterest: string[];
  fullName: string;
  email: string;
  website: string;
  portfolio: string;
  recentRole: string;
  resumeLink: string;
  highestLeverageContribution: string;
  proofOfWork: string;
  extraNote: string;
  submittedAt?: string;
  submittedFrom?: string;
  host?: string;
}

export interface InvestorSubmissionPayload {
  fullName: string;
  organization: string;
  email: string;
  investorType: string;
  region: string;
  companyInterest: string[];
  interestProfile: string;
  capitalRange: string;
  timeHorizon: string;
  preferredMode: string;
  thesis: string;
  valueAdd: string;
  extraNote: string;
  submittedAt?: string;
  submittedFrom?: string;
  host?: string;
}
