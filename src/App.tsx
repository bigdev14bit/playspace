import { useEffect, useState } from 'react'
import { Board } from './components/Board'
import { StatusBar } from './components/StatusBar'
import { ModePicker, type GameMode } from './components/ModePicker'
import { AIBuddy } from './components/AIBuddy'
import { getAIMove } from './game/ai'
import type { AIMood } from './game/aiMood'
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

  const isAIGame = mode !== 'local'
  const isAITurn = isAIGame && currentPlayer === AI && status === 'playing'
  const winningLine = status === 'won' ? getWinningLine(board) : null

  // ----- AI mood derived from game state -----
  let aiMood: AIMood = 'idle'
  if (isAIGame) {
    if (status === 'won' && winner === AI) aiMood = 'happy'
    else if (status === 'won' && winner === HUMAN) aiMood = 'sad'
    else if (status === 'draw') aiMood = 'neutral'
    else if (isAITurn) aiMood = 'thinking'
    else aiMood = 'pleased'
  }

  // ----- Move helpers -----
  function applyMove(b: BoardType, index: number, player: Player): BoardType {
    const next = [...b]
    next[index] = player
    return next
  }

  function resolveAfterMove(next: BoardType, player: Player) {
    setBoard(next)
    const w = getWinner(next)
    if (w) { setWinner(w); setStatus('won'); return }
    if (isDraw(next)) { setStatus('draw'); return }
    setCurrentPlayer(getNextPlayer(player))
  }

  function handleCellClick(index: number) {
    if (status !== 'playing' || board[index] !== null) return
    if (isAIGame && currentPlayer === AI) return
    resolveAfterMove(applyMove(board, index, currentPlayer), currentPlayer)
  }

  // ----- AI turn -----
  useEffect(() => {
    if (!isAITurn) return
    const delay = 500 + Math.random() * 400
    const t = setTimeout(() => {
      const move = getAIMove(board, mode as 'easy' | 'medium' | 'impossible')
      resolveAfterMove(applyMove(board, move, AI), AI)
    }, delay)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAITurn, board])

  // ----- Reset / mode -----
  function handleReset() {
    setBoard(createEmptyBoard())
    setCurrentPlayer(HUMAN)
    setStatus('playing')
    setWinner(null)
  }

  function handleModeChange(next: GameMode) {
    setMode(next)
    handleReset()
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-slate-100">Playspace · Tic-Tac-Toe</h1>

      <ModePicker mode={mode} onChange={handleModeChange} />

      <div className="flex items-center gap-6">
        <Board
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          disabled={status !== 'playing' || (isAIGame && currentPlayer === AI)}
        />
        {isAIGame && <AIBuddy mood={aiMood} />}
      </div>

      <StatusBar
        status={status}
        currentPlayer={currentPlayer}
        winner={winner}
        onReset={handleReset}
      />

      {isAIGame && <p className="text-xs text-slate-500">You are X · AI is O</p>}
    </main>
  )
}
