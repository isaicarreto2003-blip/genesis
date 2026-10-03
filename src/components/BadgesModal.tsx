import { Trophy, Award, Sparkles, X, CheckCircle, RotateCcw } from 'lucide-react';
import { UserStats } from '../types';
import { soundFx } from '../utils/audio';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onResetStats: () => void;
}

export function BadgesModal({ isOpen, onClose, stats, onResetStats }: BadgesModalProps) {
  if (!isOpen) return null;

  const BADGES = [
    {
      id: 'badge-order',
      title: 'Maestro de la Creación',
      desc: 'Ordena correctamente los 7 días de Génesis 1 en el primer juego.',
      unlocked: stats.orderCompleted,
      icon: '🌅',
    },
    {
      id: 'badge-trivia',
      title: 'Erudito de Génesis 1',
      desc: 'Alcanza más de 100 puntos en la trivia bíblica.',
      unlocked: stats.triviaBestScore >= 100,
      icon: '🧠',
    },
    {
      id: 'badge-memory',
      title: 'Memoria Celestial',
      desc: 'Encuentra las 7 parejas en el memorama bíblico.',
      unlocked: stats.memoryBestMoves > 0,
      icon: '🃏',
    },
    {
      id: 'badge-verses',
      title: 'Escriba Fiel',
      desc: 'Completa al menos 3 versículos clave de Génesis 1.',
      unlocked: stats.versesCompleted.length >= 3,
      icon: '✍️',
    },
    {
      id: 'badge-words',
      title: 'Buscador de la Palabra',
      desc: 'Encuentra todas las palabras de Génesis en la sopa de letras.',
      unlocked: stats.wordsFoundCount >= 8,
      icon: '🔍',
    },
  ];

  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-300 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-900 to-stone-900 text-amber-50 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800/80 border border-amber-600/60 flex items-center justify-center text-amber-300">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-amber-200">
                Logros y Marcador Bíblico
              </h2>
              <p className="text-xs text-amber-200/70">
                Tu progreso en los juegos de Génesis 1
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-amber-950/80 hover:bg-amber-800 text-amber-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Points summary box */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/70 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Puntos Totales
              </div>
              <div className="text-2xl font-serif font-bold text-amber-950">
                {stats.totalPoints}
              </div>
            </div>

            <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-emerald-100/70 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                <Award className="w-4 h-4 text-emerald-600" />
                Insignias Obtenidas
              </div>
              <div className="text-2xl font-serif font-bold text-emerald-950">
                {unlockedCount} / {BADGES.length}
              </div>
            </div>
          </div>

          {/* Badges List */}
          <div>
            <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-600 mb-2.5">
              Insignias de la Creación:
            </h3>

            <div className="space-y-2.5">
              {BADGES.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    b.unlocked
                      ? 'bg-amber-50/70 border-amber-300 text-amber-950 shadow-xs'
                      : 'bg-stone-50 border-stone-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                        b.unlocked ? 'bg-amber-200 text-amber-950' : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">{b.desc}</p>
                    </div>
                  </div>

                  <div>
                    {b.unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Obtenida
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-medium">Por desbloquear</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (confirm('¿Deseas reiniciar tu puntuación y progreso?')) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1 text-stone-500 hover:text-rose-700 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Progreso</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
