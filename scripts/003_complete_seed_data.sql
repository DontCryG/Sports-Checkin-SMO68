-- Complete seed data with all sports, categories, schedules, and athletes
-- Run this after 001_create_tables.sql

-- Clear existing data (optional, comment out if you want to keep existing data)
DELETE FROM athletes;
DELETE FROM schedules;
DELETE FROM categories;
DELETE FROM sports;

-- Insert all sports
INSERT INTO sports (name, icon) VALUES
  ('บาสเกตบอล', '🏀'),
  ('ฟุตบอล', '⚽'),
  ('ฟุตซอล', '⚽'),
  ('วอลเลย์บอล', '🏐'),
  ('เปตอง', '🎯'),
  ('แบดมินตัน', '🏸'),
  ('E-Sport', '🎮');

-- Insert basketball categories (3v3 and 5v5)
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'บาสเกตบอล', '3v3', '🏀', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 16:00-17:30'
FROM sports WHERE name = 'บาสเกตบอล';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'บาสเกตบอล', '5v5', '🏀', 'from-violet-600 to-violet-800', 'อังคาร-พฤหัส 17:00-19:00'
FROM sports WHERE name = 'บาสเกตบอล';

-- Insert football category
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'ฟุตบอล', 'ชาย', '⚽', 'from-purple-700 to-purple-900', 'จันทร์-ศุกร์ 16:00-18:00'
FROM sports WHERE name = 'ฟุตบอล';

-- Insert futsal category
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'ฟุตซอล', 'ชาย', '⚽', 'from-fuchsia-600 to-fuchsia-800', 'พุธ-ศุกร์ 18:00-20:00'
FROM sports WHERE name = 'ฟุตซอล';

-- Insert volleyball categories (men and women)
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'วอลเลย์บอล', 'ชาย', '🏐', 'from-purple-500 to-purple-700', 'อังคาร-พฤหัส 15:00-17:00'
FROM sports WHERE name = 'วอลเลย์บอล';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'วอลเลย์บอล', 'หญิง', '🏐', 'from-violet-500 to-violet-700', 'พุธ-ศุกร์ 15:00-17:00'
FROM sports WHERE name = 'วอลเลย์บอล';

-- Insert petanque categories (5 types)
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'เปตอง', 'เดี่ยวชาย', '🎯', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 14:00-16:00'
FROM sports WHERE name = 'เปตอง';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'เปตอง', 'เดี่ยวหญิง', '🎯', 'from-fuchsia-600 to-fuchsia-800', 'จันทร์-ศุกร์ 14:00-16:00'
FROM sports WHERE name = 'เปตอง';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'เปตอง', 'คู่ชาย', '🎯', 'from-purple-700 to-purple-900', 'อังคาร-พฤหัส 14:00-16:00'
FROM sports WHERE name = 'เปตอง';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'เปตอง', 'คู่หญิง', '🎯', 'from-violet-600 to-violet-800', 'อังคาร-พฤหัส 14:00-16:00'
FROM sports WHERE name = 'เปตอง';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'เปตอง', 'คู่ผสม', '🎯', 'from-fuchsia-700 to-fuchsia-900', 'พุธ-ศุกร์ 14:00-16:00'
FROM sports WHERE name = 'เปตอง';

-- Insert badminton categories (5 types)
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'แบดมินตัน', 'เดี่ยวชาย', '🏸', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 18:00-20:00'
FROM sports WHERE name = 'แบดมินตัน';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'แบดมินตัน', 'เดี่ยวหญิง', '🏸', 'from-violet-600 to-violet-800', 'จันทร์-ศุกร์ 18:00-20:00'
FROM sports WHERE name = 'แบดมินตัน';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'แบดมินตัน', 'คู่ชาย', '🏸', 'from-fuchsia-600 to-fuchsia-800', 'อังคาร-พฤหัส 18:00-20:00'
FROM sports WHERE name = 'แบดมินตัน';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'แบดมินตัน', 'คู่หญิง', '🏸', 'from-purple-700 to-purple-900', 'อังคาร-พฤหัส 18:00-20:00'
FROM sports WHERE name = 'แบดมินตัน';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'แบดมินตัน', 'คู่ผสม', '🏸', 'from-violet-700 to-violet-900', 'พุธ-ศุกร์ 18:00-20:00'
FROM sports WHERE name = 'แบดมินตัน';

-- Insert E-Sport categories (3 types)
INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'E-Sport', 'Valorant', '🎮', 'from-purple-600 to-purple-800', 'จันทร์-ศุกร์ 19:00-21:00'
FROM sports WHERE name = 'E-Sport';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'E-Sport', 'ROV', '🎮', 'from-violet-600 to-violet-800', 'อังคาร-พฤหัส 19:00-21:00'
FROM sports WHERE name = 'E-Sport';

INSERT INTO categories (sport_id, name, subcategory, icon, color, schedule_text)
SELECT id, 'E-Sport', 'PUBG', '🎮', 'from-fuchsia-600 to-fuchsia-800', 'พุธ-ศุกร์ 19:00-21:00'
FROM sports WHERE name = 'E-Sport';

-- Cast date strings to DATE type using ::date
-- Basketball 3v3 Schedules (January)
WITH basketball_3v3 AS (
  SELECT id FROM categories WHERE subcategory = '3v3' AND name = 'บาสเกตบอล' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-01-22'::date, '2025-01', 'มกราคม 2568', 'พุธ', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-02-05'::date, '2025-02', 'กุมภาพันธ์ 2568', 'จันทร์', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-02-06'::date, '2025-02', 'กุมภาพันธ์ 2568', 'อังคาร', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-02-12'::date, '2025-02', 'กุมภาพันธ์ 2568', 'พุธ', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-03-04'::date, '2025-03', 'มีนาคม 2568', 'จันทร์', '16:00-17:30' FROM basketball_3v3
UNION ALL
SELECT id, '2025-03-05'::date, '2025-03', 'มีนาคม 2568', 'อังคาร', '16:00-17:30' FROM basketball_3v3;

-- Basketball 3v3 Athletes for each schedule
WITH schedule_ids AS (
  SELECT s.id, s.date 
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = '3v3' AND c.name = 'บาสเกตบอล'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะเทคโนโลยีสารสนเทศและนวัฒกรรม', false FROM schedule_ids WHERE date = '2025-01-15'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-01-15'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-01-15'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-01-16'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-01-16'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-01-16'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-01-22'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-01-22'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-01-22'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-02-05'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-02-05'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-02-05'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-02-06'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-02-06'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-02-06'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-02-12'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-02-12'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-02-12'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-03-04'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-03-04'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-03-04'::date
UNION ALL
SELECT id, 'ธนพล สูงใหญ่', '23', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-03-05'::date
UNION ALL
SELECT id, 'กิตติ ยิงแม่น', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids WHERE date = '2025-03-05'::date
UNION ALL
SELECT id, 'ชัยวัฒน์ กระโดดสูง', '15', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids WHERE date = '2025-03-05'::date;

-- Basketball 5v5 Schedules
WITH basketball_5v5 AS (
  SELECT id FROM categories WHERE subcategory = '5v5' AND name = 'บาสเกตบอล' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-02-06'::date, '2025-02', 'กุมภาพันธ์ 2568', 'อังคาร', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-02-07'::date, '2025-02', 'กุมภาพันธ์ 2568', 'พุธ', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-02-08'::date, '2025-02', 'กุมภาพันธ์ 2568', 'พฤหัสบดี', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-03-05'::date, '2025-03', 'มีนาคม 2568', 'อังคาร', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-03-06'::date, '2025-03', 'มีนาคม 2568', 'พุธ', '17:00-19:00' FROM basketball_5v5
UNION ALL
SELECT id, '2025-03-07'::date, '2025-03', 'มีนาคม 2568', 'พฤหัสบดี', '17:00-19:00' FROM basketball_5v5;

-- Basketball 5v5 Athletes
WITH schedule_ids AS (
  SELECT s.id, s.date
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = '5v5' AND c.name = 'บาสเกตบอล'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'อนุชา ส่งบอล', '7', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'วีระ ดีเฟนส์', '11', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สมชาย รีบาวด์', '33', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ประยุทธ์ วิ่งเร็ว', '5', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'ธีรพงษ์ ควบคุม', '1', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Football Schedules
WITH football AS (
  SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตบอล' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '16:00-18:00' FROM football
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '16:00-18:00' FROM football;

-- Football Athletes
WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'ชาย' AND c.name = 'ฟุตบอล'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สมชาย ใจดี', '10', 'คณะแพทยศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วีระ แข็งแรง', '9', 'คณะนิติศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ประยุทธ์ วิ่งเร็ว', '11', 'คณะแพทยศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สุรชัย เตะแม่น', '8', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธนากร ป้องกัน', '4', 'คณะนิติศาสตร์', false FROM schedule_ids;

-- Futsal Schedules
WITH futsal AS (
  SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'ฟุตซอล' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00' FROM futsal
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '18:00-20:00' FROM futsal
UNION ALL
SELECT id, '2025-01-19'::date, '2025-01', 'มกราคม 2568', 'ศุกร์', '18:00-20:00' FROM futsal;

-- Futsal Athletes
WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'ชาย' AND c.name = 'ฟุตซอล'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ปฏิภาณ วอล์คควบกล้ำ', '7', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'ธีรศักดิ์ คิคดี', '10', 'คณะวิทยาศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'นพดล ดริบเบิ้ล', '11', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สิทธิชัย ยิงสวย', '9', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids;

-- Volleyball Men
WITH volleyball_men AS (
  SELECT id FROM categories WHERE subcategory = 'ชาย' AND name = 'วอลเลย์บอล' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '15:00-17:00' FROM volleyball_men
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '15:00-17:00' FROM volleyball_men
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '15:00-17:00' FROM volleyball_men;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'ชาย' AND c.name = 'วอลเลย์บอล'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สมศักดิ์ ตบแรง', '4', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วิชัย บล็อกสูง', '12', 'คณะนิติศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธนากร เซิร์ฟแรง', '9', 'คณะวิทยาศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ชัยวัฒน์ รับดี', '6', 'คณะศิลปศาสตร์', false FROM schedule_ids;

-- Volleyball Women
WITH volleyball_women AS (
  SELECT id FROM categories WHERE subcategory = 'หญิง' AND name = 'วอลเลย์บอล' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '15:00-17:00' FROM volleyball_women
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '15:00-17:00' FROM volleyball_women
UNION ALL
SELECT id, '2025-01-19'::date, '2025-01', 'มกราคม 2568', 'ศุกร์', '15:00-17:00' FROM volleyball_women;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'หญิง' AND c.name = 'วอลเลย์บอล'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สุภาพร ตบสวย', '8', 'คณะพยาบาลศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วิภาวี รับดี', '3', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'กมลชนก เซิร์ฟแม่น', '11', 'คณะแพทยศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธัญญาลักษณ์ บล็อกสูง', '5', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Badminton Single Men
WITH badminton_single_men AS (
  SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'แบดมินตัน' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '18:00-20:00' FROM badminton_single_men
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '18:00-20:00' FROM badminton_single_men
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00' FROM badminton_single_men;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'เดี่ยวชาย' AND c.name = 'แบดมินตัน'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ธนากร สแมชแรง', '12', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วีระ ดรอปสวย', '7', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'ปฏิพล เซิร์ฟดี', '9', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Badminton Single Women
WITH badminton_single_women AS (
  SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'แบดมินตัน' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '18:00-20:00' FROM badminton_single_women
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '18:00-20:00' FROM badminton_single_women
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00' FROM badminton_single_women;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'เดี่ยวหญิง' AND c.name = 'แบดมินตัน'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สุภาพร เคลียร์สวย', '4', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธัญญาลักษณ์ ฉีกแรง', '8', 'คณะพยาบาลศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วิภาวี เล่นไว', '11', 'คณะแพทยศาสตร์', false FROM schedule_ids;

-- Badminton Double Men
WITH badminton_double_men AS (
  SELECT id FROM categories WHERE subcategory = 'คู่ชาย' AND name = 'แบดมินตัน' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '18:00-20:00' FROM badminton_double_men
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00' FROM badminton_double_men
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '18:00-20:00' FROM badminton_double_men;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'คู่ชาย' AND c.name = 'แบดมินตัน'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สมชาย คู่ใจ', '6', 'คณะนิติศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธนากร เล่นคู่', '10', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'ชัยวัฒน์ ประสาน', '5', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วิชัย เข้าจังหวะ', '8', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Badminton Double Women
WITH badminton_double_women AS (
  SELECT id FROM categories WHERE subcategory = 'คู่หญิง' AND name = 'แบดมินตัน' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '18:00-20:00' FROM badminton_double_women
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00' FROM badminton_double_women
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '18:00-20:00' FROM badminton_double_women;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'คู่หญิง' AND c.name = 'แบดมินตัน'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'กมลชนก สวยเล่น', '7', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'นภาภรณ์ เล่นเก่ง', '3', 'คณะพยาบาลศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ปภาวดี ทีมเวิร์ค', '9', 'คณะแพทยศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สิริยา เล่นกัน', '12', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Badminton Mixed Double
WITH badminton_mixed AS (
  SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'แบดมินตัน' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '18:00-20:00' FROM badminton_mixed
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '18:00-20:00' FROM badminton_mixed
UNION ALL
SELECT id, '2025-01-19'::date, '2025-01', 'มกราคม 2568', 'ศุกร์', '18:00-20:00' FROM badminton_mixed;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'คู่ผสม' AND c.name = 'แบดมินตัน'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ธนากร เล่นคู่', '10', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'สุภาพร แคปเปิล', '4', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วิชัย ประสาน', '7', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธัญญาลักษณ์ เข้าใจ', '8', 'คณะพยาบาลศาสตร์', false FROM schedule_ids;

-- Petanque Single Men
WITH petanque_single_men AS (
  SELECT id FROM categories WHERE subcategory = 'เดี่ยวชาย' AND name = 'เปตอง' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '14:00-16:00' FROM petanque_single_men
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '14:00-16:00' FROM petanque_single_men
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00' FROM petanque_single_men;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'เดี่ยวชาย' AND c.name = 'เปตอง'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สมชาย โยนแม่น', '5', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธนากร เล่นเก่ง', '8', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'วิชัย ยิงดี', '12', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Petanque Single Women
WITH petanque_single_women AS (
  SELECT id FROM categories WHERE subcategory = 'เดี่ยวหญิง' AND name = 'เปตอง' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '14:00-16:00' FROM petanque_single_women
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '14:00-16:00' FROM petanque_single_women
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00' FROM petanque_single_women;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'เดี่ยวหญิง' AND c.name = 'เปตอง'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'สุภาพร โยนสวย', '3', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'วิภาวี เล่นแม่น', '7', 'คณะพยาบาลศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'กมลชนก ยิงดี', '11', 'คณะแพทยศาสตร์', false FROM schedule_ids;

-- Petanque Double Men
WITH petanque_double_men AS (
  SELECT id FROM categories WHERE subcategory = 'คู่ชาย' AND name = 'เปตอง' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '14:00-16:00' FROM petanque_double_men
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00' FROM petanque_double_men
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '14:00-16:00' FROM petanque_double_men;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'คู่ชาย' AND c.name = 'เปตอง'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ชัยวัฒน์ ทีมเวิร์ค', '6', 'คณะนิติศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ประยุทธ์ คู่แท้', '9', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'ธีรศักดิ์ เล่นคู่', '4', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สิทธิชัย เข้าใจ', '10', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Petanque Double Women
WITH petanque_double_women AS (
  SELECT id FROM categories WHERE subcategory = 'คู่หญิง' AND name = 'เปตอง' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '14:00-16:00' FROM petanque_double_women
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00' FROM petanque_double_women
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '14:00-16:00' FROM petanque_double_women;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'คู่หญิง' AND c.name = 'เปตอง'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ธัญญาลักษณ์ คู่หู', '5', 'คณะพยาบาลศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'นภาภรณ์ เล่นเก่ง', '8', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ปภาวดี ประสาน', '12', 'คณะแพทยศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สิริยา โยนดี', '3', 'คณะวิทยาศาสตร์', false FROM schedule_ids;

-- Petanque Mixed Double
WITH petanque_mixed AS (
  SELECT id FROM categories WHERE subcategory = 'คู่ผสม' AND name = 'เปตอง' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '14:00-16:00' FROM petanque_mixed
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '14:00-16:00' FROM petanque_mixed
UNION ALL
SELECT id, '2025-01-19'::date, '2025-01', 'มกราคม 2568', 'ศุกร์', '14:00-16:00' FROM petanque_mixed;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'คู่ผสม' AND c.name = 'เปตอง'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'วิชัย คู่แท้', '7', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สุภาพร แคปเปิล', '4', 'คณะศิลปศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ธนากร เล่นคู่', '10', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'วิภาวี เข้าใจ', '9', 'คณะพยาบาลศาสตร์', false FROM schedule_ids;

-- E-Sport Valorant
WITH esport_valorant AS (
  SELECT id FROM categories WHERE subcategory = 'Valorant' AND name = 'E-Sport' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-15'::date, '2025-01', 'มกราคม 2568', 'จันทร์', '19:00-21:00' FROM esport_valorant
UNION ALL
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '19:00-21:00' FROM esport_valorant
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '19:00-21:00' FROM esport_valorant;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'Valorant' AND c.name = 'E-Sport'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ธนากร เล่นเอเจนท์', '77', 'คณะเทคโนโลยีสารสนเทศ', false FROM schedule_ids
UNION ALL
SELECT id, 'วิชัย เฮดช็อต', '88', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ชัยวัฒน์ แคร์รี่', '99', 'คณะวิทยาศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สมชาย ฟลาช', '55', 'คณะบริหารธุรกิจ', false FROM schedule_ids;

-- E-Sport ROV
WITH esport_rov AS (
  SELECT id FROM categories WHERE subcategory = 'ROV' AND name = 'E-Sport' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-16'::date, '2025-01', 'มกราคม 2568', 'อังคาร', '19:00-21:00' FROM esport_rov
UNION ALL
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '19:00-21:00' FROM esport_rov
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '19:00-21:00' FROM esport_rov;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'ROV' AND c.name = 'E-Sport'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ประยุทธ์ เล่นมิด', '11', 'คณะเทคโนโลยีสารสนเทศ', false FROM schedule_ids
UNION ALL
SELECT id, 'ธีรศักดิ์ จังเกิ้ล', '22', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'นพดล เล่นเทนค์', '33', 'คณะวิทยาศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สิทธิชัย ซัพพอร์ต', '44', 'คณะบริหารธุรกิจ', false FROM schedule_ids
UNION ALL
SELECT id, 'ปฏิพล เล่นเอดี', '55', 'คณะศิลปศาสตร์', false FROM schedule_ids;

-- E-Sport PUBG
WITH esport_pubg AS (
  SELECT id FROM categories WHERE subcategory = 'PUBG' AND name = 'E-Sport' LIMIT 1
)
INSERT INTO schedules (category_id, date, month, month_name, day_of_week, time)
SELECT id, '2025-01-17'::date, '2025-01', 'มกราคม 2568', 'พุธ', '19:00-21:00' FROM esport_pubg
UNION ALL
SELECT id, '2025-01-18'::date, '2025-01', 'มกราคม 2568', 'พฤหัสบดี', '19:00-21:00' FROM esport_pubg
UNION ALL
SELECT id, '2025-01-19'::date, '2025-01', 'มกราคม 2568', 'ศุกร์', '19:00-21:00' FROM esport_pubg;

WITH schedule_ids AS (
  SELECT s.id
  FROM schedules s
  JOIN categories c ON s.category_id = c.id
  WHERE c.subcategory = 'PUBG' AND c.name = 'E-Sport'
)
INSERT INTO athletes (schedule_id, name, number, faculty, checked_in)
SELECT id, 'ธนากร ยิงแม่น', '66', 'คณะเทคโนโลยีสารสนเทศ', false FROM schedule_ids
UNION ALL
SELECT id, 'วิชัย วาร์ปดี', '77', 'คณะวิศวกรรมศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'สมชาย ขับรถ', '88', 'คณะวิทยาศาสตร์', false FROM schedule_ids
UNION ALL
SELECT id, 'ชัยวัฒน์ ลูตเร็ว', '99', 'คณะบริหารธุรกิจ', false FROM schedule_ids;
