export const featureFlags = {
  enableTemplates: true,
  enableAdvancedAnalytics: false,
  enableTeamWorkspace: false,
  // ... other features
};

// Usage in components
import { featureFlags } from '@/config/featureFlags';

{featureFlags.enableTemplates && <TemplateManager />} 