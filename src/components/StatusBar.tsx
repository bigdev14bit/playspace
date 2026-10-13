import type { GameStatus, Player, Winner } from '../game/types'

interface StatusBarProps {
  status: GameStatus
  currentPlayer: Player
  winner: Winner
  onReset: () => void
}

export function StatusBar({ status, currentPlayer, winner, onReset }: StatusBarProps) {
  let message = ''
  if (status === 'won') message = `🎉 Player ${winner} wins!`
  else if (status === 'draw') message = "🤝 It's a draw!"
  else message = `Player ${currentPlayer}'s turn`

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl font-semibold text-slate-200">{message}</p>
      <button
        onClick={onReset}
        className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-500 transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
