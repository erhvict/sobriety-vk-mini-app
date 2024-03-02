import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { FC, useEffect, useState } from 'react';

import './Timer.css';

const Timer: FC = () => {
  const routeNavigator = useRouteNavigator();

  const [targetTimestamp, setTargetTimestamp] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<{
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Установим целевую дату
    const targetDate: Date = new Date('2024-03-01T12:00:00');
    setTargetTimestamp(targetDate.getTime());
  }, []);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      const currentTimestamp: number = Date.now();
      const timeDiff: number = currentTimestamp - targetTimestamp;
      if (timeDiff <= 0) {
        clearInterval(intervalId);
        setRemainingTime({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const seconds: number = Math.floor((timeDiff / 1000) % 60);
      const minutes: number = Math.floor((timeDiff / (1000 * 60)) % 60);
      const hours: number = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const years: number = Math.floor(days / 365);
      const remainingDays: number = days % 365;
      setRemainingTime({ years, days: remainingDays, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTimestamp]);

  const renderTimeUnit = (value: number, unit: string[]): JSX.Element | null => {
    if (value === 0) return null;
    return (
      <span>
        {value} {getWordForm(value, unit)}{' '}
      </span>
    );
  };

  const getWordForm = (number: number, forms: string[]): string => {
    const mod10: number = number % 10;
    const mod100: number = number % 100;
    if (mod10 === 1 && mod100 !== 11) {
      return forms[0];
    } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
      return forms[1];
    } else {
      return forms[2];
    }
  };

  return (
    <>
      <div className="timer-container" onClick={() => routeNavigator.showModal('addAlcho')}>
        <div className="text-container">
          <p className="timer-text">
            {renderTimeUnit(remainingTime.years, ['год', 'года', 'лет'])}
          </p>
          <p className="timer-text">
            {renderTimeUnit(remainingTime.days, ['день', 'дня', 'дней'])}
          </p>
          <p className="timer-text">
            {renderTimeUnit(remainingTime.hours, ['час', 'часа', 'часов'])}
          </p>
          <p className="timer-text">
            {renderTimeUnit(remainingTime.minutes, ['минута', 'минуты', 'минут'])}
          </p>
          <p className="timer-text">
            {renderTimeUnit(remainingTime.seconds, ['секунда', 'секунды', 'секунд'])}
          </p>
        </div>
      </div>
    </>
  );
};

export default Timer;
