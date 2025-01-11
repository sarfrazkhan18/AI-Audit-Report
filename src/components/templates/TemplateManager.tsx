interface Template {
  id: string;
  name: string;
  industry: string;
  structure: any;
  createdBy: string;
  isPublic: boolean;
}

const TemplateManager: React.FC = () => {
  // Template management logic
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Report Templates</h2>
      {/* Template list and editor */}
    </div>
  );
}; 