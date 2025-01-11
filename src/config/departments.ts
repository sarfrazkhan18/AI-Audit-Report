import { Industry } from './industries';

export const departmentsByIndustry: Record<Industry, string[]> = {
  Finance: [
    'Accounting',
    'Risk Management',
    'Treasury',
    'Tax',
    'Financial Planning',
    'Internal Controls',
    'Compliance',
    'Audit'
  ],
  Healthcare: [
    'Patient Care',
    'Medical Records',
    'Billing',
    'Laboratory',
    'Pharmacy',
    'Emergency Services',
    'Quality Assurance',
    'Clinical Research'
  ],
  Technology: [
    'Software Development',
    'IT Operations',
    'Cybersecurity',
    'Data Science',
    'Cloud Infrastructure',
    'Quality Assurance',
    'Product Management',
    'Research & Development'
  ],
  Manufacturing: [
    'Production',
    'Quality Control',
    'Supply Chain',
    'Inventory Management',
    'Maintenance',
    'Process Engineering',
    'Safety & Compliance',
    'Research & Development'
  ],
  'Oil & Gas': [
    'Exploration',
    'Production Operations',
    'Refining',
    'Pipeline Operations',
    'HSE',
    'Drilling',
    'Reservoir Engineering',
    'Field Services'
  ],
  'Aerospace & Defense': [
    'Aircraft Systems',
    'Space Systems',
    'Defense Systems',
    'Research & Development',
    'Quality Assurance',
    'Systems Engineering',
    'Mission Control',
    'Safety & Compliance'
  ],
  Government: [
    'Public Administration',
    'Policy Development',
    'Regulatory Affairs',
    'Public Safety',
    'Emergency Services',
    'Information Technology',
    'Finance & Budget',
    'Human Resources'
  ],
  'Public Sector': [
    'Public Services',
    'Social Services',
    'Infrastructure',
    'Urban Planning',
    'Environmental Protection',
    'Public Health',
    'Education',
    'Transportation'
  ],
  Energy: [
    'Power Generation',
    'Distribution',
    'Renewable Energy',
    'Grid Operations',
    'Energy Trading',
    'Smart Metering',
    'Sustainability',
    'Compliance'
  ],
  Transportation: [
    'Fleet Operations',
    'Logistics',
    'Maintenance',
    'Safety & Compliance',
    'Route Planning',
    'Customer Service',
    'Infrastructure',
    'Security'
  ],
  Construction: [
    'Project Management',
    'Site Operations',
    'Quality Control',
    'Safety & Compliance',
    'Engineering',
    'Procurement',
    'Environmental',
    'Cost Control'
  ],
  Education: [
    'Academic Affairs',
    'Student Services',
    'Research',
    'Administration',
    'Financial Aid',
    'Information Technology',
    'Facilities',
    'Compliance'
  ],
  Retail: [
    'Store Operations',
    'Inventory Management',
    'E-commerce',
    'Supply Chain',
    'Loss Prevention',
    'Customer Service',
    'Marketing',
    'Merchandising'
  ],
  Telecommunications: [
    'Network Operations',
    'Infrastructure',
    'Customer Service',
    'Product Development',
    'Technical Support',
    'Quality Assurance',
    'Regulatory Compliance',
    'Security'
  ],
  Mining: [
    'Operations',
    'Exploration',
    'Processing',
    'Safety & Health',
    'Environmental',
    'Engineering',
    'Geology',
    'Equipment Maintenance'
  ],
  Agriculture: [
    'Crop Production',
    'Livestock Management',
    'Farm Operations',
    'Quality Control',
    'Supply Chain',
    'Research & Development',
    'Environmental Compliance',
    'Food Safety'
  ]
};