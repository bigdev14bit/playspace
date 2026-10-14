import { getWinner, getNextPlayer } from './logic'
import type { Board, Player } from './types'

export type Difficulty = 'easy' | 'medium' | 'impossible'

const HUMAN: Player = 'X'
const AI: Player = 'O'

/** All empty cell indexes */
function emptyCells(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, i) => {
    if (cell === null) acc.push(i)
    return acc
  }, [])
}

/** Classic minimax. Returns the score of a board from the AI's perspective. */
function minimax(board: Board, currentPlayer: Player, depth: number): number {
  const winner = getWinner(board)

  if (winner === AI) return 10 - depth     // AI wins sooner = better
  if (winner === HUMAN) return depth - 10  // Human wins later = less bad
  if (emptyCells(board).length === 0) return 0

  const scores = emptyCells(board).map((i) => {
    const next = [...board]
    next[i] = currentPlayer
    return minimax(next, getNextPlayer(currentPlayer), depth + 1)
  })

  return currentPlayer === AI ? Math.max(...scores) : Math.min(...scores)
}

/** Best move for the AI using minimax. */
export function bestMove(board: Board): number {
  let bestScore = -Infinity
  let move = -1

  for (const i of emptyCells(board)) {
    const next = [...board]
    next[i] = AI
    const score = minimax(next, HUMAN, 0)
    if (score > bestScore) {
      bestScore = score
      move = i
    }
  }
  return move
}

/** Random legal move — used for Easy mode. */
export function randomMove(board: Board): number {
  const cells = emptyCells(board)
  return cells[Math.floor(Math.random() * cells.length)]
}

/**
 * Medium: plays perfectly ~50% of the time, random otherwise.
 * Feels beatable but not dumb.
 */
export function mediumMove(board: Board): number {
  return Math.random() < 0.5 ? bestMove(board) : randomMove(board)
}

export function getAIMove(board: Board, difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':
      return randomMove(board)
    case 'medium':
      return mediumMove(board)
    case 'impossible':
      return bestMove(board)
  }
}
