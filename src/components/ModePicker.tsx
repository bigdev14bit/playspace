import type { Difficulty } from '../game/ai'

export type GameMode = 'local' | Difficulty

interface ModePickerProps {
  mode: GameMode
  onChange: (mode: GameMode) => void
}

const OPTIONS: { value: GameMode; label: string }[] = [
  { value: 'local', label: '👥 2 Players' },
  { value: 'easy', label: '🤖 Easy AI' },
  { value: 'medium', label: '🤖 Medium AI' },
  { value: 'impossible', label: '🧠 Impossible' },
]

export function ModePicker({ mode, onChange }: ModePickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === opt.value
              ? 'bg-sky-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
