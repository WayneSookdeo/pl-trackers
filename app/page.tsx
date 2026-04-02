import { supabase } from '@/lib/supabase'
import Standings from '@/components/Standings'
import RecentResults from '@/components/RecentResults'
import UpcomingFixtures from '@/components/UpcomingFixtures'
import Predictions from '@/components/Predictions'

async function getStandings() {
  const { data, error } = await supabase
    .from('vw_latest_standings')
    .select('*')
    .order('position', { ascending: true })
  if (error) { console.error(error); return [] }
  return data
}

async function getRecentResults() {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'FINISHED')
    .order('match_date', { ascending: false })
    .limit(10)
  if (error) { console.error(error); return [] }
  return data
}

async function getUpcomingFixtures() {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'SCHEDULED')
    .order('match_date', { ascending: true })
    .limit(10)
  if (error) { console.error(error); return [] }
  return data
}

async function getPredictions() {
  const { data, error } = await supabase
    .from('vw_matches_with_predictions')
    .select('*')
    .eq('status', 'SCHEDULED')
    .not('prediction', 'is', null)
    .order('match_date', { ascending: true })
  if (error) { console.error(error); return [] }
  return data
}

export const revalidate = 3600

export default async function Home() {
  const [standings, results, fixtures, predictions] = await Promise.all([
    getStandings(),
    getRecentResults(),
    getUpcomingFixtures(),
    getPredictions(),
  ])

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Premier League</h1>
              <p className="text-xs text-gray-500">2025/26 Season · AI-powered predictions</p>
            </div>
          </div>
          <span className="text-xs text-gray-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            <UpcomingFixtures fixtures={fixtures} />
            <Predictions predictions={predictions} />
            <RecentResults results={results} />
          </div>

          {/* Right column */}
          <div>
            <Standings standings={standings} />
          </div>

        </div>
      </div>

    </main>
  )
}