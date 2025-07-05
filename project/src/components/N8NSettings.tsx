import React, { useState, useEffect } from 'react';
import { Settings, Link, CheckCircle, XCircle, Zap, Brain, Sparkles } from 'lucide-react';

interface N8NSettingsProps {
  onConfigUpdate: (config: any) => void;
  currentConfig?: any;
}

const N8NSettings: React.FC<N8NSettingsProps> = ({ onConfigUpdate, currentConfig }) => {
  const [webhookUrl, setWebhookUrl] = useState(currentConfig?.webhookUrl || '');
  const [apiKey, setApiKey] = useState(currentConfig?.apiKey || '');
  const [enabled, setEnabled] = useState(currentConfig?.enabled || false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = () => {
    const config = {
      webhookUrl: webhookUrl.trim(),
      apiKey: apiKey.trim(),
      enabled: enabled && webhookUrl.trim() !== ''
    };
    onConfigUpdate(config);
    localStorage.setItem('n8n_config', JSON.stringify(config));
  };

  const testConnection = async () => {
    if (!webhookUrl.trim()) return;
    
    setIsTestingConnection(true);
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        },
        body: JSON.stringify({
          action: 'test_connection',
          timestamp: new Date().toISOString(),
          source: 'learning-platform'
        })
      });

      if (response.ok) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('n8n_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setWebhookUrl(config.webhookUrl || '');
      setApiKey(config.apiKey || '');
      setEnabled(config.enabled || false);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-full">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">AI Agent Integration</h3>
          <p className="text-sm text-gray-600">Connect your personalized N8N workflow</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            N8N Webhook URL
          </label>
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
          </button>
          
          {webhookUrl && (
            <button
              onClick={testConnection}
              disabled={isTestingConnection}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isTestingConnection ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : connectionStatus === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : connectionStatus === 'error' ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span>Test Connection</span>
            </button>
          )}
        </div>

        {showAdvanced && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key (Optional)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Your N8N API key for authentication"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">Enable AI Agent</p>
              <p className="text-sm text-gray-600">Activate personalized recommendations</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {connectionStatus === 'success' && (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Connection successful! Your AI agent is ready.</span>
          </div>
        )}

        {connectionStatus === 'error' && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <XCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Connection failed. Please check your webhook URL.</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">What can your AI agent do?</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Generate personalized learning recommendations</li>
          <li>• Analyze student progress and identify patterns</li>
          <li>• Create custom activities based on learning gaps</li>
          <li>• Provide motivational content and encouragement</li>
          <li>• Generate detailed learning insights and reports</li>
        </ul>
      </div>
    </div>
  );
};

export default N8NSettings;