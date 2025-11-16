-- Create sports table
CREATE TABLE IF NOT EXISTS sports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id UUID NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  schedule_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  month TEXT NOT NULL,
  month_name TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create athletes table
CREATE TABLE IF NOT EXISTS athletes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  number TEXT NOT NULL,
  faculty TEXT NOT NULL,
  checked_in BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_categories_sport_id ON categories(sport_id);
CREATE INDEX IF NOT EXISTS idx_schedules_category_id ON schedules(category_id);
CREATE INDEX IF NOT EXISTS idx_schedules_month ON schedules(month);
CREATE INDEX IF NOT EXISTS idx_athletes_schedule_id ON athletes(schedule_id);
CREATE INDEX IF NOT EXISTS idx_athletes_checked_in ON athletes(checked_in);

-- Enable Row Level Security
ALTER TABLE sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view)
CREATE POLICY "Anyone can view sports" ON sports FOR SELECT USING (true);
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view schedules" ON schedules FOR SELECT USING (true);
CREATE POLICY "Anyone can view athletes" ON athletes FOR SELECT USING (true);

-- Create policies for write access (anyone can update for now - can be restricted later)
CREATE POLICY "Anyone can insert sports" ON sports FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sports" ON sports FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete sports" ON sports FOR DELETE USING (true);

CREATE POLICY "Anyone can insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete categories" ON categories FOR DELETE USING (true);

CREATE POLICY "Anyone can insert schedules" ON schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update schedules" ON schedules FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete schedules" ON schedules FOR DELETE USING (true);

CREATE POLICY "Anyone can insert athletes" ON athletes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update athletes" ON athletes FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete athletes" ON athletes FOR DELETE USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_athletes_updated_at
  BEFORE UPDATE ON athletes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
