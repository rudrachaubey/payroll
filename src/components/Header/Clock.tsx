import React, { useState, useEffect } from 'react';
import axiosInstance from '../../apiconfig';

const Clock: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Format the timer in HH:mm:ss
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    if (isClockedIn  && elapsedTime !== null) {
      timer = setInterval(() => {
        setElapsedTime((prev) => (prev !== null ? prev + 1 : null));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isClockedIn, elapsedTime]);

  const calculateElapsedTime = (clockInTime: string) => {
    const clockInDate = new Date(clockInTime);
    const currentTime = new Date();
    return Math.floor((currentTime.getTime() - clockInDate.getTime()) / 1000);
  };

  const handleClockIn = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('TimeEntry/clockin?userId=1');
      const data = response.data;
      setIsClockedIn(true);
      setElapsedTime(calculateElapsedTime(data.entry.clockIn)); 
    } catch (error) {
      console.error('Error during clock-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      await axiosInstance.post('TimeEntry/clockout?userId=1');
      setIsClockedIn(false);
      setElapsedTime(null);
    } catch (error) {
      console.error('Error during clock-out:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (loading) return;
    if (isClockedIn) {
      handleClockOut();
    } else {
      handleClockIn();
    }
  };

  return (
    <div
      className={`w-35 h-15 flex flex-col items-center justify-center text-white font-bold rounded-md cursor-pointer transition-all select-none ${
        isClockedIn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
    >
      <div className='text-xs'>{isClockedIn ? 'CLOCKED IN' : 'CLOCKED OUT'}</div>
      <div className="text-xs">
        {isClockedIn && elapsedTime !== null ? formatTime(elapsedTime) : '--:--:--'}
      </div>
    </div>
  );
};

export default Clock;
