import { Industry } from './industries';

export const auditAreasByIndustry: Record<Industry, string[]> = {
  Finance: [
    'Financial Reporting',
    'Internal Controls',
    'Regulatory Compliance',
    'Risk Management',
    'Anti-Money Laundering',
    'Capital Adequacy',
    'Treasury Operations',
    'Tax Compliance'
  ],
  Healthcare: [
    'Patient Safety',
    'HIPAA Compliance',
    'Medical Billing Accuracy',
    'Clinical Quality',
    'Pharmacy Operations',
    'Medical Records Management',
    'Laboratory Operations',
    'Emergency Response'
  ],
  Technology: [
    'Data Privacy',
    'Cybersecurity',
    'Software Development Lifecycle',
    'IT Governance',
    'Cloud Security',
    'Access Management',
    'Business Continuity',
    'Third-party Risk'
  ],
  Manufacturing: [
    'Production Quality',
    'Safety Compliance',
    'Supply Chain Management',
    'Inventory Control',
    'Equipment Maintenance',
    'Environmental Compliance',
    'Process Efficiency',
    'Product Testing'
  ],
  'Oil & Gas': [
    'Operational Safety',
    'Environmental Compliance',
    'Asset Integrity',
    'Production Efficiency',
    'Regulatory Compliance',
    'Emergency Response',
    'Cost Control',
    'Risk Management'
  ],
  'Aerospace & Defense': [
    'Quality Management',
    'Export Compliance',
    'Security Clearance',
    'Safety Systems',
    'Contract Compliance',
    'Configuration Management',
    'Supply Chain Security',
    'Research Controls'
  ],
  Government: [
    'Procurement Compliance',
    'Budget Management',
    'Program Effectiveness',
    'Regulatory Compliance',
    'Information Security',
    'Grant Management',
    'Public Service Delivery',
    'Ethics Compliance'
  ],
  'Public Sector': [
    'Service Delivery',
    'Budget Utilization',
    'Compliance & Ethics',
    'Program Effectiveness',
    'Public Safety',
    'Resource Management',
    'Infrastructure Management',
    'Environmental Impact'
  ],
  Energy: [
    'Grid Reliability',
    'Environmental Compliance',
    'Safety Systems',
    'Asset Management',
    'Trading Controls',
    'Regulatory Compliance',
    'Emissions Control',
    'Emergency Response'
  ],
  Transportation: [
    'Safety Compliance',
    'Fleet Management',
    'Route Optimization',
    'Maintenance Programs',
    'Driver Compliance',
    'Fuel Management',
    'Customer Service',
    'Environmental Impact'
  ],
  Construction: [
    'Project Controls',
    'Safety Compliance',
    'Quality Assurance',
    'Contract Management',
    'Cost Control',
    'Environmental Compliance',
    'Subcontractor Management',
    'Risk Management'
  ],
  Education: [
    'Academic Quality',
    'Student Safety',
    'Financial Aid Compliance',
    'Research Integrity',
    'Data Privacy',
    'Resource Allocation',
    'Regulatory Compliance',
    'Program Effectiveness'
  ],
  Retail: [
    'Inventory Accuracy',
    'Cash Handling',
    'Store Operations',
    'E-commerce Security',
    'Customer Data Protection',
    'Supply Chain Controls',
    'Loss Prevention',
    'Payment Processing'
  ],
  Telecommunications: [
    'Network Security',
    'Service Quality',
    'Infrastructure Reliability',
    'Customer Privacy',
    'Regulatory Compliance',
    'Billing Accuracy',
    'Change Management',
    'Disaster Recovery'
  ],
  Mining: [
    'Safety Systems',
    'Environmental Compliance',
    'Operational Efficiency',
    'Asset Management',
    'Regulatory Compliance',
    'Resource Management',
    'Community Impact',
    'Risk Assessment'
  ],
  Agriculture: [
    'Food Safety',
    'Quality Control',
    'Environmental Compliance',
    'Supply Chain Management',
    'Pesticide Management',
    'Animal Welfare',
    'Water Management',
    'Sustainability Practices'
  ]
};