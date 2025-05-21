import React from 'react';
import { useForm } from 'react-hook-form';
import { Cruncher } from '../../types';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';

interface CruncherFormProps {
  onSubmit: (data: CruncherFormData) => void;
  initialData?: Partial<Cruncher>;
  isLoading?: boolean;
}

export interface CruncherFormData {
  name: string;
  modelKey: string;
  modelName: string;
  systemPrompt: string;
  sitemapUrl: string;
}

export const CruncherForm: React.FC<CruncherFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CruncherFormData>({
    defaultValues: {
      name: initialData?.name || '',
      modelKey: '', // We don't show the encrypted key for security
      modelName: initialData?.modelName || 'gpt-4-turbo',
      systemPrompt: initialData?.systemPrompt || 'You are a helpful AI assistant that provides accurate information based on the crawled content.',
      sitemapUrl: initialData?.sitemapUrl || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Cruncher Name"
        placeholder="My Documentation Cruncher"
        fullWidth
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
      />

      <Input
        label="Model Key"
        type="password"
        placeholder="Your API key for the LLM"
        fullWidth
        {...register('modelKey', { required: 'Model Key is required' })}
        error={errors.modelKey?.message}
      />

      <Input
        label="Model Name"
        placeholder="gpt-4-turbo"
        fullWidth
        {...register('modelName', { required: 'Model Name is required' })}
        error={errors.modelName?.message}
      />

      <TextArea
        label="System Prompt"
        placeholder="You are a helpful AI assistant..."
        rows={4}
        fullWidth
        {...register('systemPrompt', { required: 'System Prompt is required' })}
        error={errors.systemPrompt?.message}
      />

      <Input
        label="Sitemap URL"
        placeholder="https://example.com/sitemap.xml"
        fullWidth
        {...register('sitemapUrl', { 
          required: 'Sitemap URL is required',
          pattern: {
            value: /^(http|https):\/\/[^ "]+$/,
            message: 'Enter a valid URL'
          }
        })}
        error={errors.sitemapUrl?.message}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        fullWidth
      >
        {initialData ? 'Update Cruncher' : 'Create Cruncher'}
      </Button>
    </form>
  );
};
