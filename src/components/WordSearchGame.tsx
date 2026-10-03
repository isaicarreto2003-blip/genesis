import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Search, CheckCircle2, RotateCcw, BookOpen } from 'lucide-react';
import { WORD_SEARCH_WORDS } from '../data/genesisData';
import { WordSearchWord } from '../types';
import { soundFx } from '../utils/audio';

interface WordPlacement {
  word: string;
  coords: { r: number; c: number }[];
}

const PLACED_WORDS_CONFIG: WordPlacement[] = [
  {
    word: 'REPOSO',
    coords: [
      { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 0, c: 5 }, { r: 0, c: 6 }, { r: 0, c: 7 },
    ],
  },
  {
    word: 'CREACION',
    coords: [
      { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 }, { r: 1, c: 6 }, { r: 1, c: 7 }, { r: 1, c: 8 },
    ],
  },
  {
    word: 'CIELOS',
    coords: [
      { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 }, { r: 3, c: 6 }, { r: 3, c: 7 },
    ],
  },
  {
    word: 'TIERRA',
    coords: [
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }, { r: 5, c: 6 },
    ],
  },
  {
    word: 'LUMBRERA',
    coords: [
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 }, { r: 7, c: 7 }, { r: 7, c: 8 },
    ],
  },
  {
    word: 'HOMBRE',
    coords: [
      { r: 9, c: 2 }, { r: 9, c: 3 }, { r: 9, c: 4 }, { r: 9, c: 5 }, { r: 9, c: 6 }, { r: 9, c: 7 },
    ],
  },
  {
    word: 'MARES',
    coords: [
      { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 }, { r: 5, c: 0 }, { r: 6, c: 0 },
    ],
  },
  {
    word: 'ESTRELLAS',
    coords: [
      { r: 1, c: 9 }, { r: 2, c: 9 }, { r: 3, c: 9 }, { r: 4, c: 9 }, { r: 5, c: 9 }, { r: 6, c: 9 }, { r: 7, c: 9 }, { r: 8, c: 9 }, { r: 9, c: 9 },
    ],
  },
];

const FILLER_GRID = [
  ['A', 'L', 'R', 'E', 'P', 'O', 'S', 'O', 'V', 'D'],
  ['Z', 'C', 'R', 'E', 'A', 'C', 'I', 'O', 'N', 'E'],
  ['M', 'U', 'N', 'D', 'O', 'P', 'A', 'Z', 'B', 'S'],
  ['A', 'G', 'C', 'I', 'E', 'L', 'O', 'S', 'U', 'T'],
  ['R', 'A', 'D', 'I', 'O', 'S', 'F', 'E', 'V', 'R'],
  ['E', 'T', 'I', 'E', 'R', 'R', 'A', 'S', 'O', 'E'],
  ['S', 'A', 'N', 'T', 'O', 'L', 'U', 'Z', 'N', 'L'],
  ['B', 'L', 'U', 'M', 'B', 'R', 'E', 'R', 'A', 'L'],
  ['V', 'A', 'G', 'U', 'A', 'S', 'V', 'I', 'D', 'A'],
  ['D', 'I', 'H', 'O', 'M', 'B', 'R', 'E', 'J', 'S'],
];

interface WordSearchGameProps {
  onGameComplete: (pointsEarned: number) => void;
}

export function WordSearchGame({ onGameComplete }: WordSearchGameProps) {
  const [words, setWords] = useState<WordSearchWord[]>(WORD_SEARCH_WORDS);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedStart, setSelectedStart] = useState<{ r: number; c: number } | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<{ r: number; c: number } | null>(null);
  const [activeWordInfo, setActiveWordInfo] = useState<WordSearchWord | null>(null);
  const [isVictory, setIsVictory] = useState(false);

  // Compute selected coordinates line
  const getSelectedLine = (): { r: number; c: number }[] => {
    if (!selectedStart || !selectedEnd) return selectedStart ? [selectedStart] : [];
    const r1 = selectedStart.r;
    const c1 = selectedStart.c;
    const r2 = selectedEnd.r;
    const c2 = selectedEnd.c;

    const dr = r2 - r1;
    const dc = c2 - c1;

    // Check if horizontal or vertical
    if (dr === 0) {
      // Horizontal
      const step = dc > 0 ? 1 : -1;
      const cells: { r: number; c: number }[] = [];
      for (let c = c1; c !== c2 + step; c += step) {
        cells.push({ r: r1, c });
      }
      return cells;
    } else if (dc === 0) {
      // Vertical
      const step = dr > 0 ? 1 : -1;
      const cells: { r: number; c: number }[] = [];
      for (let r = r1; r !== r2 + step; r += step) {
        cells.push({ r, c: c1 });
      }
      return cells;
    }
    return [selectedStart, selectedEnd];
  };

  const handleCellClick = (r: number, c: number) => {
    soundFx.playClick();

    if (!selectedStart) {
      setSelectedStart({ r, c });
      setSelectedEnd(null);
      return;
    }

    // Second click: finalize selection and test word
    const line = getLineCells(selectedStart, { r, c });
    const selectedLetters = line.map((cell) => FILLER_GRID[cell.r][cell.c]).join('');
    const reversedLetters = line.map((cell) => FILLER_GRID[cell.r][cell.c]).reverse().join('');

    // Check against config
    const matchedConfig = PLACED_WORDS_CONFIG.find(
      (cfg) =>
        (cfg.word === selectedLetters || cfg.word === reversedLetters) &&
        !foundWords.includes(cfg.word)
    );

    if (matchedConfig) {
      soundFx.playCorrect();
      const updatedFound = [...foundWords, matchedConfig.word];
      setFoundWords(updatedFound);

      // Check if all found
      if (updatedFound.length === PLACED_WORDS_CONFIG.length) {
        setIsVictory(true);
        soundFx.playVictory();
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
        });
        onGameComplete(150);
      }
    } else {
      soundFx.playWrong();
    }

    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const getLineCells = (start: { r: number; c: number }, end: { r: number; c: number }) => {
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    if (dr === 0) {
      const step = dc > 0 ? 1 : -1;
      const cells: { r: number; c: number }[] = [];
      for (let c = start.c; c !== end.c + step; c += step) {
        cells.push({ r: start.r, c });
      }
      return cells;
    }
    if (dc === 0) {
      const step = dr > 0 ? 1 : -1;
      const cells: { r: number; c: number }[] = [];
      for (let r = start.r; r !== end.r + step; r += step) {
        cells.push({ r, c: start.c });
      }
      return cells;
    }
    return [start];
  };

  const isCellFound = (r: number, c: number) => {
    return PLACED_WORDS_CONFIG.some(
      (cfg) => foundWords.includes(cfg.word) && cfg.coords.some((pos) => pos.r === r && pos.c === c)
    );
  };

  const isCellSelected = (r: number, c: number) => {
    const line = getSelectedLine();
    return line.some((cell) => cell.r === r && cell.c === c);
  };

  const handleRestart = () => {
    soundFx.playClick();
    setFoundWords([]);
    setSelectedStart(null);
    setSelectedEnd(null);
    setIsVictory(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-2">
          <Search className="w-3.5 h-3.5 text-amber-700" />
          Búsqueda de Palabras Clave
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
          Sopa de Letras: Génesis 1
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto mt-1">
          Encuentra las 8 palabras fundamentales del relato de la Creación. Haz clic en la primera letra y luego en la última letra de cada palabra.
        </p>
      </div>

      {/* Victory Banner */}
      {isVictory && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-900">
                ¡Has encontrado todas las palabras de Génesis 1!
              </h3>
              <p className="text-xs text-emerald-800">
                «Lámpara es a mis pies tu palabra, y lumbrera a mi camino.» (Salmos 119:105)
              </p>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
          >
            Jugar de Nuevo
          </button>
        </div>
      )}

      {/* Main layout: Grid + Words Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Letter Grid */}
        <div className="md:col-span-7 bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col items-center">
          <div className="grid grid-cols-10 gap-1 sm:gap-1.5 max-w-md w-full select-none">
            {FILLER_GRID.map((row, r) =>
              row.map((letter, c) => {
                const found = isCellFound(r, c);
                const selected = isCellSelected(r, c);

                return (
                  <button
                    key={`${r}-${c}`}
                    id={`cell-${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    onMouseEnter={() => {
                      if (selectedStart && !selectedEnd) {
                        setSelectedEnd({ r, c });
                      }
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg font-serif font-bold text-xs sm:text-sm md:text-base flex items-center justify-center transition-all cursor-pointer ${
                      found
                        ? 'bg-emerald-500 text-white shadow-xs scale-95'
                        : selected
                        ? 'bg-amber-500 text-stone-950 font-black ring-2 ring-amber-300'
                        : 'bg-stone-50 hover:bg-amber-100/70 text-stone-800 border border-stone-200/80'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-4 flex items-center justify-between w-full max-w-md text-xs text-stone-500 pt-3 border-t border-stone-100">
            <span>
              {selectedStart ? 'Selecciona la última letra...' : 'Toca la primera letra de la palabra'}
            </span>
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 text-stone-600 hover:text-amber-800 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Words Checklist */}
        <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
            <h3 className="font-serif font-bold text-sm text-stone-900">
              Palabras a Encontrar
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-serif">
              {foundWords.length} / {PLACED_WORDS_CONFIG.length}
            </span>
          </div>

          <div className="space-y-2">
            {words.map((item) => {
              const isFound = foundWords.includes(item.word);

              return (
                <div
                  key={item.word}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveWordInfo(item);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isFound
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-amber-50/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isFound ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isFound ? '✓' : '•'}
                    </span>
                    <div>
                      <span className={`font-serif font-bold text-xs sm:text-sm tracking-wider ${isFound ? 'line-through opacity-70' : ''}`}>
                        {item.word}
                      </span>
                      <p className="text-[10px] text-stone-500">{item.clue}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-800 font-medium whitespace-nowrap">
                    {item.verseRef}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Word Context Modal */}
      {activeWordInfo && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl border border-amber-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-amber-900 text-base">
                  {activeWordInfo.word}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                  {activeWordInfo.verseRef}
                </span>
              </div>
              <button
                onClick={() => setActiveWordInfo(null)}
                className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-2">
              <strong>Significado Bíblico:</strong> {activeWordInfo.clue}
            </p>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActiveWordInfo(null)}
                className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
