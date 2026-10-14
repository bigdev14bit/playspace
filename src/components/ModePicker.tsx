import { FaUserGroup, FaFaceSmile, FaBrain, FaSkull } from 'react-icons/fa6'
import type { Difficulty } from '../game/ai'
import { FaSmile } from 'react-icons/fa'

export type GameMode = 'local' | Difficulty

interface ModePickerProps {
  mode: GameMode
  onChange: (mode: GameMode) => void
}

const OPTIONS: { value: GameMode; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'local',      label: '2 Players', Icon: FaUserGroup },
  { value: 'easy',       label: 'Easy',      Icon: FaSmile },
  { value: 'medium',     label: 'Medium',    Icon: FaBrain },
  { value: 'impossible', label: 'Impossible', Icon: FaSkull },
]

export function ModePicker({ mode, onChange }: ModePickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === value
              ? 'bg-sky-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  )
}
