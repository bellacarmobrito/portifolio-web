export interface ProjectExtra {
  screenshot?: string;
  videoUrl?: string;
  achievement?: string;
}

export const PROJECT_EXTRAS: Record<string, ProjectExtra> = {
  'nome-do-repo': {
    screenshot: 'assets/projects',
  }
}