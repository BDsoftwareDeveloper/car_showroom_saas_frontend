export const logError = (context, error) => {
  console.error(`[${context}]`, error?.response?.data || error.message);
};
