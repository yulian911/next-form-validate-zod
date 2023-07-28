import { createClient } from '@supabase/supabase-js';

export const client = createClient(process.env.NEXT_PUBLIC_URL, process.env.NEXT_PUBLIC_KEY);
