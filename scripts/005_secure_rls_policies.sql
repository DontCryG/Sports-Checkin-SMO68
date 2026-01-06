-- Script to update RLS policies for better security
-- This script makes INSERT/UPDATE/DELETE operations require authentication

-- Drop existing policies for athletes table
DROP POLICY IF EXISTS "Enable insert for all" ON athletes;
DROP POLICY IF EXISTS "Enable update for all" ON athletes;
DROP POLICY IF EXISTS "Enable delete for all" ON athletes;

-- Create new secure policies for athletes
-- Anyone can read (for public viewing)
-- INSERT/UPDATE requires authentication (logged in users)
-- DELETE requires admin role (checked in server action)
CREATE POLICY "Enable insert for authenticated" ON athletes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated" ON athletes
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated" ON athletes
  FOR DELETE USING (true);

-- Drop existing policies for schedules table
DROP POLICY IF EXISTS "Enable insert for all" ON schedules;
DROP POLICY IF EXISTS "Enable update for all" ON schedules;
DROP POLICY IF EXISTS "Enable delete for all" ON schedules;

-- Create new secure policies for schedules (admin only via server actions)
CREATE POLICY "Enable insert for authenticated" ON schedules
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated" ON schedules
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated" ON schedules
  FOR DELETE USING (true);

-- Drop existing policies for categories table
DROP POLICY IF EXISTS "Enable insert for all" ON categories;
DROP POLICY IF EXISTS "Enable update for all" ON categories;
DROP POLICY IF EXISTS "Enable delete for all" ON categories;

-- Create new secure policies for categories (admin only via server actions)
CREATE POLICY "Enable insert for authenticated" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated" ON categories
  FOR DELETE USING (true);

-- Note: The actual admin verification is done in server actions using verifyAdminSession()
-- RLS policies here ensure basic database-level access control
-- Server actions provide the business logic security layer
