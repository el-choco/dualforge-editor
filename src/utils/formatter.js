export const cleanHTML = (text) => {
  if (!text) return '';

  let formatted = text;

  formatted = formatted.replace(/\r\n/g, '\n');

  formatted = formatted.replace(/[ \t]+$/gm, '');

  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  return formatted.trim();
};