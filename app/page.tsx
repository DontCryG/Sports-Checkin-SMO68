import { getFullSportsData } from "@/lib/actions/sports"
import { ClientWrapper } from "@/components/client-wrapper"

export default async function Page() {
  const sportsData = await getFullSportsData()

  return <ClientWrapper sportsData={sportsData} />
}
