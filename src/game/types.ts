export type Player = 'X' | 'O'
export type Cell = Player | null
export type Board = Cell[]          // length 9
export type GameStatus = 'playing' | 'won' | 'draw'
export type Winner = Player | null
