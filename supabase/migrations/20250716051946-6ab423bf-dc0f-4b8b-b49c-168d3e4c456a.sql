-- Create comments table for visitor messages
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert comments (public submissions)
CREATE POLICY "Anyone can submit comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading comments (for admin access)
CREATE POLICY "Anyone can view comments" 
ON public.comments 
FOR SELECT 
USING (true);