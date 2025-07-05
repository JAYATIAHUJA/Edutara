interface N8NConfig {
  webhookUrl: string;
  apiKey?: string;
  enabled: boolean;
}

interface N8NRequest {
  action: string;
  studentData?: any;
  assessmentData?: any;
  learningContext?: any;
  customData?: any;
}

interface N8NResponse {
  success: boolean;
  data?: any;
  recommendations?: any[];
  message?: string;
  error?: string;
}

class N8NService {
  private config: N8NConfig;

  constructor(config: N8NConfig) {
    this.config = config;
  }

  async sendRequest(request: N8NRequest): Promise<N8NResponse> {
    if (!this.config.enabled || !this.config.webhookUrl) {
      return { success: false, error: 'N8N service not configured' };
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...request,
          timestamp: new Date().toISOString(),
          source: 'edutara-platform'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, ...data };
    } catch (error) {
      console.error('N8N Service Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Specific methods for different learning scenarios
  async getPersonalizedRecommendations(studentData: any, assessmentResults: any) {
    return this.sendRequest({
      action: 'get_recommendations',
      studentData,
      assessmentData: assessmentResults,
      learningContext: {
        curriculum: 'CBSE/NCERT',
        region: 'rural_india',
        languages: ['hindi', 'english']
      }
    });
  }

  async analyzeStudentProgress(progressData: any) {
    return this.sendRequest({
      action: 'analyze_progress',
      studentData: progressData,
      learningContext: {
        timeframe: 'weekly',
        subjects: ['math', 'english']
      }
    });
  }

  async generateCustomActivities(studentProfile: any, weakAreas: string[]) {
    return this.sendRequest({
      action: 'generate_activities',
      studentData: studentProfile,
      customData: {
        weakAreas,
        preferredTypes: ['game', 'story', 'exercise'],
        culturalContext: 'indian_rural'
      }
    });
  }

  async getMotivationalContent(studentData: any, achievements: any[]) {
    return this.sendRequest({
      action: 'motivational_content',
      studentData,
      customData: {
        achievements,
        mood: 'encouraging',
        language: 'hindi_english_mix'
      }
    });
  }

  async reportLearningInsights(sessionData: any) {
    return this.sendRequest({
      action: 'learning_insights',
      customData: sessionData
    });
  }
}

export default N8NService;
export type { N8NConfig, N8NRequest, N8NResponse };