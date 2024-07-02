import { useEffect, useState } from 'react';

const DEFAULT_TIME = 600;

const useTimer = () => {
  const [time, setTime] = useState(DEFAULT_TIME);
  const [timerIsValid, setTimerIsValid] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timerIsValid) {
      timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerId);
            setTimerIsValid(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timerIsValid]);

  const handleSetTimer = () => {
    setTime(DEFAULT_TIME);
    setTimerIsValid(true);
  };

  const handleStopTimer = () => {
    setTimerIsValid(false);
  };

  const formatTime = (time: number) => {
    const minute = Math.floor(time / 60);
    const second = time % 60;

    return `${minute}:${second < 10 ? '0' + second : second}`;
  };

  return {
    setTimer: handleSetTimer,
    stopTimer: handleStopTimer,
    remainingTime: time,
    formattedTime: formatTime(time),
  };
};

export default useTimer;
