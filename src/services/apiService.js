/**
 * API Service for communicating with LearnBuild AI Express Backend REST API
 */

const API_BASE_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'learnbuild_jwt_token';

export const apiService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'API Request failed');
      }

      return data;
    } catch (err) {
      console.warn(`API call ${endpoint} error:`, err.message);
      throw err;
    }
  },

  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async resetPassword(email, newPassword) {
    const data = await this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, newPassword })
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const data = await this.request('/auth/me');
      return data.user;
    } catch (e) {
      this.removeToken();
      return null;
    }
  },

  async fetchUserData() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await this.request('/user/data');
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async syncUserData(activeProject, assessmentHistory, completedModules, unlockedStep = 1) {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await this.request('/user/sync', {
        method: 'POST',
        body: JSON.stringify({
          activeProject,
          assessmentHistory,
          completedModules,
          unlockedStep
        })
      });
      return res.data;
    } catch (e) {
      console.warn('Backend sync failed, falling back to local storage:', e.message);
      return null;
    }
  }
};
