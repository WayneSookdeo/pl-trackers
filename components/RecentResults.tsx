type Match = {
    id: number
    home_team_name: string
    away_team_name: string
    home_score: number
    away_score: number
    matchday: number
    match_date: string
    status: string
  }
  
  export default function RecentResults({ results }: { results: Match[] }) {
    if (!results.length) {
      return (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center text-gray-600 text-sm">
          No results yet
        </div>
      )
    }
  
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-white">Recent Results</h2>
          <p className="text-xs text-gray-500 mt-0.5">Last 10 matches</p>
        </div>
  
        <div className="divide-y divide-gray-800/50">
          {results.map((match) => {
            const homeWin = match.home_score > match.away_score
            const awayWin = match.away_score > match.home_score
            const draw = match.home_score === match.away_score
  
            return (
              <div key={match.id} className="px-5 py-3 hover:bg-gray-800/40 transition-colors">
                <div className="flex items-center justify-between gap-4">
  
                  {/* Home team */}
                  <div className="flex-1 text-right">
                    <span className={`text-sm font-medium ${homeWin ? 'text-white' : 'text-gray-400'}`}>
                      {match.home_team_name}
                    </span>
                  </div>
  
                  {/* Score */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-lg font-bold w-6 text-right ${homeWin ? 'text-white' : 'text-gray-400'}`}>
                      {match.home_score}
                    </span>
                    <span className="text-gray-600 text-sm">—</span>
                    <span className={`text-lg font-bold w-6 text-left ${awayWin ? 'text-white' : 'text-gray-400'}`}>
                      {match.away_score}
                    </span>
                  </div>
  
                  {/* Away team */}
                  <div className="flex-1 text-left">
                    <span className={`text-sm font-medium ${awayWin ? 'text-white' : 'text-gray-400'}`}>
                      {match.away_team_name}
                    </span>
                  </div>
  
                </div>
  
                {/* Meta */}
                <div className="flex justify-center mt-1">
                  <span className="text-xs text-gray-600">
                    Matchday {match.matchday} · {new Date(match.match_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }