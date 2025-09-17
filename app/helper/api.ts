// helper/v1.ts
import axios from "axios";
import {
  JoinRequest,
  LoginRequest,
  AuthResponse,
  LoginResponse,
  ApiError,
  CreateCompanyRequest,
  CompanyResponse,
  CompaniesListResponse,
  CompaniesListParams,
  MetricsOverview,
  ScoringRequest,
  ScoringResponse,
} from "../types/api";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Create axios instance for internal API routes (proxy)
const internalApi = axios.create({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    const tokenType = localStorage.getItem("tokenType") || "bearer";
    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for internal API
internalApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    const tokenType = localStorage.getItem("tokenType") || "bearer";
    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to extract error message from different response formats
const extractErrorMessage = (error: any, defaultMessage: string): string => {
  if (error.response?.data) {
    const errorData = error.response.data;

    // Handle FastAPI error format: {"detail":[{"msg":"..."}]}
    if (
      errorData.detail &&
      Array.isArray(errorData.detail) &&
      errorData.detail.length > 0
    ) {
      return errorData.detail[0].msg || defaultMessage;
    }
    // Handle standard error format: {"message": "..."}
    else if (errorData.message) {
      return errorData.message;
    }
    // Handle error format: {"error": "..."}
    else if (errorData.error) {
      return errorData.error;
    }
  } else if (error.message) {
    return error.message;
  }

  return defaultMessage;
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

internalApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authApi = {
  // Join/Signup
  join: async (
    userData: JoinRequest
  ): Promise<AuthResponse | LoginResponse> => {
    try {
      // Use the internal API route (proxy) to avoid CORS issues
      const response = await api.post("/v1/users/join", userData);

      // Handle different response formats
      if (response.data.access_token) {
        // New format: access_token + token_type
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("tokenType", response.data.token_type);
        localStorage.setItem("isAuthenticated", "true");
        return response.data as LoginResponse;
      } else if (response.data.jwt) {
        // Old format: jwt + user
        localStorage.setItem("authToken", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isAuthenticated", "true");
        return response.data as AuthResponse;
      }

      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Signup failed. Please try again."),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },

  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      // Use the internal API route (proxy) to avoid CORS issues
      const response = await api.post("/v1/users/login", credentials);

      // Store auth data if successful
      if (response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("tokenType", response.data.token_type);
        localStorage.setItem("isAuthenticated", "true");
      }

      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(
          error,
          "Login failed. Please check your credentials."
        ),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("isAuthenticated") === "true" &&
      !!localStorage.getItem("authToken")
    );
  },

  // Get stored token
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  },
};

// Company APIs
export const companyApi = {
  // Create a new company
  create: async (
    companyData: CreateCompanyRequest
  ): Promise<CompanyResponse> => {
    try {
      const response = await api.post("/v1/companies", companyData);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to create company"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },

  // Get all companies
  getAll: async (
    params: CompaniesListParams = {}
  ): Promise<CompaniesListResponse> => {
    try {
      const queryParams = new URLSearchParams();

      if (params.status) queryParams.append("status", params.status);
      if (params.skip !== undefined)
        queryParams.append("skip", params.skip.toString());
      if (params.limit !== undefined)
        queryParams.append("limit", params.limit.toString());
      if (params.page !== undefined)
        queryParams.append("page", params.page.toString());
      if (params.pageSize !== undefined)
        queryParams.append("pageSize", params.pageSize.toString());

      const queryString = queryParams.toString();
      const url = queryString
        ? `/v1/companies?${queryString}`
        : "/v1/companies";

      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to fetch companies"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },

  // Get company by ID
  getById: async (id: number): Promise<CompanyResponse> => {
    try {
      const response = await api.get(`/v1/companies/${id}`);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to fetch company"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },

  // Update company
  update: async (
    id: number,
    companyData: Partial<CreateCompanyRequest>
  ): Promise<CompanyResponse> => {
    try {
      const response = await api.put(`/v1/companies/${id}`, companyData);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to update company"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },

  // Delete company
  delete: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/v1/companies/${id}`);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to delete company"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },
};

// Metrics APIs
export const metricsApi = {
  // Get metrics overview
  getOverview: async (): Promise<MetricsOverview> => {
    try {
      const response = await api.get("/v1/metrics/overview");
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to fetch metrics overview"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },
};

// Upload APIs
export const uploadApi = {
  // Sign upload request (S3 presigned URL)
  signUpload: async (file: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/v1/uploads/sign", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to sign upload"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },
};

// Document APIs
export const documentApi = {
  // Create a new document record
  create: async (docData: {
    company_id: string;
    s3_uri: string;
    sha256: string;
    filetype: string;
    uploaded_by: string;
  }): Promise<any> => {
    try {
      const response = await api.post("/v1/documents", docData);

      // Store documentId in localStorage
      if (response.data?.id) {
        localStorage.setItem("documentId", response.data.id);
      }

      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to create document record"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },
};

// Types
export interface FieldPayload {
  company_id: string;
  template_id: string;
  raw_value: number;
  unit: string;
  period_start: string;
  period_end: string;
  document_id: string;
  submitted_by: string;
  status: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Submit field data
export const submitFieldData = async (payload: any) => {
  try {
    const response: any = await api.post<ApiResponse<FieldPayload>>(
      "/v1/fields/batch",
      payload
    );
    console.log(response, "response>>");

    localStorage.setItem("fieldId", response.data.id);
    localStorage.setItem("buds_id", JSON.stringify(response.data.buds_ids));
    return response.data;
  } catch (error: any) {
    console.error("Error submitting field data:", error);
    throw error.response?.data || error;
  }
};

export const submitFieldId = async (payload: FieldPayload) => {
  try {
    const response: any = await api.post<ApiResponse<FieldPayload>>(
      "/v1/mint",
      payload
    );
    localStorage.setItem("mintResponse", JSON.stringify(response));
    return response.data;
  } catch (error: any) {
    console.error("Error submitting field data:", error);
    throw error.response?.data || error;
  }
};

// Get tokens by user
export const getTokensByUser = async (userId: string): Promise<any> => {
  try {
    const response = await api.get(`/v1/tokens/by-user/${userId}`);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = {
      message: extractErrorMessage(error, "Failed to fetch company tokens"),
      details: error.response?.data,
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};

// Get tokens by company
export const getTokensByCompany = async (companyId: string): Promise<any> => {
  try {
    const response = await api.get(`/v1/tokens/by-company/${companyId}`);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = {
      message: extractErrorMessage(error, "Failed to fetch company tokens"),
      details: error.response?.data,
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};

export const scoringApi = {
  // Calculate scoring
  calculate: async (scoringData: ScoringRequest): Promise<ScoringResponse> => {
    try {
      const response = await api.post("/v1/scoring/calculate", scoringData);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: extractErrorMessage(error, "Failed to calculate scoring"),
        details: error.response?.data,
        status: error.response?.status || 500,
      };
      throw apiError;
    }
  },
};
export default api;
