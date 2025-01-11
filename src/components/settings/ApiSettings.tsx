import React, { useState } from 'react';
import { Key, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/use-toast';

interface ApiKey {
  key: string;
  created: Date;
  lastUsed: Date | null;
}

const ApiSettings: React.FC = () => {
  const [apiKey, setApiKey] = useState<ApiKey>({
    key: '••••••••••••••••',
    created: new Date(),
    lastUsed: null
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyKey = () => {
    // In a real app, you would decrypt and copy the actual API key
    navigator.clipboard.writeText('your-actual-api-key-here');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard."
    });
  };

  const handleRegenerateKey = () => {
    // In a real app, this would call your backend to generate a new API key
    toast({
      title: "Generate New API Key",
      description: "This would generate a new API key and invalidate the old one."
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Key className="w-5 h-5 text-primary" />
          <CardTitle>API Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Your API Key</label>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 p-2 bg-muted rounded text-sm">
                {apiKey.key}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyKey}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Created: {apiKey.created.toLocaleDateString()}
            </p>
            {apiKey.lastUsed && (
              <p className="text-sm text-muted-foreground">
                Last used: {apiKey.lastUsed.toLocaleDateString()}
              </p>
            )}
          </div>

          <div>
            <Button
              variant="outline"
              onClick={handleRegenerateKey}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New API Key
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">
              Warning: Generating a new key will invalidate your existing key.
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Rate Limits</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Requests per minute</span>
                <span>60</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Requests per day</span>
                <span>10,000</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Webhook Configuration</h4>
            <div className="space-y-2">
              <input
                type="url"
                placeholder="https://your-domain.com/webhook"
                className="w-full p-2 text-sm border rounded"
              />
              <p className="text-sm text-muted-foreground">
                Receive real-time notifications when new reports are generated.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;