import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, CheckCircle2, Sun, Cloud, Trees, MoonStar, Fish, Users } from 'lucide-react';
import { MemoryCard } from '../types';
import { soundFx } from '../utils/audio';

interface MemoryGameProps {
  onGameComplete: (pointsEarned: number) => void;
}

const RAW_PAIRS = [
  { pairId: 1, dayText: 'Día 1', eventText: 'La Luz y las Tinieblas', icon: Sun, color: 'border-amber-400 bg-amber-50' },
  { pairId: 2, dayText: 'Día 2', eventText: 'El Firmamento y las Aguas', icon: Cloud, color: 'border-sky-400 bg-sky-50' },
  { pairId: 3, dayText: 'Día 3', eventText: 'Tierra, Mares y Plantas', icon: Trees, color: 'border-emerald-400 bg-emerald-50' },
  { pairId: 4, dayText: 'Día 4', eventText: 'Sol, Luna y Estrellas', icon: MoonStar, color: 'border-indigo-400 bg-indigo-50' },
  { pairId: 5, dayText: 'Día 5', eventText: 'Peces y Aves del Cielo', icon: Fish, color: 'border-teal-400 bg-teal-50' },
  { pairId: 6, dayText: 'Día 6', eventText: 'Animales y el Hombre', icon: Users, color: 'border-orange-400 bg-orange-50' },
  { pairId: 7, dayText: 'Día 7', eventText: 'El Reposo de Dios', icon: Sparkles, color: 'border-rose-400 bg-rose-50' },
];

function generateDeck(): MemoryCard[] {
  const cards: MemoryCard[] = [];

  RAW_PAIRS.forEach((pair) => {
    // Day card
    cards.push({
      id: `day-${pair.pairId}`,
      pairId: pair.pairId,
      type: 'day',
      title: pair.dayText,
      subtitle: 'Día de la Creación',
      iconName: pair.icon.name,
      color: pair.color,
    });

    // Event card
    cards.push({
      id: `event-${pair.pairId}`,
      pairId: pair.pairId,
      type: 'creation',
      title: pair.eventText,
      subtitle: `Obra creada por Dios`,
      iconName: pair.icon.name,
      color: pair.color,
    });
  });

  return cards.sort(() => Math.random() - 0.5);
}

export function MemoryGame({ onGameComplete }: MemoryGameProps) {
  const [deck, setDeck] = useState<MemoryCard[]>(() => generateDeck());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  useEffect(() => {
    if (matchedPairIds.length === RAW_PAIRS.length) {
      setIsVictory(true);
      soundFx.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      const points = Math.max(150 - moves * 2, 80);
      onGameComplete(points);
    }
  }, [matchedPairIds, moves, onGameComplete]);

  const handleCardClick = (card: MemoryCard) => {
    if (isLocked) return;
    if (flippedIds.includes(card.id)) return;
    if (matchedPairIds.includes(card.pairId)) return;

    soundFx.playClick();
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const firstCard = deck.find((c) => c.id === newFlipped[0]);
      const secondCard = deck.find((c) => c.id === newFlipped[1]);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          soundFx.playCorrect();
          setMatchedPairIds((prev) => [...prev, firstCard.pairId]);
          setFlippedIds([]);
          setIsLocked(false);
        }, 450);
      } else {
        // Not matched
        setTimeout(() => {
          soundFx.playWrong();
          setFlippedIds([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setDeck(generateDeck());
    setFlippedIds([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsLocked(false);
    setIsVictory(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Memoria y Retención Bíblica
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
          Memorama de los 7 Días de la Creación
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto mt-1">
          Encuentra las 7 parejas uniendo cada <strong>Día</strong> con su respectiva <strong>Obra Creada</strong>.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-6 bg-white p-3 rounded-xl border border-stone-200 text-xs">
        <div>
          <span className="text-stone-500 font-medium">Movimientos:</span>{' '}
          <strong className="text-amber-900 font-serif text-sm">{moves}</strong>
        </div>
        <div>
          <span className="text-stone-500 font-medium">Parejas Halladas:</span>{' '}
          <strong className="text-emerald-700 font-serif text-sm">
            {matchedPairIds.length} / {RAW_PAIRS.length}
          </strong>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 text-stone-600 hover:text-amber-800 font-medium cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Victory banner */}
      {isVictory && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-900">
                ¡Felicidades! Has unido todos los días de la Creación
              </h3>
              <p className="text-xs text-emerald-800">
                Completado en {moves} movimientos con perfecta retención bíblica.
              </p>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
          >
            Volver a Jugar
          </button>
        </div>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {deck.map((card) => {
          const isFlipped = flippedIds.includes(card.id) || matchedPairIds.includes(card.pairId);
          const isMatched = matchedPairIds.includes(card.pairId);
          const rawPair = RAW_PAIRS.find((p) => p.pairId === card.pairId);
          const Icon = rawPair?.icon || Sun;

          return (
            <button
              key={card.id}
              id={`card-${card.id}`}
              disabled={isMatched || isLocked}
              onClick={() => handleCardClick(card)}
              className={`h-36 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-3 text-center cursor-pointer select-none relative group ${
                isFlipped
                  ? isMatched
                    ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                    : 'bg-white border-amber-400 shadow-md ring-2 ring-amber-300'
                  : 'bg-gradient-to-br from-amber-900 to-stone-900 border-amber-800/80 hover:border-amber-500 hover:shadow-sm'
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center justify-center h-full w-full animate-in zoom-in-90 duration-150">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-xs text-stone-900 leading-tight">
                    {card.title}
                  </h4>
                  <span className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                    {card.type === 'day' ? 'Día Bíblico' : 'Creación'}
                  </span>
                  {isMatched && (
                    <span className="mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      ✓ Par
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-amber-800/60 border border-amber-700/60 text-amber-200 flex items-center justify-center font-serif text-base mb-1 shadow-inner group-hover:scale-105 transition-transform">
                    ✝
                  </div>
                  <span className="text-[11px] font-serif font-semibold text-amber-200/80">
                    Génesis 1
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
