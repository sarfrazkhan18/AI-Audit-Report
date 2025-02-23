import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { addCustomIndustry } from '../../utils/industry/industryManager';
import { useToast } from '../ui/use-toast';

interface CustomIndustryFormData {
  industryName: string;
  departments: string;
  auditAreas: string;
}

export const CustomIndustryForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomIndustryFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: CustomIndustryFormData) => {
    try {
      const departments = data.departments.split(',').map(d => d.trim());
      const auditAreas = data.auditAreas.split(',').map(a => a.trim());
      
      await addCustomIndustry({
        name: data.industryName,
        departments,
        auditAreas
      });

      toast({
        title: 'Industry Added',
        description: `${data.industryName} has been added successfully.`,
      });

      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add industry. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Industry Name</label>
        <input
          {...register('industryName', { required: 'Industry name is required' })}
          className="w-full p-2 border rounded-md"
          placeholder="Enter industry name"
        />
        {errors.industryName && (
          <p className="text-sm text-red-500 mt-1">{errors.industryName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Departments</label>
        <input
          {...register('departments', { required: 'At least one department is required' })}
          className="w-full p-2 border rounded-md"
          placeholder="Enter departments (comma-separated)"
        />
        {errors.departments && (
          <p className="text-sm text-red-500 mt-1">{errors.departments.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Audit Areas</label>
        <input
          {...register('auditAreas', { required: 'At least one audit area is required' })}
          className="w-full p-2 border rounded-md"
          placeholder="Enter audit areas (comma-separated)"
        />
        {errors.auditAreas && (
          <p className="text-sm text-red-500 mt-1">{errors.auditAreas.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Industry
      </Button>
    </form>
  );
};