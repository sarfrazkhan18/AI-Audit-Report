export const logger = {
  error: (error: Error, context?: any) => {
    console.error(error);
    // Send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  },
  
  info: (message: string, data?: any) => {
    console.log(message, data);
    // Log to monitoring service
  }
}; 