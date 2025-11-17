import { getFullSportsData } from "@/lib/actions/sports"
import { AdminWrapper } from "@/components/admin-wrapper"

export default async function AdminPage() {
  const sportsData = await getFullSportsData()
  
  return <AdminWrapper sportsData={sportsData} />
}
