type Standing = {
    team_id: number
    team_name: string
    position: number
    played: number
    won: number
    drawn: number
    lost: number
    goals_for: number
    goals_against: number
    goal_difference: number
    points: number
    form: string | null
  }
  
  function FormBadge({ result }: { result: string }) {
    const colors: Record<string, string> = {
      W: 'bg-green-500',
      D: 'bg-yellow-500',
      L: 'bg-red-500',
    }
    return (
      <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white ${colors[result] ?? 'bg-gray-600'}`}>
        {result}
      </span>
    )
  }
  
  export default function Standings({ standings }: { standings: Standing[] }) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-white">League Table</h2>
          <p className="text-xs text-gray-500 mt-0.5">Top 5</p>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-800">
                <th className="text-left px-5 py-2">#</th>
                <th className="text-left px-2 py-2">Team</th>
                <th className="text-center px-2 py-2">P</th>
                <th className="text-center px-2 py-2">W</th>
                <th className="text-center px-2 py-2">D</th>
                <th className="text-center px-2 py-2">L</th>
                <th className="text-center px-2 py-2">GD</th>
                <th className="text-center px-2 py-2 font-bold text-white">Pts</th>
                <th className="text-center px-3 py-2 hidden md:table-cell">Form</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={team.team_id}
                  className={`border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors
                    ${index === standings.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="px-5 py-3 text-gray-400 text-xs">{team.position}</td>
                  <td className="px-2 py-3">
                    <span className="font-medium text-sm">{team.team_name}</span>
                  </td>
                  <td className="px-2 py-3 text-center text-gray-400 text-xs">{team.played}</td>
                  <td className="px-2 py-3 text-center text-green-400 text-xs">{team.won}</td>
                  <td className="px-2 py-3 text-center text-yellow-400 text-xs">{team.drawn}</td>
                  <td className="px-2 py-3 text-center text-red-400 text-xs">{team.lost}</td>
                  <td className="px-2 py-3 text-center text-gray-400 text-xs">
                    {Number(team.goal_difference) > 0 ? `+${team.goal_difference}` : team.goal_difference}
                  </td>
                  <td className="px-2 py-3 text-center font-bold">{team.points}</td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    {team.form ? (
                      <div className="flex gap-1 justify-center">
                        {team.form.split(',').slice(-5).map((r, i) => (
                          <FormBadge key={i} result={r.trim()} />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }