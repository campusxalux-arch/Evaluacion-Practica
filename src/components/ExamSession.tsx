/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Volume2, 
  VolumeX,
  AlertTriangle,
  User,
  MinusCircle,
  ListChecks,
  Car,
  Check
} from "lucide-react";
import { Question, AnswerDetail } from "../types";

interface ExamSessionProps {
  questions: Question[];
  onComplete: (details: AnswerDetail[], timeSpent: string) => void;
  userName: string;
}

export default function ExamSession({ questions, onComplete, userName }: ExamSessionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [activeTab, setActiveTab] = useState<"preoperacional" | "conduccion">("preoperacional");
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  // Start timer on mount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Time limit logic: 45 minutes = 2700 seconds
  const TOTAL_EXAM_TIME_SECONDS = 45 * 60;
  const remainingSeconds = Math.max(0, TOTAL_EXAM_TIME_SECONDS - secondsElapsed);
  const isTimeWarning = remainingSeconds <= 300;

  // Separate questions into two lists
  const preoperacionalQuestions = questions.filter((q) =>
    q.category.toLowerCase().startsWith("preoperacional")
  );
  const conduccionQuestions = questions.filter((q) =>
    q.category.toLowerCase().startsWith("conducción") || q.category.toLowerCase().startsWith("conduccion")
  );

  // Fallbacks if categories don't match standard prefixes
  const preQuestions = preoperacionalQuestions.length > 0 ? preoperacionalQuestions : questions;
  const condQuestions = preoperacionalQuestions.length > 0 ? conduccionQuestions : [];

  const preAnsweredCount = preQuestions.filter((q) => selectedAnswers[q.id] !== undefined).length;
  const condAnsweredCount = condQuestions.filter((q) => selectedAnswers[q.id] !== undefined).length;

  const preComplete = preAnsweredCount === preQuestions.length;
  const condComplete = condQuestions.length === 0 || condAnsweredCount === condQuestions.length;

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalQuestions = questions.length;
  const totalProgressPercent = Math.round((totalAnswered / totalQuestions) * 100);

  // Dynamic live inspection stats
  let conformeCount = 0;
  let noConformeCount = 0;
  let noAplicaCount = 0;

  Object.entries(selectedAnswers).forEach(([qIdStr, optIdx]) => {
    const qId = Number(qIdStr);
    const idx = Number(optIdx);
    const q = questions.find((item) => item.id === qId);
    if (!q) return;
    const chosenOpt = q.options[idx] || "";
    const lower = chosenOpt.toLowerCase();
    if (lower.includes("no conforme")) {
      noConformeCount++;
    } else if (lower.includes("conforme")) {
      conformeCount++;
    } else {
      noAplicaCount++;
    }
  });

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));

    const q = questions.find((item) => item.id === questionId);
    if (q && soundEnabled) {
      const chosen = q.options[optionIndex] || "";
      const isConforme = chosen.toLowerCase().includes("conforme") && !chosen.toLowerCase().includes("no conforme");
      playFeedbackBeep(isConforme);
    }
  };

  const handleNextFromPreoperacional = () => {
    if (!preComplete) {
      setAttemptedNext(true);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setAttemptedNext(false);
    setActiveTab("conduccion");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFinalizeExam = () => {
    if (!preComplete) {
      setActiveTab("preoperacional");
      setAttemptedNext(true);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!condComplete) {
      setAttemptedNext(true);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Complete exam
    if (timerRef.current) clearInterval(timerRef.current);

    const finalDetails: AnswerDetail[] = questions.map((q) => {
      const optIdx = selectedAnswers[q.id];
      const chosenOption = optIdx !== undefined ? q.options[optIdx] : "";
      const lower = chosenOption.toLowerCase();
      const isConforme = lower.includes("conforme") && !lower.includes("no conforme");

      return {
        preguntaId: q.id,
        pregunta: q.question,
        elegida: chosenOption,
        correcta: "Conforme",
        esCorrecta: isConforme,
        category: q.category
      };
    });

    onComplete(finalDetails, formatTime(secondsElapsed));
  };

  // Web Audio API feedback
  const playFeedbackBeep = (isPositive: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (isPositive) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(330.0, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      console.warn("Audio Context block:", e);
    }
  };

  const currentQuestionsList = activeTab === "preoperacional" ? preQuestions : condQuestions;
  const currentAnsweredCount = activeTab === "preoperacional" ? preAnsweredCount : condAnsweredCount;
  const currentTotalListCount = currentQuestionsList.length;
  const currentListPending = currentTotalListCount - currentAnsweredCount;

  return (
    <div className="max-w-md mx-auto px-1 sm:px-2 pb-16" ref={topRef}>
      {/* Top Header Stats */}
      <div className={`flex justify-between items-center bg-white rounded-2xl shadow-sm p-3.5 mb-3 border transition-all duration-300 ${
        isTimeWarning ? "border-orange-300 ring-2 ring-orange-400/30 bg-orange-50/30" : "border-slate-100"
      }`}>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
          isTimeWarning 
            ? "bg-orange-500 text-white font-bold animate-pulse shadow-sm" 
            : "text-slate-600 bg-slate-50"
        }`}>
          {isTimeWarning ? (
            <AlertTriangle className="w-4 h-4 text-amber-200 animate-bounce shrink-0" />
          ) : (
            <Clock className="w-4 h-4 text-blue-500 animate-pulse shrink-0" />
          )}
          <span className="font-mono font-bold text-xs sm:text-sm">
            {isTimeWarning ? `⚠️ Quedan ${formatTime(remainingSeconds)}` : formatTime(secondsElapsed)}
          </span>
        </div>
        
        <div className="flex gap-1.5 text-[10px] sm:text-xs font-bold font-mono">
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200/50" title="Conforme">
            C: {conformeCount}
          </span>
          <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-lg border border-rose-200/50" title="No conforme">
            NC: {noConformeCount}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg border border-slate-200/60" title="No aplica">
            N/A: {noAplicaCount}
          </span>
        </div>

        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          title={soundEnabled ? "Silenciar" : "Activar sonido"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Time Warning Banner */}
      {isTimeWarning && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl shadow-md border border-orange-600 flex items-center justify-between text-xs font-bold"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-200 shrink-0 animate-bounce" />
            <div>
              <p className="font-extrabold uppercase tracking-wide text-[11px] text-amber-100">
                ¡Alerta de Tiempo Restante!
              </p>
              <p className="font-medium text-white text-[11px] leading-tight opacity-95">
                Quedan menos de 5 minutos ({formatTime(remainingSeconds)}).
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* User info & Overall Progress */}
      <div className="mb-3 space-y-1.5">
        <div className="flex justify-between items-center text-xs px-0.5">
          <div className="flex items-center gap-1.5 min-w-0 max-w-[210px] text-slate-700 bg-white/80 px-2.5 py-1 rounded-xl border border-slate-100 shadow-2xs">
            <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate uppercase font-extrabold text-[11px] text-slate-800">
              {userName || "Inspector"}
            </span>
          </div>

          <div className="text-blue-700 font-mono text-[11px] font-black shrink-0 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 shadow-2xs">
            {totalAnswered} / {totalQuestions} respondidas ({totalProgressPercent}%)
          </div>
        </div>

        <div className="bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className={`h-full rounded-full transition-colors duration-300 ${isTimeWarning ? "bg-orange-500" : "bg-blue-600"}`}
            initial={{ width: 0 }}
            animate={{ width: `${totalProgressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Navigation Tabs (Preoperacional vs Conducción) */}
      <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-200/60">
        <button
          onClick={() => {
            setActiveTab("preoperacional");
            setAttemptedNext(false);
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === "preoperacional"
              ? "bg-white text-blue-700 shadow-md ring-1 ring-slate-200/80"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ListChecks className="w-4 h-4 shrink-0 text-blue-600" />
          <span className="truncate">1. Preoperacional</span>
          {preComplete ? (
            <span className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          ) : (
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-md shrink-0">
              {preAnsweredCount}/{preQuestions.length}
            </span>
          )}
        </button>

        {condQuestions.length > 0 && (
          <button
            onClick={() => {
              setActiveTab("conduccion");
              setAttemptedNext(false);
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "conduccion"
                ? "bg-white text-blue-700 shadow-md ring-1 ring-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Car className="w-4 h-4 shrink-0 text-blue-600" />
            <span className="truncate">2. Conducción</span>
            {condComplete ? (
              <span className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-md shrink-0">
                {condAnsweredCount}/{condQuestions.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Validation Warning Alert */}
      <AnimatePresence>
        {attemptedNext && currentListPending > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 p-3 bg-rose-50 border-2 border-rose-300 text-rose-900 rounded-2xl flex items-center gap-2.5 shadow-sm"
          >
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 animate-bounce" />
            <div className="text-xs">
              <p className="font-extrabold uppercase text-[11px] text-rose-800">
                Responda todas las preguntas
              </p>
              <p className="font-medium text-rose-700 leading-tight">
                Faltan <strong>{currentListPending}</strong> de <strong>{currentTotalListCount}</strong> preguntas por responder en esta lista.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions List */}
      <div className="space-y-3.5">
        {currentQuestionsList.map((q, index) => {
          const selectedOptionIdx = selectedAnswers[q.id];
          const isAnswered = selectedOptionIdx !== undefined;
          const showMissingHighlight = attemptedNext && !isAnswered;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: index * 0.02 }}
              className={`bg-white rounded-2xl p-4 border shadow-2xs transition-all duration-200 ${
                showMissingHighlight 
                  ? "border-rose-400 bg-rose-50/30 ring-2 ring-rose-200" 
                  : isAnswered 
                    ? "border-emerald-200 bg-white" 
                    : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Question Label & Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {q.question}
                </h4>

                {isAnswered ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Respondida
                  </span>
                ) : (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    showMissingHighlight ? "bg-rose-100 text-rose-800 font-black animate-pulse" : "bg-slate-100 text-slate-500"
                  }`}>
                    {showMissingHighlight ? "⚠️ Pendiente" : "Sin responder"}
                  </span>
                )}
              </div>

              {/* Options buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedOptionIdx === optIdx;
                  const optionLower = option.toLowerCase();

                  let styleClass = "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700";
                  let iconElement = <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />;

                  if (optionLower.includes("no conforme")) {
                    if (isSelected) {
                      styleClass = "border-rose-500 bg-rose-600 text-white font-black shadow-sm ring-2 ring-rose-300";
                      iconElement = <XCircle className="w-4 h-4 text-white shrink-0" />;
                    }
                  } else if (optionLower.includes("conforme")) {
                    if (isSelected) {
                      styleClass = "border-emerald-500 bg-emerald-600 text-white font-black shadow-sm ring-2 ring-emerald-300";
                      iconElement = <CheckCircle2 className="w-4 h-4 text-white shrink-0" />;
                    }
                  } else {
                    // No aplica (N/A)
                    if (isSelected) {
                      styleClass = "border-slate-600 bg-slate-700 text-white font-black shadow-sm ring-2 ring-slate-300";
                      iconElement = <MinusCircle className="w-4 h-4 text-white shrink-0" />;
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer active:scale-[0.98] ${styleClass}`}
                    >
                      <span className="truncate">{option}</span>
                      {iconElement}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* List Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        {activeTab === "conduccion" && (
          <button
            onClick={() => {
              setActiveTab("preoperacional");
              setAttemptedNext(false);
              topRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-bold px-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-slate-200/80 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Preoperacional
          </button>
        )}

        {activeTab === "preoperacional" && condQuestions.length > 0 ? (
          <button
            onClick={handleNextFromPreoperacional}
            className="w-full sm:ml-auto sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all"
          >
            Siguiente: Conducción en Vía
            <ArrowRight className="w-4 h-4 text-blue-200" />
          </button>
        ) : (
          <button
            onClick={handleFinalizeExam}
            className="w-full sm:ml-auto sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all"
          >
            Finalizar Evaluación
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          </button>
        )}
      </div>
    </div>
  );
}

