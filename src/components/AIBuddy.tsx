import { POSE_BY_MOOD, type AIMood } from '../game/aiMood'

interface AIBuddyProps {
  mood: AIMood
  /** Optional: label under the buddy. Set to null to hide. */
  label?: string | null
}

const AURA_RING: Record<string, string> = {
  none: 'ring-slate-700',
  thinking: 'ring-amber-500/60',
  win: 'ring-green-500/70',
  lose: 'ring-rose-500/70',
  draw: 'ring-slate-500/70',
}

export function AIBuddy({ mood, label = 'AI' }: AIBuddyProps) {
  const pose = POSE_BY_MOOD[mood]

  // ---- eyes ----
  const eyeShape = (() => {
    switch (pose.eyes) {
      case 'open':
        return { ry: 4, cy: 34 }
      case 'half':
        return { ry: 2, cy: 35 }
      case 'happy':
        // happy = closed upward arc
        return null
      case 'closed':
        return { ry: 1, cy: 34 }
    }
  })()

  // ---- mouth path ----
  const mouthPath = (() => {
    switch (pose.mouth) {
      case 'flat':  return 'M 42 52 Q 50 52 58 52'
      case 'smile': return 'M 42 50 Q 50 58 58 50'
      case 'grin':  return 'M 40 48 Q 50 62 60 48 Q 50 56 40 48 Z'
      case 'frown': return 'M 42 56 Q 50 50 58 56'
    }
  })()

  return (
    <div className="flex flex-col items-center gap-1 select-none" title={`AI · ${mood}`}>
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 ring-2 transition-all duration-500 ${AURA_RING[pose.aura]} ${
          pose.aura === 'thinking' ? 'animate-pulse' : ''
        }`}
      >
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          {/* head */}
          <circle cx="50" cy="42" r="26" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

          {/* eyes */}
          {eyeShape ? (
            <>
              <ellipse cx="41" cy={eyeShape.cy} rx="4" ry={eyeShape.ry} fill="#e2e8f0" />
              <ellipse cx="59" cy={eyeShape.cy} rx="4" ry={eyeShape.ry} fill="#e2e8f0" />
            </>
          ) : (
            <>
              {/* happy arc eyes */}
              <path d="M 36 36 Q 41 31 46 36" stroke="#e2e8f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 54 36 Q 59 31 64 36" stroke="#e2e8f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* mouth */}
          <path d={mouthPath} stroke="#e2e8f0" strokeWidth="2" fill={pose.mouth === 'grin' ? '#e2e8f0' : 'none'} strokeLinecap="round" />

          {/* chin-scratch arm */}
          {pose.arm === 'chin' && (
            <g className="buddy-arm-chin">
              <path
                d="M 78 62 Q 76 52 66 52"
                stroke="#94a3b8"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="64" cy="52" r="3" fill="#94a3b8" />
            </g>
          )}

          {/* celebrate arms */}
          {pose.arm === 'celebrate' && (
            <g>
              <path d="M 30 60 Q 22 48 26 40" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 70 60 Q 78 48 74 40" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* crossed arms */}
          {pose.arm === 'crossed' && (
            <g>
              <path d="M 34 62 Q 50 54 66 62" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 34 66 Q 50 58 66 66" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
      {label && (
        <span className="text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
      )}
    </div>
  )
}
