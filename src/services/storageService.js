import { apiService } from './apiService';

/**
 * Persistent Storage & Hybrid Database Layer
 * Saves state locally and synchronizes to Express backend REST API database when logged in.
 */

const STORAGE_KEYS = {
  PROJECT: 'learnbuild_active_project',
  ASSESSMENT_HISTORY: 'learnbuild_assessment_history',
  COMPLETED_MODULES: 'learnbuild_completed_modules',
  UNLOCKED_STEP: 'learnbuild_unlocked_step',
  USER_PROFILE: 'learnbuild_user_profile',
  TUTOR_CHAT: 'learnbuild_tutor_chat_history'
};

export const storageService = {
  // Save Unlocked Step (Gated Progression Queue)
  saveUnlockedStep(stepNumber) {
    try {
      const current = this.getUnlockedStep();
      const nextStep = Math.max(current, stepNumber);
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_STEP, String(nextStep));
      if (apiService.getToken()) {
        const project = this.loadProject();
        const history = this.loadAssessmentHistory();
        const modules = this.loadCompletedModules();
        apiService.syncUserData(project, history, modules, nextStep).catch(() => {});
      }
      return nextStep;
    } catch (e) {
      return stepNumber;
    }
  },

  getUnlockedStep() {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.UNLOCKED_STEP);
      return val ? parseInt(val, 10) : 1;
    } catch (e) {
      return 1;
    }
  },

  // Save Active Project
  saveProject(project) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECT, JSON.stringify(project));
      if (apiService.getToken()) {
        const history = this.loadAssessmentHistory();
        const modules = this.loadCompletedModules();
        const unlockedStep = this.getUnlockedStep();
        apiService.syncUserData(project, history, modules, unlockedStep).catch(() => {});
      }
    } catch (e) {
      console.error('Failed to save project state:', e);
    }
  },

  saveActiveProject(project) {
    return this.saveProject(project);
  },

  // Load Active Project
  loadProject() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  getActiveProject() {
    return this.loadProject();
  },

  // Save Assessment History
  saveAssessmentHistory(historyArray) {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT_HISTORY, JSON.stringify(historyArray || []));
      if (apiService.getToken()) {
        const project = this.loadProject();
        const modules = this.loadCompletedModules();
        const unlockedStep = this.getUnlockedStep();
        apiService.syncUserData(project, historyArray, modules, unlockedStep).catch(() => {});
      }
      return historyArray;
    } catch (e) {
      console.error('Failed to save assessment history:', e);
      return [];
    }
  },

  // Load Assessment History
  loadAssessmentHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  getAssessmentHistory() {
    return this.loadAssessmentHistory();
  },

  // Save Completed Learning Modules
  saveCompletedModules(modules) {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(modules || ['FastAPI']));
      if (apiService.getToken()) {
        const project = this.loadProject();
        const history = this.loadAssessmentHistory();
        const unlockedStep = this.getUnlockedStep();
        apiService.syncUserData(project, history, modules, unlockedStep).catch(() => {});
      }
    } catch (e) {
      console.error('Failed to save completed modules:', e);
    }
  },

  // Load Completed Learning Modules
  loadCompletedModules() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_MODULES);
      return data ? JSON.parse(data) : ['FastAPI'];
    } catch (e) {
      return ['FastAPI'];
    }
  },

  getCompletedModules() {
    return this.loadCompletedModules();
  },

  // Save AI Tutor Chat History
  saveChatHistory(messages) {
    try {
      localStorage.setItem(STORAGE_KEYS.TUTOR_CHAT, JSON.stringify(messages || []));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
  },

  // Load AI Tutor Chat History
  loadChatHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TUTOR_CHAT);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  getChatHistory() {
    return this.loadChatHistory();
  },

  // Sync entire state from API after login
  async loadFromAPI() {
    if (!apiService.getToken()) return null;
    try {
      const data = await apiService.fetchUserData();
      if (data) {
        if (data.activeProject) {
          localStorage.setItem(STORAGE_KEYS.PROJECT, JSON.stringify(data.activeProject));
        }
        if (data.assessmentHistory) {
          localStorage.setItem(STORAGE_KEYS.ASSESSMENT_HISTORY, JSON.stringify(data.assessmentHistory));
        }
        if (data.completedModules) {
          localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(data.completedModules));
        }
        if (data.unlockedStep) {
          localStorage.setItem(STORAGE_KEYS.UNLOCKED_STEP, String(data.unlockedStep));
        }
        return data;
      }
    } catch (e) {
      console.warn('Could not sync from backend API:', e.message);
    }
    return null;
  },

  // Reset all state
  clearAll() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  }
};
