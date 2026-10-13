import type { Cell } from '../game/types'

interface SquareProps {
  value: Cell
  onClick: () => void
  isWinning: boolean
  disabled: boolean
}

export function Square({ value, onClick, isWinning, disabled }: SquareProps) {
  const base =
    'h-24 w-24 text-4xl font-bold flex items-center justify-center rounded-lg transition-colors select-none'
  const state = isWinning
    ? 'bg-green-500 text-white'
    : value === 'X'
      ? 'bg-slate-800 text-sky-400'
      : value === 'O'
        ? 'bg-slate-800 text-rose-400'
        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'

  return (
    <button
      className={`${base} ${state} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}
