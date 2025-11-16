export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="px-4 py-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">เกี่ยวกับระบบ</h3>
            <p className="text-xs text-muted-foreground">ระบบเช็คชื่อนักกีฬาสำหรับการจัดการการเข้าร่วมกิจกรรมกีฬาต่างๆ</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">ติดต่อเรา</h3>
            <p className="text-xs text-muted-foreground">
              อีเมล: tananattapat.wong@bu.ac.th
              <br />
              โทร: 061-202-3553
            </p>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="mb-2 text-sm font-semibold text-foreground">ลิงก์ที่เป็นประโยชน์</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>คู่มือการใช้งาน</li>
              <li>กฎกติกากีฬา</li>
              <li>ตารางการแข่งขัน</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
          © 2025 ระบบเช็คชื่อกีฬา. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  )
}
