import { useState, useEffect, useCallback } from 'react';
import N8NService, { N8NConfig } from '../services/n8nService';

export const useN8N = () => {
  const [n8nService, setN8nService] = useState<N8NService | null>(null);
  const [config, setConfig] = useState<N8NConfig>({
    webhookUrl: '',
    apiKey: '',
    enabled: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load configuration from localStorage
    const savedConfig = localStorage.getItem('n8n_config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      if (parsedConfig.enabled && parsedConfig.webhookUrl) {
        setN8nService(new N8NService(parsedConfig));
      }
    }
  }, []);

  const updateConfig = useCallback((newConfig: N8NConfig) => {
    setConfig(newConfig);
    localStorage.setItem('n8n_config', JSON.stringify(newConfig));
    
    if (newConfig.enabled && newConfig.webhookUrl) {
      setN8nService(new N8NService(newConfig));
    } else {
      setN8nService(null);
    }
  }, []);

  const getPersonalizedRecommendations = useCallback(async (studentData: any, assessmentResults: any) => {
    if (!n8nService) return null;
    
    setIsLoading(true);
    try {
      const result = await n8nService.getPersonalizedRecommendations(studentData, assessmentResults);
      return result;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService]);

  const analyzeProgress = useCallback(async (progressData: any) => {
    if (!n8nService) return null;
    
    setIsLoading(true);
    try {
      const result = await n8nService.analyzeStudentProgress(progressData);
      return result;
    } catch (error) {
      console.error('Error analyzing progress:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService]);

  const generateCustomActivities = useCallback(async (studentProfile: any, weakAreas: string[]) => {
    if (!n8nService) return null;
    
    setIsLoading(true);
    try {
      const result = await n8nService.generateCustomActivities(studentProfile, weakAreas);
      return result;
    } catch (error) {
      console.error('Error generating activities:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService]);

  const getMotivationalContent = useCallback(async (studentData: any, achievements: any[]) => {
    if (!n8nService) return null;
    
    setIsLoading(true);
    try {
      const result = await n8nService.getMotivationalContent(studentData, achievements);
      return result;
    } catch (error) {
      console.error('Error getting motivational content:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [n8nService]);

  const reportLearningInsights = useCallback(async (sessionData: any) => {
    if (!n8nService) return null;
    
    try {
      const result = await n8nService.reportLearningInsights(sessionData);
      return result;
    } catch (error) {
      console.error('Error reporting insights:', error);
      return null;
    }
  }, [n8nService]);

  return {
    config,
    updateConfig,
    isEnabled: config.enabled && !!n8nService,
    isLoading,
    getPersonalizedRecommendations,
    analyzeProgress,
    generateCustomActivities,
    getMotivationalContent,
    reportLearningInsights
  };
};