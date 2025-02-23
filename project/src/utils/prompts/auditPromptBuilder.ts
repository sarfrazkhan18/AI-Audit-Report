interface AuditPromptData {
  industry: string;
  department: string;
  category: string;
  objectives: string;
  scope: string;
  customInstructions?: string;
}

export function buildAuditPrompt(data: AuditPromptData): string {
  return `Generate a professional internal audit report for ${data.department} in ${data.industry}, focusing on ${data.category}. Format the report exactly as shown below, using clean headings without special characters or markdown formatting. Use proper spacing and indentation.

FORMATTING REQUIREMENTS:
- Use simple numbered headings (1., 1.1, etc.)
- No special characters or formatting symbols
- Clear line breaks between sections
- Consistent indentation
- Professional business language
- No bullet points - use proper paragraphs
- No asterisks or other special characters

Begin Report:

1. EXECUTIVE SUMMARY

1.1 Audit Overview
[Provide a concise overview of the ${data.category} audit conducted for ${data.department} in ${data.industry}.]

1.2 Key Findings Summary
[Present 3-5 major findings with their risk ratings (High/Medium/Low) in paragraph format.]

1.3 Risk Assessment
[Provide the overall risk rating with clear justification in professional audit terminology.]

2. BACKGROUND AND CONTEXT

2.1 Organizational Context
[Describe the role and importance of ${data.department} within ${data.industry}, including key stakeholders and business impact.]

2.2 Regulatory Environment
[Detail applicable regulations, standards, and compliance requirements specific to ${data.industry} and ${data.department}.]

2.3 Process Overview
[Explain current processes, controls, and systems in place within ${data.department}.]

3. AUDIT APPROACH

3.1 Audit Objectives
${data.objectives}

3.2 Audit Scope
${data.scope}

3.3 Methodology and Procedures
[Detail the systematic approach used for the audit, including testing procedures and evidence collection methods.]

4. DETAILED AUDIT FINDINGS

4.1 High Priority Findings

Finding 1: [Title]
Observation: [Factual description of the condition found]
Risk Level: [High/Medium/Low]
Business Impact: [Specific consequences to the organization]
Root Cause Analysis: [Underlying factors contributing to the finding]
Recommendation: [Specific, actionable remediation steps]
Management Response: [Documented management commitment and action plan]

[Continue with additional findings in the same format]

4.2 Medium Priority Findings
[Follow same structure as above for medium-risk findings]

4.3 Low Priority Findings
[Follow same structure as above for low-risk findings]

5. CONCLUSIONS AND RECOMMENDATIONS

5.1 Overall Assessment
[Provide a comprehensive evaluation of the control environment and risk exposure]

5.2 Strategic Recommendations
[Present prioritized recommendations with clear implementation guidance]

5.3 Action Plan
[Detail specific next steps, timelines, and responsible parties]

6. APPENDICES

6.1 Audit Timeline
[Key dates and milestones of the audit]

6.2 Stakeholders Consulted
[List of key personnel interviewed]

6.3 Reference Documents
[List of key documents reviewed]

${data.customInstructions ? `\n7. ADDITIONAL CONSIDERATIONS\n${data.customInstructions}` : ''}

Note: Generate the complete report with actual, detailed content following this exact structure. Use clear, professional language suitable for executive review. Ensure all sections are fully developed with relevant, industry-specific content.`;
}