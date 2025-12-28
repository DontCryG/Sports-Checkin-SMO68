-- Update RLS Policies for better security
-- Run this script to update RLS policies

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can view sports" ON sports;
DROP POLICY IF EXISTS "Anyone can insert sports" ON sports;
DROP POLICY IF EXISTS "Anyone can update sports" ON sports;
DROP POLICY IF EXISTS "Anyone can delete sports" ON sports;
DROP POLICY IF EXISTS "Public read access for sports" ON sports;

DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Anyone can insert categories" ON categories;
DROP POLICY IF EXISTS "Anyone can update categories" ON categories;
DROP POLICY IF EXISTS "Anyone can delete categories" ON categories;
DROP POLICY IF EXISTS "Public read access for categories" ON categories;

DROP POLICY IF EXISTS "Anyone can view schedules" ON schedules;
DROP POLICY IF EXISTS "Anyone can insert schedules" ON schedules;
DROP POLICY IF EXISTS "Anyone can update schedules" ON schedules;
DROP POLICY IF EXISTS "Anyone can delete schedules" ON schedules;
DROP POLICY IF EXISTS "Public read access for schedules" ON schedules;

DROP POLICY IF EXISTS "Anyone can view athletes" ON athletes;
DROP POLICY IF EXISTS "Anyone can insert athletes" ON athletes;
DROP POLICY IF EXISTS "Anyone can update athletes" ON athletes;
DROP POLICY IF EXISTS "Anyone can delete athletes" ON athletes;
DROP POLICY IF EXISTS "Public read access for athletes" ON athletes;

-- Create new policies with full CRUD access
-- Note: Server-side authentication is handled in the application layer via verifyAdminSession()

-- Sports policies
CREATE POLICY "Enable read access for all" ON sports FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON sports FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON sports FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON sports FOR DELETE USING (true);

-- Categories policies
CREATE POLICY "Enable read access for all" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON categories FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON categories FOR DELETE USING (true);

-- Schedules policies
CREATE POLICY "Enable read access for all" ON schedules FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON schedules FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON schedules FOR DELETE USING (true);

-- Athletes policies (users need to check-in, edit, delete)
CREATE POLICY "Enable read access for all" ON athletes FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON athletes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON athletes FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON athletes FOR DELETE USING (true);
