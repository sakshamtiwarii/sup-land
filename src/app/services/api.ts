// API configuration for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ msg: string }>;
}

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      // Log full error details for debugging (only in development)
      if (import.meta.env.DEV) {
        console.error('API Error:', {
          status: response.status,
          endpoint,
          message: data.message,
          errors: data.errors,
          requestBody: options.body
        });
      }
      throw new Error(data.message || data.errors?.map((e: {msg: string}) => e.msg).join(', ') || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection.');
  }
}

// Auth API methods
export const authApi = {
  // Signup for early access
  signup: (userData: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }) => fetchApi('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Login (for returning early access users)
  login: (credentials: { email: string; password: string }) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Google OAuth
  googleAuth: (credential: string) =>
    fetchApi('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    }),

  // Check if email exists
  checkEmail: (email: string) =>
    fetchApi<{ exists: boolean }>(`/auth/check-email/${email}`),

  // Check if username exists
  checkUsername: (username: string) =>
    fetchApi<{ exists: boolean }>(`/auth/check-username/${username}`),

  // Get signup stats
  getStats: () =>
    fetchApi<{ total: number; today: number; thisMonth: number }>('/auth/stats'),
};

// Suggestions API methods
export const suggestionsApi = {
  // Submit a suggestion
  submit: (data: {
    suggestion: string;
    isAnonymous: boolean;
    name?: string;
    email?: string;
  }) => fetchApi('/suggestions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Get all suggestions (for admin)
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const queryParams = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return fetchApi(`/suggestions${queryParams ? `?${queryParams}` : ''}`);
  },

  // Get suggestion stats
  getStats: () =>
    fetchApi('/suggestions/stats'),

  // Update suggestion (for admin)
  update: (id: string, data: { status?: string; adminNotes?: string; responded?: boolean }) =>
    fetchApi(`/suggestions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete suggestion (for admin)
  delete: (id: string) =>
    fetchApi(`/suggestions/${id}`, {
      method: 'DELETE',
    }),
};

// Volunteers API methods
export const volunteersApi = {
  // Submit volunteer application
  submit: (data: {
    name: string;
    email: string;
    skills: string[];
    timeAvailability: string;
    message: string;
  }) => fetchApi('/volunteers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Get all volunteers (for admin)
  getAll: (params?: { status?: string; skill?: string; page?: number; limit?: number }) => {
    const queryParams = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return fetchApi(`/volunteers${queryParams ? `?${queryParams}` : ''}`);
  },

  // Get volunteer stats
  getStats: () =>
    fetchApi('/volunteers/stats'),

  // Update volunteer (for admin)
  update: (id: string, data: { status?: string; adminNotes?: string; responseSent?: boolean }) =>
    fetchApi(`/volunteers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete volunteer (for admin)
  delete: (id: string) =>
    fetchApi(`/volunteers/${id}`, {
      method: 'DELETE',
    }),
};

export default authApi;
