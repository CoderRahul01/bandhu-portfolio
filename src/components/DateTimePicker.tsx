"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
    date: string;
    startTime: string;
    endTime: string;
    duration: string;
    onChange: (data: { date?: string; startTime?: string; endTime?: string; duration?: string }) => void;
    onClear: () => void;
}

export default function DateTimePicker({ date, startTime, endTime, duration, onChange, onClear }: DateTimePickerProps) {
    const [view, setView] = useState<"calendar" | "time">("calendar");
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Sync view with state - if date is selected, show time selection
    useEffect(() => {
        if (date && view === "calendar") {
            setView("time");
        }
    }, [date]);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        onChange({ date: selectedDate.toISOString().split("T")[0] });
    };

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

    const durationOptions = [
        { label: "2 Hours", value: "2h" },
        { label: "4 Hours", value: "4h" },
        { label: "Full Day (8h)", value: "8h" },
        { label: "Multi-day Project", value: "multi" },
    ];

    const generateTimeOptions = () => {
        const options = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour = h % 12 || 12;
                const ampm = h >= 12 ? "PM" : "AM";
                const minute = m.toString().padStart(2, "0");
                const value = `${h.toString().padStart(2, "0")}:${minute}`;
                const label = `${hour}:${minute} ${ampm}`;
                options.push({ value, label });
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getSelectionPadding = () => {
        if (!date) return "Select Date";
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="w-full bg-neutral-900 border border-white/10 rounded-sm overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="flex border-b border-white/10">
                <button
                    type="button"
                    onClick={() => setView("calendar")}
                    className={cn(
                        "flex-1 py-4 text-[9px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                        view === "calendar" ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                    )}
                >
                    <CalendarIcon size={12} className={view === "calendar" ? "text-black" : "text-white/20"} /> 
                    {getSelectionPadding()}
                </button>
                <button
                    type="button"
                    onClick={() => date && setView("time")}
                    disabled={!date}
                    className={cn(
                        "flex-1 py-4 text-[9px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                        view === "time" ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/[0.02] disabled:opacity-10"
                    )}
                >
                    <Clock size={12} className={view === "time" ? "text-black" : "text-white/20"} /> 
                    {startTime && endTime ? `${startTime} - ${endTime}` : duration ? durationOptions.find(o => o.value === duration)?.label : "Select Time"}
                </button>
                <button
                    type="button"
                    onClick={onClear}
                    className="px-5 text-white/20 hover:text-white transition-colors border-l border-white/10 hover:bg-white/[0.02]"
                    title="Clear Selection"
                >
                    <X size={14} />
                </button>
            </div>

            <div className="p-6 min-h-[360px] relative">
                <AnimatePresence mode="wait">
                    {view === "calendar" ? (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                </h3>
                                <div className="flex gap-2">
                                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-white/30 hover:text-white hover:bg-white/5 border border-white/5" onClick={prevMonth}>
                                        <ChevronLeft size={14} />
                                    </Button>
                                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-white/30 hover:text-white hover:bg-white/5 border border-white/5" onClick={nextMonth}>
                                        <ChevronRight size={14} />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                                {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                                    <div key={d} className="text-[8px] font-bold text-white/10 pb-4">{d}</div>
                                ))}
                                {Array.from({ length: firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {Array.from({ length: daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => {
                                    const day = i + 1;
                                    const isSelected = date === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split("T")[0];
                                    const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
                                    
                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() => handleDateSelect(day)}
                                            className={cn(
                                                "aspect-square flex items-center justify-center text-[11px] transition-all rounded-sm",
                                                isSelected 
                                                    ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                                                    : "text-white/50 hover:bg-white/5 hover:text-white",
                                                isToday && !isSelected && "border border-white/10 text-white"
                                            )}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="time"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {/* Duration Presets */}
                            <div className="space-y-4">
                                <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 pl-0.5">Preset Duration</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {durationOptions.map(opt => (
                                        <button
                                            type="button"
                                            key={opt.value}
                                            onClick={() => onChange({ duration: opt.value, startTime: "", endTime: "" })}
                                            className={cn(
                                                "py-3 px-4 text-[10px] uppercase tracking-widest border transition-all rounded-sm text-center",
                                                duration === opt.value && !startTime
                                                    ? "bg-white text-black border-white font-bold"
                                                    : "border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                                            )}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <div className="h-[1px] flex-1 bg-white/5" />
                                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">or Manual Selection</span>
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </div>

                            {/* Manual Time Selection */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 pl-0.5">Start</label>
                                    <div className="max-h-[160px] overflow-y-auto custom-scrollbar border border-white/5 rounded-sm bg-black/40">
                                        {timeOptions.map(opt => (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                onClick={() => onChange({ startTime: opt.label, duration: "" })}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 text-[10px] transition-all border-b border-white/[0.02] last:border-0",
                                                    startTime === opt.label ? "bg-white/10 text-white font-bold" : "text-white/30 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 pl-0.5">End</label>
                                    <div className="max-h-[160px] overflow-y-auto custom-scrollbar border border-white/5 rounded-sm bg-black/40">
                                        {timeOptions.map(opt => (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                onClick={() => onChange({ endTime: opt.label, duration: "" })}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 text-[10px] transition-all border-b border-white/[0.02] last:border-0",
                                                    endTime === opt.label ? "bg-white/10 text-white font-bold" : "text-white/30 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}
