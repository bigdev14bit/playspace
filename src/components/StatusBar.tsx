import { FaTrophy, FaHandshake, FaUser } from 'react-icons/fa6'
import type { GameStatus, Player, Winner } from '../game/types'

interface StatusBarProps {
  status: GameStatus
  currentPlayer: Player
  winner: Winner
  onReset: () => void
}

export function StatusBar({ status, currentPlayer, winner, onReset }: StatusBarProps) {
  let icon: React.ReactNode
  let message: string

  if (status === 'won') {
    icon = <FaTrophy className="h-5 w-5 text-amber-400" />
    message = `Player ${winner} wins!`
  } else if (status === 'draw') {
    icon = <FaHandshake className="h-5 w-5 text-slate-300" />
    message = "It's a draw!"
  } else {
    icon = <FaUser className="h-5 w-5 text-sky-400" />
    message = `Player ${currentPlayer}'s turn`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="flex items-center gap-2 text-xl font-semibold text-slate-200">
        {icon}
        {message}
      </p>
      <button
        onClick={onReset}
        className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-500 transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
