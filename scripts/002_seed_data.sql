-- Insert sports data with generated UUIDs
-- Using gen_random_uuid() instead of string IDs
INSERT INTO sports (name, icon) VALUES
  ('บาสเกตบอล', '🏀'),
  ('ฟุตบอล', '⚽'),
  ('ฟุตซอล', '⚽'),
  ('วอลเลย์บอล', '🏐'),
  ('เปตอง', '🎯'),
  ('แบดมินตัน', '🏸'),
  ('E-Sport', '🎮');

-- Insert basketball categories
-- Using subquery to reference sport_id by name
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'บาสเกตบอล' LIMIT 1), 'บาสเกตบอล', '3v3', '🏀', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 16:00-17:30'),
  ((SELECT id FROM sports WHERE name = 'บาสเกตบอล' LIMIT 1), 'บาสเกตบอล', '5v5', '🏀', 'from-violet-600 to-violet-800', 'อังคาร-พฤหัส 17:00-19:00');

-- Insert football categories
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'ฟุตบอล' LIMIT 1), 'ฟุตบอล', 'ชาย', '⚽', 'from-purple-700 to-purple-900', 'จันทร์-ศุกร์ 16:00-18:00');

-- Insert futsal categories
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'ฟุตซอล' LIMIT 1), 'ฟุตซอล', 'ชาย', '⚽', 'from-fuchsia-600 to-fuchsia-800', 'พุธ-ศุกร์ 18:00-20:00');

-- Insert volleyball categories
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'วอลเลย์บอล' LIMIT 1), 'วอลเลย์บอล', 'ชาย', '🏐', 'from-purple-500 to-purple-700', 'อังคาร-พฤหัส 15:00-17:00'),
  ((SELECT id FROM sports WHERE name = 'วอลเลย์บอล' LIMIT 1), 'วอลเลย์บอล', 'หญิง', '🏐', 'from-violet-500 to-violet-700', 'พุธ-ศุกร์ 15:00-17:00');

-- Insert petanque categories
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'เปตอง' LIMIT 1), 'เปตอง', 'เดี่ยวชาย', '🎯', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 14:00-16:00'),
  ((SELECT id FROM sports WHERE name = 'เปตอง' LIMIT 1), 'เปตอง', 'เดี่ยวหญิง', '🎯', 'from-fuchsia-600 to-fuchsia-800', 'จันทร์-ศุกร์ 14:00-16:00'),
  ((SELECT id FROM sports WHERE name = 'เปตอง' LIMIT 1), 'เปตอง', 'คู่ชาย', '🎯', 'from-purple-700 to-purple-900', 'อังคาร-พฤหัส 14:00-16:00'),
  ((SELECT id FROM sports WHERE name = 'เปตอง' LIMIT 1), 'เปตอง', 'คู่หญิง', '🎯', 'from-violet-600 to-violet-800', 'อังคาร-พฤหัส 14:00-16:00'),
  ((SELECT id FROM sports WHERE name = 'เปตอง' LIMIT 1), 'เปตอง', 'คู่ผสม', '🎯', 'from-fuchsia-700 to-fuchsia-900', 'พุธ-ศุกร์ 14:00-16:00');

-- Insert badminton categories
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'แบดมินตัน' LIMIT 1), 'แบดมินตัน', 'เดี่ยวชาย', '🏸', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 18:00-20:00'),
  ((SELECT id FROM sports WHERE name = 'แบดมินตัน' LIMIT 1), 'แบดมินตัน', 'เดี่ยวหญิง', '🏸', 'from-violet-600 to-violet-800', 'จันทร์-ศุกร์ 18:00-20:00'),
  ((SELECT id FROM sports WHERE name = 'แบดมินตัน' LIMIT 1), 'แบดมินตัน', 'คู่ชาย', '🏸', 'from-fuchsia-600 to-fuchsia-800', 'อังคาร-พฤหัส 18:00-20:00'),
  ((SELECT id FROM sports WHERE name = 'แบดมินตัน' LIMIT 1), 'แบดมินตัน', 'คู่หญิง', '🏸', 'from-purple-700 to-purple-900', 'อังคาร-พฤหัส 18:00-20:00'),
  ((SELECT id FROM sports WHERE name = 'แบดมินตัน' LIMIT 1), 'แบดมินตัน', 'คู่ผสม', '🏸', 'from-violet-700 to-violet-900', 'พุธ-ศุกร์ 18:00-20:00');

-- Insert esport categories
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text) VALUES
  ((SELECT id FROM sports WHERE name = 'E-Sport' LIMIT 1), 'E-Sport', 'Valorant', '🎮', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 19:00-21:00'),
  ((SELECT id FROM sports WHERE name = 'E-Sport' LIMIT 1), 'E-Sport', 'ROV', '🎮', 'from-violet-600 to-violet-800', 'อังคาร-พฤหัส 19:00-21:00'),
  ((SELECT id FROM sports WHERE name = 'E-Sport' LIMIT 1), 'E-Sport', 'PUBG', '🎮', 'from-fuchsia-600 to-fuchsia-800', 'พุธ-ศุกร์ 19:00-21:00');

-- Insert sample schedules for basketball 3v3 (January)
-- Using subquery to get category_id for basketball 3v3
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = '3v3' AND name = 'บาสเกตบอล' LIMIT 1), '2025-01-15', '2025-01', 'มกราคม 2568', 'จันทร์', '16:00-17:30'),
  ((SELECT id FROM categories WHERE subcategory = '3v3' AND name = 'บาสเกตบอล' LIMIT 1), '2025-01-16', '2025-01', 'มกราคม 2568', 'อังคาร', '16:00-17:30'),
  ((SELECT id FROM categories WHERE subcategory = '3v3' AND name = 'บาสเกตบอล' LIMIT 1), '2025-01-22', '2025-01', 'มกราคม 2568', 'พุธ', '16:00-17:30');

-- Insert sample athletes for basketball 3v3
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'ธนพล สูงใหญ่', '23', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for basketball 5v5 (January)
-- Using subquery to get category_id for basketball 5v5
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = '5v5' AND name = 'บาสเกตบอล' LIMIT 1), '2025-01-17', '2025-01', 'มกราคม 2568', 'พุธ', '17:00-19:00'),
  ((SELECT id FROM categories WHERE subcategory = '5v5' AND name = 'บาสเกตบอล' LIMIT 1), '2025-01-18', '2025-01', 'มกราคม 2568', 'พฤหัส', '17:00-19:00'),
  ((SELECT id FROM categories WHERE subcategory = '5v5' AND name = 'บาสเกตบอล' LIMIT 1), '2025-01-19', '2025-01', 'มกราคม 2568', 'ศุกร์', '17:00-19:00');

-- Insert sample athletes for basketball 5v5
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-17' LIMIT 1), 'พีระ เด็กดี', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-17' LIMIT 1), 'สมเด็จ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-17' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '4', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-18' LIMIT 1), 'พีระ เด็กดี', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-18' LIMIT 1), 'สมเด็จ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-18' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '4', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-19' LIMIT 1), 'พีระ เด็กดี', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-19' LIMIT 1), 'สมเด็จ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-19' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '4', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for football (January)
-- Using subquery to get category_id for football
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตบอล' LIMIT 1), '2025-01-13', '2025-01', 'มกราคม 2568', 'ศุกร์', '16:00-18:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตบอล' LIMIT 1), '2025-01-14', '2025-01', 'มกราคม 2568', 'เสาร์', '16:00-18:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตบอล' LIMIT 1), '2025-01-15', '2025-01', 'มกราคม 2568', 'อาทิตย์', '16:00-18:00');

-- Insert sample athletes for football
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-13' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-13' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-13' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-14' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-14' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-14' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for futsal (January)
-- Using subquery to get category_id for futsal
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตซอล' LIMIT 1), '2025-01-16', '2025-01', 'มกราคม 2568', 'อังคาร', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตซอล' LIMIT 1), '2025-01-17', '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตซอล' LIMIT 1), '2025-01-18', '2025-01', 'มกราคม 2568', 'พฤหัส', '18:00-20:00');

-- Insert sample athletes for futsal
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-16' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-16' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-16' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-17' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-17' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-17' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-18' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-18' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-18' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for volleyball male (January)
-- Using subquery to get category_id for volleyball male
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'วอลเลย์บอล' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'เสาร์', '15:00-17:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'วอลเลย์บอล' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'อาทิตย์', '15:00-17:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'วอลเลย์บอล' LIMIT 1), '2025-01-12', '2025-01', 'มกราคม 2568', 'จันทร์', '15:00-17:00');

-- Insert sample athletes for volleyball male
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for volleyball female (January)
-- Using subquery to get category_id for volleyball female
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'หญิง' AND name = 'วอลเลย์บอล' LIMIT 1), '2025-01-13', '2025-01', 'มกราคม 2568', 'ศุกร์', '15:00-17:00'),
  ((SELECT id FROM categories WHERE subcategory = 'หญิง' AND name = 'วอลเลย์บอล' LIMIT 1), '2025-01-14', '2025-01', 'มกราคม 2568', 'เสาร์', '15:00-17:00'),
  ((SELECT id FROM categories WHERE subcategory = 'หญิง' AND name = 'วอลเลย์บอล' LIMIT 1), '2025-01-15', '2025-01', 'มกราคม 2568', 'อาทิตย์', '15:00-17:00');

-- Insert sample athletes for volleyball female
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-13' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-13' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-13' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-14' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-14' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-14' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-15' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for petanque individual male (January)
-- Using subquery to get category_id for petanque individual male
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'เปตอง' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'เปตอง' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '14:00-16:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'เปตอง' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '14:00-16:00');

-- Insert sample athletes for petanque individual male
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for petanque individual female (January)
-- Using subquery to get category_id for petanque individual female
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'เปตอง' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'เปตอง' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '14:00-16:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'เปตอง' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '14:00-16:00');

-- Insert sample athletes for petanque individual female
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for petanque mixed pair (January)
-- Using subquery to get category_id for petanque mixed pair
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'เปตอง' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00'),
  ((SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'เปตอง' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'พฤหัส', '14:00-16:00'),
  ((SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'เปตอง' LIMIT 1), '2025-01-12', '2025-01', 'มกราคม 2568', 'ศุกร์', '14:00-16:00');

-- Insert sample athletes for petanque mixed pair
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for badminton individual male (January)
-- Using subquery to get category_id for badminton individual male
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '18:00-20:00');

-- Insert sample athletes for badminton individual male
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for badminton individual female (January)
-- Using subquery to get category_id for badminton individual female
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '18:00-20:00');

-- Insert sample athletes for badminton individual female
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for badminton mixed pair (January)
-- Using subquery to get category_id for badminton mixed pair
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'พฤหัส', '18:00-20:00'),
  ((SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'แบดมินตัน' LIMIT 1), '2025-01-12', '2025-01', 'มกราคม 2568', 'ศุกร์', '18:00-20:00');

-- Insert sample athletes for badminton mixed pair
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-12' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for esport Valorant (January)
-- Using subquery to get category_id for esport Valorant
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'Valorant' AND name = 'E-Sport' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '19:00-21:00'),
  ((SELECT id FROM categories WHERE subcategory = 'Valorant' AND name = 'E-Sport' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '19:00-21:00'),
  ((SELECT id FROM categories WHERE subcategory = 'Valorant' AND name = 'E-Sport' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '19:00-21:00');

-- Insert sample athletes for esport Valorant
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for esport ROV (January)
-- Using subquery to get category_id for esport ROV
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'ROV' AND name = 'E-Sport' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '19:00-21:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ROV' AND name = 'E-Sport' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '19:00-21:00'),
  ((SELECT id FROM categories WHERE subcategory = 'ROV' AND name = 'E-Sport' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '19:00-21:00');

-- Insert sample athletes for esport ROV
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);

-- Insert sample schedules for esport PUBG (January)
-- Using subquery to get category_id for esport PUBG
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time) VALUES
  ((SELECT id FROM categories WHERE subcategory = 'PUBG' AND name = 'E-Sport' LIMIT 1), '2025-01-09', '2025-01', 'มกราคม 2568', 'พุธ', '19:00-21:00'),
  ((SELECT id FROM categories WHERE subcategory = 'PUBG' AND name = 'E-Sport' LIMIT 1), '2025-01-10', '2025-01', 'มกราคม 2568', 'พฤหัส', '19:00-21:00'),
  ((SELECT id FROM categories WHERE subcategory = 'PUBG' AND name = 'E-Sport' LIMIT 1), '2025-01-11', '2025-01', 'มกราคม 2568', 'ศุกร์', '19:00-21:00');

-- Insert sample athletes for esport PUBG
-- Using subquery to get schedule_id for specific dates
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in) VALUES
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-09' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-10' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '1', 'คณะวิศวกรรมศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'พีระ เด็กดี', '2', 'คณะวิทยาศาสตร์', false),
  ((SELECT id FROM schedules WHERE date = '2025-01-11' LIMIT 1), 'สมเด็จ แข็งแกร่ง', '3', 'คณะวิศวกรรมศาสตร์', false);
