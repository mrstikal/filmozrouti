export default function truncateOverview(text: string):string {
  if (!text || text.length <= 150) return text;

  let truncated = text.substring(0, 150);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace !== -1) {
    truncated = truncated.substring(0, lastSpace);
  }

  return truncated + ' ...';
};