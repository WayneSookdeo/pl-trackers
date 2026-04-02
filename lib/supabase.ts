import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://povltipkzvuzjlltlppp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdmx0aXBrenZ1empsbHRscHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTk3NDIsImV4cCI6MjA5MDczNTc0Mn0.8FSoEgwuFATDZxQ1WGYWb8-p0Ex0dzfhZuuPT4xOP4I'
)