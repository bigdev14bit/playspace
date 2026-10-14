import { useEffect, useState } from 'react'
import { Board } from './components/Board'
import { StatusBar } from './components/StatusBar'
import { ModePicker, type GameMode } from './components/ModePicker'
import { getAIMove } from './game/ai'
import { createEmptyBoard, getNextPlayer, getWinner, getWinningLine, isDraw } from './game/logic'
import type { Board as BoardType, GameStatus, Player, Winner } from './game/types'

const HUMAN: Player = 'X'
const AI: Player = 'O'

export default function App() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [status, setStatus] = useState<GameStatus>('playing')
  const [winner, setWinner] = useState<Winner>(null)
  const [mode, setMode] = useState<GameMode>('local')

  const winningLine = status === 'won' ? getWinningLine(board) : null
  const isAITurn = mode !== 'local' && currentPlayer === AI && status === 'playing'

  // ----- Game flow -----
  function applyMove(board: BoardType, index: number, player: Player): BoardType {
    const next = [...board]
    next[index] = player
    return next
  }

  function resolveAfterMove(next: BoardType, player: Player) {
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
    setCurrentPlayer(getNextPlayer(player))
  }

  function handleCellClick(index: number) {
    if (status !== 'playing' || board[index] !== null) return
    if (mode !== 'local' && currentPlayer === AI) return  // block during AI turn
    resolveAfterMove(applyMove(board, index, currentPlayer), currentPlayer)
  }

  // ----- AI turn -----
  useEffect(() => {
    if (!isAITurn) return
    const delay = 400 + Math.random() * 300  // small "thinking" delay
    const t = setTimeout(() => {
      const move = getAIMove(board, mode as 'easy' | 'medium' | 'impossible')
      resolveAfterMove(applyMove(board, move, AI), AI)
    }, delay)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAITurn, board])

  // ----- Reset -----
  function handleReset() {
    setBoard(createEmptyBoard())
    setCurrentPlayer('X')
    setStatus('playing')
    setWinner(null)
  }

  function handleModeChange(next: GameMode) {
    setMode(next)
    setBoard(createEmptyBoard())
    setCurrentPlayer(HUMAN)
    setStatus('playing')
    setWinner(null)
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-slate-100">Playspace · Tic-Tac-Toe</h1>

      <ModePicker mode={mode} onChange={handleModeChange} />

      <Board
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        disabled={status !== 'playing' || (mode !== 'local' && currentPlayer === AI)}
      />

      <StatusBar
        status={status}
        currentPlayer={currentPlayer}
        winner={winner}
        onReset={handleReset}
      />

      {mode !== 'local' && (
        <p className="text-xs text-slate-500">You are X · AI is O</p>
      )}
    </main>
  )
}
