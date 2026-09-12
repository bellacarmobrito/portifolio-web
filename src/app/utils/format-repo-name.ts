const ACRONYMS = ['api', 'gh', 'css', 'html', 'ui', 'ux', 'wtc'];

export function formatRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .map(word => ACRONYMS.includes(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}