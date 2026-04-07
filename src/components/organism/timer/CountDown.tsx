import { useEffect, useState } from "react";

export interface CountDownLabels {
  months?: string;
  weeks?: string;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
}

interface CountDownProps {
  targetDate?: Date;
  heading?: string;
  labels?: CountDownLabels;
  theme?: string;
}

const defaultLabels: CountDownLabels = {
  months: "months",
  weeks: "weeks",
  days: "days",
  hours: "hours",
  minutes: "minutes",
  seconds: "seconds",
};

const CountDown = ({ targetDate, heading, labels, theme }: CountDownProps) => {
  const [countdown, setCountdown] = useState({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, months: 0 });
  const l = { ...defaultLabels, ...labels };

  useEffect(() => {
    const calculateCountdown = () => {
      if (!targetDate) return;
      const now = new Date();
      let diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, months: 0 });
        return;
      }
      const MS = 1000;
      const MIN = MS * 60;
      const HOUR = MIN * 60;
      const DAY = HOUR * 24;
      const WEEK = DAY * 7;
      const MONTH = DAY * 30;

      const months = Math.floor(diff / MONTH);
      diff %= MONTH;
      const weeks = Math.floor(diff / WEEK);
      diff %= WEEK;
      const days = Math.floor(diff / DAY);
      diff %= DAY;
      const hours = Math.floor(diff / HOUR);
      diff %= HOUR;
      const minutes = Math.floor(diff / MIN);
      diff %= MIN;
      const seconds = Math.floor(diff / MS);

      setCountdown({ months, weeks, days, hours, minutes, seconds });
    };
    calculateCountdown();
    const intervalId = setInterval(calculateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (!targetDate) return <h1 className="required">TARGET DATE NOT SET</h1>;
  return (
    <div className={`container countdown-banner${theme ? ` ${theme}` : ""}`}>
      {heading && <h2 className="heading text-center">{heading}</h2>}
      <p className="w-max text-center countdown-timer">
        {countdown.months > 0 && (
          <span className="countdown-timer-months">
            {countdown.months} {l.months}{" "}
          </span>
        )}
        {countdown.weeks > 0 && (
          <span className="countdown-timer-weeks">
            {countdown.weeks} {l.weeks}{" "}
          </span>
        )}
        {countdown.days > 0 && (
          <span className="countdown-timer-days">
            {countdown.days} {l.days}{" "}
          </span>
        )}
        {countdown.hours > 0 && (
          <span className="countdown-timer-hours">
            {countdown.hours} {l.hours}{" "}
          </span>
        )}
        {countdown.minutes > 0 && (
          <span className="countdown-timer-minutes">
            {countdown.minutes} {l.minutes}{" "}
          </span>
        )}
        {countdown.seconds >= 0 && (
          <span className="countdown-timer-seconds">
            {countdown.seconds} {l.seconds}{" "}
          </span>
        )}
      </p>
    </div>
  );
};
export default CountDown;
