// API Types and Interfaces
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface JoinRequest {
  full_name: string;
  email: string;
  organization?: string;
  country: string;
  role: string;
  consent: boolean;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  organization?: string;
  role?: string;
  userType: string;
  country: string;
  website?: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Company Types
export interface CreateCompanyRequest {
  name: string;
  sector: string;
  country: string;
  reg_number: string;
  contact_name: string;
  contact_email: string;
  status: "Pending" | "Verified" | "Active" | "Rejected";
}

export interface Company {
  id: number;
  name: string;
  sector: string;
  country: string;
  reg_number: string;
  contact_name: string;
  contact_email: string;
  status: "Pending" | "Verified" | "Active" | "Rejected";
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface CompanyResponse {
  data: Company;
  message: string;
}

export interface CompaniesListResponse {
  data: Company[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CompaniesListParams {
  status?: "Pending" | "Verified" | "Active" | "Rejected";
  skip?: number;
  limit?: number;
  page?: number;
  pageSize?: number;
}

// Metrics Types
export interface MetricsOverview {
  companies_verified: number;
  tokens_issued: number;
  last_verification_date: string;
}

// Error Types
export interface ApiError {
  message: string;
  details?: any;
  status: number;
}

export interface ScoringRequest {
  name: string;
  V: number;
  M: number;
  R_factor: number;
  Sigma: number;
  Theta: number;
  L: number;
  Pi: number;
  CW: number;
  c_urgency: number;
  c_baseline: number;
  c_u: number;
  u: number;
  gamma: number[];
  r: number[];
  w_d: number;
  P: number[][];
  theta: number[][];
  A: number[][];
  B: number[][];
  C: number[][];
  C_tier: number;
  k: number;
  S0: number;
  tau: number;
  T: number;
  X_level: number;
}

export interface ScoringResponse {
  name?: string;
  parameters?: Record<string, number>;
  V?: number;
  M?: number;
  [key: string]: any; // Allow for additional numeric keys
}
