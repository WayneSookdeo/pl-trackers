type Prediction = {
    id: number
    home_team_name: string
    away_team_name: string
    match_date: string
    matchday: number
    prediction: string
    confidence: number
    predicted_score: string
    reasoning: string
  }
  
  function ConfidenceBar({ value }: { value: number }) {
    const color =
      value >= 70 ? 'bg-green-500' :
      value >= 50 ? 'bg-yellow-500' :
      'bg-red-400'
  
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-800 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${color}`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 w-8 text-right">{value}%</span>
      </div>
    )
  }
  
  function PredictionBadge({ prediction }: { prediction: string }) {
    const styles: Record<string, string> = {
      HOME: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      AWAY: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      DRAW: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    }
    const labels: Record<string, string> = {
      HOME: 'Home Win',
      AWAY: 'Away Win',
      DRAW: 'Draw',
    }
  
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[prediction] ?? 'bg-gray-700 text-gray-400'}`}>
        {labels[prediction] ?? prediction}
      </span>
    )
  }
  
  export default function Predictions({ predictions }: { predictions: Prediction[] }) {
    if (!predictions.length) {
      return (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center text-gray-600 text-sm">
          No predictions yet
        </div>
      )
    }
  
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <div>
              <h2 className="text-sm font-semibold text-white">AI Predictions</h2>
              <p className="text-xs text-gray-500 mt-0.5">Powered by Groq · Llama 3</p>
            </div>
          </div>
        </div>
  
        <div className="divide-y divide-gray-800/50">
          {predictions.map((match) => (
            <div key={match.id} className="px-5 py-4 hover:bg-gray-800/40 transition-colors">
  
              {/* Match header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-semibold text-white">{match.home_team_name}</span>
                  <span className="text-gray-600 text-xs">vs</span>
                  <span className="text-sm font-semibold text-white">{match.away_team_name}</span>
                </div>
                <span className="text-xs text-gray-500 shrink-0">
                  {new Date(match.match_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </div>
  
              {/* Prediction row */}
              <div className="flex items-center gap-3 mb-3">
                <PredictionBadge prediction={match.prediction} />
                <span className="text-xs text-gray-400">
                  Predicted score: <span className="text-white font-semibold">{match.predicted_score}</span>
                </span>
              </div>
  
              {/* Confidence bar */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Confidence</p>
                <ConfidenceBar value={match.confidence} />
              </div>
  
              {/* AI reasoning */}
              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-xs text-gray-400 leading-relaxed">{match.reasoning}</p>
              </div>
  
            </div>
          ))}
        </div>
      </div>
    )
  }