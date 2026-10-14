export type AIMood =
  | 'idle'      // not AI's turn — buddy watches
  | 'thinking'  // AI about to move
  | 'pleased'   // AI just moved, still in the game
  | 'happy'     // AI won
  | 'sad'       // AI lost
  | 'neutral'   // draw

/**
 * How the buddy's body parts should be posed for each mood.
 * Keeping this separate from the visual component means the SVG can be
 * redrawn later without touching game logic.
 */
export interface BuddyPose {
  eyes: 'open' | 'half' | 'happy' | 'closed'
  mouth: 'flat' | 'smile' | 'grin' | 'frown'
  arm: 'idle' | 'chin' | 'celebrate' | 'crossed'
  aura: 'none' | 'thinking' | 'win' | 'lose' | 'draw'
}

export const POSE_BY_MOOD: Record<AIMood, BuddyPose> = {
  idle:     { eyes: 'open',   mouth: 'flat',  arm: 'idle',      aura: 'none' },
  thinking: { eyes: 'half',   mouth: 'flat',  arm: 'chin',      aura: 'thinking' },
  pleased:  { eyes: 'happy',  mouth: 'smile', arm: 'idle',      aura: 'none' },
  happy:    { eyes: 'happy',  mouth: 'grin',  arm: 'celebrate', aura: 'win' },
  sad:      { eyes: 'half',   mouth: 'frown', arm: 'crossed',   aura: 'lose' },
  neutral:  { eyes: 'open',   mouth: 'flat',  arm: 'idle',      aura: 'draw' },
}
