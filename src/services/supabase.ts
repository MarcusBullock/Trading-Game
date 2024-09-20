import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://huptsniexodrjwxjhhkb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cHRzbmlleG9kcmp3eGpoaGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1MjEyMzMsImV4cCI6MjA0MjA5NzIzM30.98Lt9aX82357eX7Jzq3JYaTnN7uleOXaDuRmk67j1bc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);