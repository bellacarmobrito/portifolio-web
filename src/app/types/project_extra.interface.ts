export interface ProjectExtra {
  screenshot?: string;
  videoUrl?: string;
  achievement?: string;
}

export const PROJECT_EXTRAS: Record<string, ProjectExtra> = {
  'challenge-letssign-frontend': {
    achievement: '🏆 1º Lugar — NEXT FIAP 2025',
  },
  'challenge-wtc': {
    achievement: 'Finalista — NEXT FIAP 2026',
  },
}