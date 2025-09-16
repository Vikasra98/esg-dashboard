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
