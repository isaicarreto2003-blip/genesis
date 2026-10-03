import { useState } from 'react';
import confetti from 'canvas-confetti';
import { BookMarked, Check, RotateCcw, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { VERSE_CHALLENGES } from '../data/genesisData';
import { soundFx } from '../utils/audio';

interface VerseGameProps {
  onGameComplete: (pointsEarned: number) => void;
}

export function VerseGame({ onGameComplete }: VerseGameProps) {
  const [verseIndex, setVerseIndex] = useState(0);
  const currentChallenge = VERSE_CHALLENGES[verseIndex];

  // Number of blanks in current challenge
  const blankCount = currentChallenge.templateSegments.filter((s) => s.isBlank).length;

  // Selected words placed in blanks: [wordId or null]
  const [placedWords, setPlacedWords] = useState<(string | null)[]>(() =>
    Array(blankCount).fill(null)
  );

  const [activeBlankIndex, setActiveBlankIndex] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isVerseSolved, setIsVerseSolved] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState<number[]>([]);

  const handleWordClick = (word: string) => {
    soundFx.playClick();
    setIsChecked(false);

    // Find the first empty blank or place at active blank
    let targetIndex = activeBlankIndex;
    if (placedWords[targetIndex] !== null) {
      targetIndex = placedWords.findIndex((w) => w === null);
    }
    if (targetIndex === -1) return; // all full

    const newPlaced = [...placedWords];
    newPlaced[targetIndex] = word;
    setPlacedWords(newPlaced);

    // Auto advance active blank
    const nextEmpty = newPlaced.findIndex((w) => w === null);
    if (nextEmpty !== -1) {
      setActiveBlankIndex(nextEmpty);
    }
  };

  const handleRemovePlaced = (slotIndex: number) => {
    soundFx.playClick();
    setIsChecked(false);
    const newPlaced = [...placedWords];
    newPlaced[slotIndex] = null;
    setPlacedWords(newPlaced);
    setActiveBlankIndex(slotIndex);
  };

  const handleCheck = () => {
    setIsChecked(true);

    // Expected words for blanks:
    const expectedWords = currentChallenge.templateSegments
      .filter((s) => s.isBlank)
      .map((s) => s.text);

    let allCorrect = true;
    for (let i = 0; i < expectedWords.length; i++) {
      if (placedWords[i] !== expectedWords[i]) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setIsVerseSolved(true);
      soundFx.playVictory();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (!totalCompleted.includes(currentChallenge.id)) {
        setTotalCompleted((prev) => [...prev, currentChallenge.id]);
        onGameComplete(50);
      }
    } else {
      soundFx.playWrong();
    }
  };

  const handleNextVerse = () => {
    soundFx.playClick();
    const nextIdx = (verseIndex + 1) % VERSE_CHALLENGES.length;
    setVerseIndex(nextIdx);

    const nextBlankCount = VERSE_CHALLENGES[nextIdx].templateSegments.filter((s) => s.isBlank).length;
    setPlacedWords(Array(nextBlankCount).fill(null));
    setActiveBlankIndex(0);
    setIsChecked(false);
    setIsVerseSolved(false);
  };

  const handleResetCurrent = () => {
    soundFx.playClick();
    setPlacedWords(Array(blankCount).fill(null));
    setActiveBlankIndex(0);
    setIsChecked(false);
    setIsVerseSolved(false);
  };

  // Check which bank words are already placed
  const availableBankWords = currentChallenge.missingWords.filter((w) => {
    const timesInBank = currentChallenge.missingWords.filter((x) => x.word === w.word).length;
    const timesPlaced = placedWords.filter((pw) => pw === w.word).length;
    return timesPlaced < timesInBank;
  });

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-2">
          <BookMarked className="w-3.5 h-3.5 text-amber-700" />
          Memorización Bíblica
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
          Completa el Versículo: Génesis 1
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto mt-1">
          Coloca las palabras bíblicas exactas en los espacios en blanco para reconstruir los versículos cardinales.
        </p>
      </div>

      {/* Verse Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {VERSE_CHALLENGES.map((v, i) => {
          const isDone = totalCompleted.includes(v.id);
          const isCurrent = i === verseIndex;
          return (
            <button
              key={v.id}
              onClick={() => {
                soundFx.playClick();
                setVerseIndex(i);
                const count = v.templateSegments.filter((s) => s.isBlank).length;
                setPlacedWords(Array(count).fill(null));
                setActiveBlankIndex(0);
                setIsChecked(false);
                setIsVerseSolved(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-amber-700 text-white shadow-sm ring-2 ring-amber-400 ring-offset-1'
                  : isDone
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {isDone && <Check className="w-3 h-3 text-emerald-600" />}
              <span>{v.reference}</span>
            </button>
          );
        })}
      </div>

      {/* Main Verse Card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-amber-200/80 mb-6">
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
          <span className="font-serif font-bold text-sm md:text-base text-amber-900">
            {currentChallenge.reference} (RVR1960)
          </span>
          <span className="text-xs text-stone-500 italic">
            {currentChallenge.clue}
          </span>
        </div>

        {/* Verse display with fill-in blanks */}
        <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-200/60 font-serif text-base md:text-lg text-stone-800 leading-loose mb-6">
          {currentChallenge.templateSegments.map((segment, idx) => {
            if (!segment.isBlank) {
              return <span key={idx}>{segment.text}</span>;
            }

            const blankIdx = segment.blankIndex ?? 0;
            const placed = placedWords[blankIdx];
            const isExpected = isChecked && placed === segment.text;
            const isWrong = isChecked && placed !== segment.text;
            const isActive = activeBlankIndex === blankIdx;

            return (
              <button
                key={idx}
                id={`blank-slot-${blankIdx}`}
                onClick={() => {
                  if (placed) {
                    handleRemovePlaced(blankIdx);
                  } else {
                    setActiveBlankIndex(blankIdx);
                  }
                }}
                className={`inline-flex items-center justify-center min-w-[90px] px-2.5 py-0.5 mx-1.5 rounded-lg border-2 text-sm font-sans font-bold transition-all align-middle cursor-pointer ${
                  placed
                    ? isExpected
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                      : isWrong
                      ? 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-amber-100 border-amber-500 text-amber-950 hover:bg-amber-200'
                    : isActive
                    ? 'border-amber-500 bg-white border-dashed ring-2 ring-amber-300 text-stone-400 animate-pulse'
                    : 'border-stone-300 bg-white border-dashed text-stone-400 hover:border-amber-400'
                }`}
                title={placed ? 'Toca para quitar la palabra' : 'Casilla para completar'}
              >
                {placed ? (
                  <span className="flex items-center gap-1">
                    {placed}
                    <span className="text-[10px] text-stone-500">✕</span>
                  </span>
                ) : (
                  <span className="text-xs text-stone-400">____</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Word Bank */}
        {!isVerseSolved && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-serif">
              Banco de Palabras (Toca para colocar):
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentChallenge.missingWords.map((item, idx) => {
                const isUsed = !availableBankWords.some((w) => w.id === item.id);

                return (
                  <button
                    key={`${item.id}-${idx}`}
                    id={`word-bank-${item.id}`}
                    disabled={isUsed}
                    onClick={() => handleWordClick(item.word)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all shadow-xs cursor-pointer ${
                      isUsed
                        ? 'bg-stone-100 text-stone-300 border border-stone-200 cursor-not-allowed'
                        : 'bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-semibold hover:-translate-y-0.5'
                    }`}
                  >
                    {item.word}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Solved Banner */}
        {isVerseSolved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 mb-6 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  ¡Versículo completado con éxito!
                </p>
                <p className="text-xs text-emerald-800">
                  «La suma de tu palabra es verdad, y eterno es todo juicio de tu justicia.» (Salmos 119:160)
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-200 rounded-md text-emerald-900">
              +50 pts
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <button
            id="btn-verse-reset"
            onClick={handleResetCurrent}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Borrar Selección</span>
          </button>

          <div className="flex items-center gap-2">
            {!isVerseSolved ? (
              <button
                id="btn-verse-check"
                onClick={handleCheck}
                disabled={placedWords.some((w) => w === null)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  placedWords.every((w) => w !== null)
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comprobar Versículo</span>
              </button>
            ) : (
              <button
                id="btn-verse-next"
                onClick={handleNextVerse}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Siguiente Versículo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
