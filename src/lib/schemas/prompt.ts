import { z } from 'zod';

export const PromptInputSchema = z.object({
  content: z.string()
    .min(1, 'Prompt cannot be empty')
    .max(10000, 'Prompt cannot exceed 10,000 characters'),
});

export type PromptInput = z.infer<typeof PromptInputSchema>;
