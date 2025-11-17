import { createClient } from '@supabase/supabase-js'

const URL = 'https://wcosgampvitjnfrulxmz.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjb3NnYW1wdml0am5mcnVseG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzUyMjAsImV4cCI6MjA3ODQ1MTIyMH0.XzOi2pFWpO9RB2-znqS7dx1wxsYXWx1anL5uZ2KIyVc'

export const supabase = createClient(URL, API_KEY)