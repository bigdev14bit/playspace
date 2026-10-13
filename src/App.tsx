import { useState } from 'react'
import { Board } from './components/Board'
import { StatusBar } from './components/StatusBar'
import { createEmptyBoard, getNextPlayer, getWinner, getWinningLine, isDraw } from './game/logic'
import type { Board as BoardType, GameStatus, Player, Winner } from './game/types'

export default function App() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [status, setStatus] = useState<GameStatus>('playing')
  const [winner, setWinner] = useState<Winner>(null)

  const winningLine = status === 'won' ? getWinningLine(board) : null

  function handleCellClick(index: number) {
    if (status !== 'playing' || board[index] !== null) return

    const next = [...board]
    next[index] = currentPlayer
    setBoard(next)

    const w = getWinner(next)
    if (w) {
      setWinner(w)
      setStatus('won')
      return
    }
    if (isDraw(next)) {
      setStatus('draw')
      return
    }
    setCurrentPlayer(getNextPlayer(currentPlayer))
  }

  function handleReset() {
    setBoard(createEmptyBoard())
    setCurrentPlayer('X')
    setStatus('playing')
    setWinner(null)
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-bold text-slate-100">Playspace · Tic-Tac-Toe</h1>
      <Board
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        disabled={status !== 'playing'}
      />
      <StatusBar
        status={status}
        currentPlayer={currentPlayer}
        winner={winner}
        onReset={handleReset}
      />
    </main>
  )
}
