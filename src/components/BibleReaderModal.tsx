import { useState } from 'react';
import { BookOpen, X, Sparkles, Filter } from 'lucide-react';
import { GENESIS_1_TEXT, CREATION_DAYS } from '../data/genesisData';
import { soundFx } from '../utils/audio';

interface BibleReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BibleReaderModal({ isOpen, onClose }: BibleReaderModalProps) {
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredVerses = selectedDayFilter === null
    ? GENESIS_1_TEXT
    : GENESIS_1_TEXT.filter((v) => v.day === selectedDayFilter);

  const selectedDayInfo = selectedDayFilter !== null && selectedDayFilter > 0
    ? CREATION_DAYS.find((d) => d.dayNumber === selectedDayFilter)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-300 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-900 to-stone-900 text-amber-50 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800/70 border border-amber-600/60 flex items-center justify-center text-amber-300 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg sm:text-xl text-amber-200">
                  Génesis Capítulo 1
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-serif">
                  Reina-Valera 1960
                </span>
              </div>
              <p className="text-xs text-amber-200/70">
                El relato de los Orígenes y la Creación divina
              </p>
            </div>
          </div>

          <button
            id="btn-close-bible-modal"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-amber-950/80 hover:bg-amber-800 text-amber-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar by Days */}
        <div className="p-3 bg-amber-50/70 border-b border-amber-200/60 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-xs font-serif font-bold text-stone-600 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              Filtrar:
            </span>
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedDayFilter(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-serif font-semibold cursor-pointer transition-colors ${
                selectedDayFilter === null
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Capítulo Completo (1-31)
            </button>
            {[1, 2, 3, 4, 5, 6].map((day) => (
              <button
                key={day}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedDayFilter(day);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-serif font-medium cursor-pointer transition-colors ${
                  selectedDayFilter === day
                    ? 'bg-amber-700 text-white font-semibold shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                Día {day}
              </button>
            ))}
          </div>
        </div>

        {/* Scripture Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 font-serif">
          {selectedDayInfo && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 mb-4 font-sans text-xs">
              <div className="flex items-center gap-2 font-serif font-bold text-amber-900 text-sm mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{selectedDayInfo.dayLabel}: {selectedDayInfo.title}</span>
              </div>
              <p className="text-stone-700">{selectedDayInfo.shortDesc}</p>
            </div>
          )}

          <div className="space-y-3 leading-relaxed text-sm sm:text-base text-stone-800">
            {filteredVerses.map((v) => (
              <p key={v.v} className="flex items-start gap-2.5 hover:bg-amber-50/50 p-1.5 rounded-lg transition-colors">
                <span className="text-xs font-bold text-amber-800 font-sans mt-0.5 bg-amber-100/70 px-1.5 py-0.5 rounded flex-shrink-0">
                  {v.v}
                </span>
                <span className="text-stone-800">
                  {v.text}
                </span>
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Santa Biblia, Versión Reina-Valera 1960</span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Listo para Jugar
          </button>
        </div>
      </div>
    </div>
  );
}
