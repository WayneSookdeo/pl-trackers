type Match = {
    id: number
    home_team_name: string
    away_team_name: string
    matchday: number
    match_date: string
    status: string
  }
  
  export default function UpcomingFixtures({ fixtures }: { fixtures: Match[] }) {
    if (!fixtures.length) {
      return (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center text-gray-600 text-sm">
          No upcoming fixtures
        </div>
      )
    }
  
    // Group by date
    const grouped = fixtures.reduce((acc: Record<string, Match[]>, match) => {
      const date = new Date(match.match_date).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
      if (!acc[date]) acc[date] = []
      acc[date].push(match)
      return acc
    }, {})
  
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-white">Upcoming Fixtures</h2>
          <p className="text-xs text-gray-500 mt-0.5">Matchday {fixtures[0]?.matchday}</p>
        </div>
  
        <div className="divide-y divide-gray-800/50">
          {Object.entries(grouped).map(([date, matches]) => (
            <div key={date}>
              {/* Date header */}
              <div className="px-5 py-2 bg-gray-800/30">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{date}</p>
              </div>
  
              {/* Matches for this date */}
              {matches.map((match) => (
                <div key={match.id} className="px-5 py-3 hover:bg-gray-800/40 transition-colors">
                  <div className="flex items-center justify-between gap-4">
  
                    {/* Home team */}
                    <div className="flex-1 text-right">
                      <span className="text-sm font-medium text-white">{match.home_team_name}</span>
                    </div>
  
                    {/* Time */}
                    <div className="shrink-0 text-center">
                      <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
                        {new Date(match.match_date).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
  
                    {/* Away team */}
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-white">{match.away_team_name}</span>
                    </div>
  
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }