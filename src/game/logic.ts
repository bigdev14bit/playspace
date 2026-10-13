import { BOARD_SIZE, WINNING_LINES } from './constants'
import type { Board, Player, Winner } from './types'

export function createEmptyBoard(): Board {
  return Array<null>(BOARD_SIZE).fill(null)
}

export function getWinner(board: Board): Winner {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  return null
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && getWinner(board) === null
}

export function getWinningLine(board: Board): number[] | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line
    }
  }
  return null
}

export function getNextPlayer(current: Player): Player {
  return current === 'X' ? 'O' : 'X'
}
