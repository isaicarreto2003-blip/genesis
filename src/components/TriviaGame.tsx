import { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight, BookOpen, Flame } from 'lucide-react';
import { TRIVIA_QUESTIONS } from '../data/genesisData';
import { soundFx } from '../utils/audio';

interface TriviaGameProps {
  onGameComplete: (pointsEarned: number) => void;
}

export function TriviaGame({ onGameComplete }: TriviaGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; chosen: number; correct: boolean }[]>([]);

  const currentQ = TRIVIA_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);

    let pointsToAdd = 0;
    if (isCorrect) {
      soundFx.playCorrect();
      pointsToAdd = 20 + Math.min(newStreak * 5, 20); // base + streak bonus
      setScore((prev) => prev + pointsToAdd);
    } else {
      soundFx.playWrong();
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, chosen: index, correct: isCorrect },
    ]);
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundFx.playVictory();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
      onGameComplete(score);
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsFinished(false);
    setUserAnswers([]);
  };

  const getRank = (finalScore: number) => {
    const maxScore = TRIVIA_QUESTIONS.length * 20;
    const ratio = finalScore / maxScore;
    if (ratio >= 0.9) return { title: 'Erudito de Génesis 1', desc: '¡Conocimiento bíblico sobresaliente sobre los orígenes!' };
    if (ratio >= 0.7) return { title: 'Estudiante Fiel de la Palabra', desc: '¡Gran entendimiento del relato de la Creación!' };
    if (ratio >= 0.5) return { title: 'Buscador de la Verdad', desc: '¡Buen inicio! Sigue meditando en Génesis 1.' };
    return { title: 'Semilla en Crecimiento', desc: 'Lee el texto completo en la sección «Leer Génesis 1» para mejorar tu puntuación.' };
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {!isFinished ? (
        <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-amber-200/80">
          {/* Header info */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-serif">
                Pregunta {currentIndex + 1} de {TRIVIA_QUESTIONS.length}
              </span>
              <span className="text-xs text-stone-500 font-medium">Génesis 1</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 animate-bounce">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{streak} Racha</span>
                </div>
              )}
              <div className="text-stone-700 bg-stone-100 px-3 py-1 rounded-lg">
                Puntos: <span className="text-amber-800 font-bold">{score}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-stone-100 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / TRIVIA_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-serif font-bold text-stone-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQ.correctIndex;

              let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-amber-50/50 hover:border-amber-300';
              if (isAnswered) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                } else {
                  btnStyle = 'bg-stone-50/50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  id={`trivia-opt-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-sm cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-serif flex-shrink-0 ${
                        isAnswered && isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : isAnswered && isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {isAnswered && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation drawer when answered */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 mb-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-900 uppercase font-serif">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Base Bíblica: {currentQ.verseRef}</span>
              </div>
              <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-sans">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                id="btn-trivia-next"
                onClick={handleNext}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors"
              >
                <span>{currentIndex < TRIVIA_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results screen */
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-amber-200 text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white mx-auto flex items-center justify-center shadow-md mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-1">
            ¡Trivia de Génesis 1 Completada!
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-4">
            {getRank(score).title}
          </p>

          <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
            {getRank(score).desc}
          </p>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 text-center">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="text-2xl font-bold font-serif text-amber-900">{score}</div>
              <div className="text-[11px] text-amber-700 font-medium mt-0.5">Puntos Totales</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-2xl font-bold font-serif text-emerald-900">
                {userAnswers.filter((a) => a.correct).length} / {TRIVIA_QUESTIONS.length}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Aciertos</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-2xl font-bold font-serif text-orange-900">{maxStreak}</div>
              <div className="text-[11px] text-orange-700 font-medium mt-0.5">Mejor Racha</div>
            </div>
          </div>

          {/* Replay / Review actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="btn-trivia-restart"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Intentar de Nuevo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
