export const industries = [
  'Finance',
  'Healthcare',
  'Technology',
  'Manufacturing',
  'Oil & Gas',
  'Aerospace & Defense',
  'Government',
  'Public Sector',
  'Energy',
  'Transportation',
  'Construction',
  'Education',
  'Retail',
  'Telecommunications',
  'Mining',
  'Agriculture'
] as const;

export type Industry = typeof industries[number];