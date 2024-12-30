import { z } from 'zod';

export const messageReqSchema = z.object({

  message: z.string().min(1),
  sender: z.string().min(1),
});

export interface CreateBody {
  body: z.infer<typeof messageReqSchema>
}