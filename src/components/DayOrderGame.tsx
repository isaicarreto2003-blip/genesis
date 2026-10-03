import { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, HelpCircle, Sparkles, BookOpen, Sun, Cloud, Trees, MoonStar, Fish, Users } from 'lucide-react';
import { CREATION_DAYS } from '../data/genesisData';
import { CreationDay } from '../types';
import { soundFx } from '../utils/audio';

interface DayOrderGameProps {
  onGameComplete: (pointsEarned: number) => void;
}

const ICONS_MAP: Record<string, typeof Sun> = {
  Sun,
  Cloud,
  Trees,
  MoonStar,
  Fish,
  Users,
  Sparkles,
};

export function DayOrderGame({ onGameComplete }: DayOrderGameProps) {
  // Shuffle function
  const getShuffledDays = () => {
    return [...CREATION_DAYS].sort(() => Math.random() - 0.5);
  };

  const [pool, setPool] = useState<CreationDay[]>(() => getShuffledDays());
  const [slots, setSlots] = useState<(CreationDay | null)[]>([null, null, null, null, null, null, null]);
  const [selectedPoolId, setSelectedPoolId] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [activeInfoDay, setActiveInfoDay] = useState<CreationDay | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelectPoolCard = (day: CreationDay) => {
    soundFx.playClick();
    if (selectedPoolId === day.id) {
      setSelectedPoolId(null);
    } else {
      setSelectedPoolId(day.id);
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    soundFx.playClick();
    setChecked(false);

    // If a card in pool is selected, place it in this slot
    if (selectedPoolId !== null) {
      const dayToPlace = pool.find((d) => d.id === selectedPoolId);
      if (!dayToPlace) return;

      const currentOccupant = slots[slotIndex];
      const newSlots = [...slots];
      newSlots[slotIndex] = dayToPlace;
      setSlots(newSlots);

      // Remove from pool, and if slot was already occupied, return occupant to pool
      let newPool = pool.filter((d) => d.id !== selectedPoolId);
      if (currentOccupant) {
        newPool = [...newPool, currentOccupant];
      }
      setPool(newPool);
      setSelectedPoolId(null);
      return;
    }

    // If slot is occupied and no pool card selected, return card to pool
    const occupant = slots[slotIndex];
    if (occupant) {
      const newSlots = [...slots];
      newSlots[slotIndex] = null;
      setSlots(newSlots);
      setPool([...pool, occupant]);
    }
  };

  const handleCheckOrder = () => {
    setChecked(true);
    let allCorrect = true;
    let correctCount = 0;

    slots.forEach((day, index) => {
      if (day && day.dayNumber === index + 1) {
        correctCount++;
      } else {
        allCorrect = false;
      }
    });

    if (allCorrect && slots.every((s) => s !== null)) {
      setIsVictory(true);
      soundFx.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onGameComplete(150);
    } else {
      if (correctCount > 0) {
        soundFx.playCorrect();
      } else {
        soundFx.playWrong();
      }
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setPool(getShuffledDays());
    setSlots([null, null, null, null, null, null, null]);
    setSelectedPoolId(null);
    setChecked(false);
    setIsVictory(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Game Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Reto de Secuencia Bíblica
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
          Ordena los 7 Días de la Creación
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto mt-1">
          Coloca cada evento en su orden cronológico correspondiente según Génesis 1:1 al 2:3.
          Selecciona una tarjeta y luego toca la casilla del día deseado.
        </p>
      </div>

      {/* Victory Banner */}
      {isVictory && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 text-emerald-950 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              ✓
            </div>
            <div>
              <h3 className="font-serif font-bold text-base md:text-lg text-emerald-900">
                ¡Gloria a Dios! Has ordenado perfectamente la Creación
              </h3>
              <p className="text-xs md:text-sm text-emerald-800">
                «Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.» (Génesis 1:31)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 bg-emerald-200 text-emerald-900 rounded-lg">
              +150 Puntos
            </span>
            <button
              id="btn-day-order-replay"
              onClick={handleReset}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

      {/* 7 Slots Container */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 font-serif">
            Línea de Tiempo de los 7 Días
          </h2>
          <div className="flex items-center gap-2">
            <button
              id="btn-day-hint-toggle"
              onClick={() => {
                soundFx.playClick();
                setShowHint(!showHint);
              }}
              className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showHint ? 'Ocultar Pistas' : 'Ver Pistas Bíblicas'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {slots.map((slot, index) => {
            const dayNum = index + 1;
            const isCorrect = checked && slot && slot.dayNumber === dayNum;
            const isWrong = checked && slot && slot.dayNumber !== dayNum;
            const Icon = slot ? ICONS_MAP[slot.iconName] || Sun : null;

            return (
              <div
                key={`slot-${index}`}
                id={`slot-day-${dayNum}`}
                onClick={() => handleSlotClick(index)}
                className={`min-h-[160px] p-3 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer relative group ${
                  slot
                    ? isCorrect
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-sm'
                      : isWrong
                      ? 'bg-rose-50/80 border-rose-400'
                      : 'bg-white border-amber-300 shadow-xs hover:border-amber-400'
                    : 'bg-stone-50/80 border-dashed border-stone-300 hover:border-amber-400 hover:bg-amber-50/30'
                }`}
              >
                {/* Header label */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-serif">
                    Día {dayNum}
                  </span>
                  {checked && slot && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className="text-xs font-bold text-rose-600">✗</span>
                      )}
                    </span>
                  )}
                </div>

                {/* Content */}
                {slot ? (
                  <div className="my-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5 shadow-xs">
                      {Icon && <Icon className="w-4 h-4" />}
                    </div>
                    <p className="text-xs font-bold text-stone-900 leading-snug line-clamp-2">
                      {slot.title}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                      {slot.shortDesc}
                    </p>
                  </div>
                ) : (
                  <div className="my-auto text-center py-4">
                    <p className="text-xs text-stone-400 font-medium">
                      {selectedPoolId ? 'Toca para colocar aquí' : 'Casilla Vacía'}
                    </p>
                  </div>
                )}

                {/* Footer status / Action */}
                <div className="pt-1 border-t border-stone-100 flex items-center justify-between text-[10px]">
                  {slot ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                          setActiveInfoDay(slot);
                        }}
                        className="text-amber-700 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Versículo</span>
                      </button>
                      <span className="text-stone-400 group-hover:text-stone-600">Quitar</span>
                    </>
                  ) : (
                    <span className="text-stone-400 text-center w-full">Día {dayNum}</span>
                  )}
                </div>

                {/* Inline hint if enabled and slot is empty */}
                {showHint && !slot && (
                  <div className="mt-1 text-[10px] text-amber-800 bg-amber-100/70 p-1 rounded-sm">
                    {CREATION_DAYS[index].keyElements[0]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Days Pool */}
      <div className="bg-stone-100/70 rounded-2xl p-4 border border-stone-200/80 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-serif">
              Tarjetas Disponibles ({pool.length} restantes)
            </h3>
            <p className="text-xs text-stone-500">
              {pool.length === 0
                ? '¡Has colocado todas las tarjetas! Toca «Comprobar Orden» abajo.'
                : 'Toca una tarjeta para seleccionarla y luego elige el día que le corresponde.'}
            </p>
          </div>
          {selectedPoolId && (
            <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full animate-pulse border border-amber-300">
              Tarjeta seleccionada
            </span>
          )}
        </div>

        {pool.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {pool.map((day) => {
              const isSelected = selectedPoolId === day.id;
              const Icon = ICONS_MAP[day.iconName] || Sun;

              return (
                <div
                  key={`pool-${day.id}`}
                  id={`pool-card-${day.id}`}
                  onClick={() => handleSelectPoolCard(day)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400 -translate-y-0.5'
                      : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex-shrink-0 flex items-center justify-center border border-amber-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 leading-snug">
                        {day.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                        {day.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                    <span className="text-amber-800 font-medium">{day.verseRef}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        setActiveInfoDay(day);
                      }}
                      className="text-stone-500 hover:text-amber-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Ver pasaje</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-white rounded-xl border border-stone-200">
            <p className="text-sm font-medium text-stone-700">
              Todas las tarjetas han sido ubicadas en las casillas.
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Verifica si tu orden coincide con la Santa Biblia.
            </p>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          id="btn-day-order-check"
          onClick={handleCheckOrder}
          disabled={slots.some((s) => s === null)}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2 ${
            slots.every((s) => s !== null)
              ? 'bg-amber-600 hover:bg-amber-700 text-white font-semibold'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Comprobar Orden de los Días</span>
        </button>

        <button
          id="btn-day-order-reset"
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm border border-stone-300 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-stone-500" />
          <span>Reiniciar Tablero</span>
        </button>
      </div>

      {/* Verse Reference Modal / Drawer */}
      {activeInfoDay && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-serif">
                  {activeInfoDay.dayLabel}
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {activeInfoDay.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveInfoDay(null)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                {activeInfoDay.verseRef} (Reina-Valera 1960)
              </p>
              <blockquote className="p-3.5 bg-amber-50/70 border-l-3 border-amber-500 rounded-r-lg text-sm text-stone-800 italic leading-relaxed font-serif">
                {activeInfoDay.verseText}
              </blockquote>

              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Elementos Clave de este Día:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeInfoDay.keyElements.map((el, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs border border-stone-200 font-medium"
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActiveInfoDay(null)}
                className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
