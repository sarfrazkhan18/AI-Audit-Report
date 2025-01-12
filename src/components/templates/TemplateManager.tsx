import React from 'react';
import { Card } from '../ui/card';

interface Template {
  id: string;
  name: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export default function TemplateManager() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Report Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Template cards */}
      </div>
    </div>
  );
} 