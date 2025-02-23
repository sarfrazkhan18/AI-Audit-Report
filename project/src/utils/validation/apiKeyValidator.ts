export function validateApiKey(apiKey: string | undefined): void {
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file.');
  }

  if (typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    throw new Error('Invalid API key format. Please check your API key configuration.');
  }
}