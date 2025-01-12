export const features = {
  useNewGenerator: false,
  useNewExporter: false,
  useNewTemplates: false
};

// Usage in components
import { featureFlags } from '@/config/featureFlags';

{featureFlags.enableTemplates && <TemplateManager />} 