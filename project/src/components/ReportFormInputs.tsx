import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { industries } from '../config/industries';
import { departmentsByIndustry } from '../config/departments';
import { auditAreasByIndustry } from '../config/auditAreas';

interface FormInputs {
  industry: string;
  department: string;
  category: string;
  objectives: string;
  scope: string;
  customInstructions?: string;
}

interface ReportFormInputsProps {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  selectedIndustry: string;
}

export const ReportFormInputs: React.FC<ReportFormInputsProps> = ({
  register,
  errors,
  selectedIndustry
}) => {
  return (
    <>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium">Industry</label>
        <select
          {...register('industry', { required: 'Industry is required' })}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="">Select an industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
        {errors.industry && (
          <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>
        )}
      </div>

      {selectedIndustry && (
        <div>
          <label htmlFor="department" className="block text-sm font-medium">Department</label>
          <select
            {...register('department', { required: 'Department is required' })}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="">Select a department</option>
            {departmentsByIndustry[selectedIndustry as keyof typeof departmentsByIndustry]?.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-500">{errors.department.message}</p>
          )}
        </div>
      )}

      {selectedIndustry && (
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Audit Area</label>
          <select
            {...register('category', { required: 'Audit Area is required' })}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="">Select an audit area</option>
            {auditAreasByIndustry[selectedIndustry as keyof typeof auditAreasByIndustry]?.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="objectives" className="block text-sm font-medium">Audit Objectives</label>
        <textarea
          {...register('objectives', { required: 'Audit Objectives are required' })}
          rows={3}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          placeholder="Enter audit objectives"
        />
        {errors.objectives && (
          <p className="mt-1 text-sm text-red-500">{errors.objectives.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="scope" className="block text-sm font-medium">Audit Scope</label>
        <textarea
          {...register('scope', { required: 'Audit Scope is required' })}
          rows={3}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          placeholder="Enter audit scope"
        />
        {errors.scope && (
          <p className="mt-1 text-sm text-red-500">{errors.scope.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="customInstructions" className="block text-sm font-medium">
          Custom Instructions (Optional)
        </label>
        <textarea
          {...register('customInstructions')}
          rows={3}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          placeholder="Enter any custom instructions or additional information"
        />
      </div>
    </>
  );
};