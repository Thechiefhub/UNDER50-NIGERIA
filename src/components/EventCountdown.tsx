import React, { useState, useEffect } from "react";

interface EventCountdownProps {
  targetDateStr: string; // e.g. "2026-11-20"
  targetTimeStr: string; // e.g. "09:00"
}

export default function EventCountdown({ targetDateStr, targetTimeStr }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(`${targetDateStr}T${targetTimeStr || "09:00"}:00`);
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, targetTimeStr]);

  if (timeLeft.isOver) {
    return (
      <div id="countdown-live-panel" className="text-center p-8 bg-brand-charcoal border border-brand-red select-none">
        <span className="w-2 h-2 inline-block bg-brand-red rounded-full mr-2 animate-ping"></span>
        <h3 className="font-serif text-3xl font-black text-white tracking-widest inline-block">
          THE MOMENT IS HERE.
        </h3>
        <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
          The UNDER50 Nigeria Leadership Summit is now actively streaming live.
        </p>
      </div>
    );
  }

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds }
  ];

  return (
    <div id="countdown-ticker" className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center select-none">
      {timeBlocks.map((blk) => (
        <div key={blk.label} className="bg-brand-charcoal border border-brand-grey/55 p-6 flex flex-col justify-center">
          <span className="font-serif text-4xl md:text-5xl font-black text-white tracking-tight">
            {String(blk.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mt-2">
            {blk.label}
          </span>
        </div>
      ))}
    </div>
  );
}
