export const convertFromSeconds=(seconds: number | string): string => {
   // Convert the input to a number if it's a string
   let totalSeconds = typeof seconds === 'string' ? parseFloat(seconds) : seconds;

   // If parsing fails or if the value is not a valid number
   if (isNaN(totalSeconds)) {
     return 'Invalid input';
   }
 
   const minuteInSeconds = 60;
   const hourInSeconds = 60 * minuteInSeconds;
   const dayInSeconds = 24 * hourInSeconds;
   const monthInSeconds = 30 * dayInSeconds; // Approximate month length (30 days)
   const yearInSeconds = 12 * monthInSeconds; // Approximate year length (12 months)
 
   if (totalSeconds >= yearInSeconds) {
     const years = totalSeconds / yearInSeconds;
     return `${years.toFixed(1)} year${years > 1 ? 's' : ''}`;
   } else if (totalSeconds >= monthInSeconds) {
     const months = totalSeconds / monthInSeconds;
     return `${months.toFixed(1)} month${months > 1 ? 's' : ''}`;
   } else if (totalSeconds >= dayInSeconds) {
     const days = totalSeconds / dayInSeconds;
     return `${days.toFixed(1)} day${days > 1 ? 's' : ''}`;
   } else {
     const minutes = totalSeconds / minuteInSeconds;
     return `${minutes.toFixed(1)} minute${minutes > 1 ? 's' : ''}`;
   }
  }