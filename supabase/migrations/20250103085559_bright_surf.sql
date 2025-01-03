/*
  # Fix profiles RLS policies

  1. Changes
    - Add insert policy for profiles table to allow new user registration
    
  2. Security
    - Allow authenticated users to insert their own profile
    - Ensure users can only insert a profile with their own user ID
*/

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);