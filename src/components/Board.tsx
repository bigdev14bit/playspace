import { Square } from './Square'
import type { Board as BoardType } from '../game/types'

interface BoardProps {
  board: BoardType
  onCellClick: (index: number) => void
  winningLine: number[] | null
  disabled: boolean
}

export function Board({ board, onCellClick, winningLine, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, i) => (
        <Square
          key={i}
          value={cell}
          onClick={() => onCellClick(i)}
          isWinning={winningLine?.includes(i) ?? false}
          disabled={disabled || cell !== null}
        />
      ))}
    </div>
  )
}
