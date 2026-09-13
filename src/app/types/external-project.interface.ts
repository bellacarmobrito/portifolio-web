import { Repository } from "./repository.interface";

export interface ExternalProject {
  name: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  languages: string[];
  topics?: string[];
}

export const EXTERNAL_PROJECTS: ExternalProject[] = [
  {
    name: 'Jogo Justo API',
    description: 'O Jogo Justo é uma plataforma de HRTech voltada à integração e retenção de talentos diversos nas organizações. A solução combina trilhas de capacitação baseadas em microlearning, mentoria com identificação de afinidade cultural e acompanhamento de indicadores ESG para tornar o processo de onboarding mais estruturado, inclusivo e eficiente.',
    html_url: 'https://github.com/welinton19/JogoJusto',
    homepage: null,
    languages: ['CS', 'gherkin', 'Dockerfile'],
    topics: [''],
  },
  {
    name: 'CRM WTC API',
    description: 'API RESTful desenvolvida em .NET 9 com MongoDB Atlas, arquitetura em camadas, autenticação JWT, mensagens em tempo real via SignalR e deploy automatizado no Microsoft Azure.',
    html_url: 'https://github.com/welinton19/CrmWTC.Dotne',
    homepage: 'https://crmwtc-gxajf2ckbgesdmab.eastus2-01.azurewebsites.net/swagger',
    languages: ['CS', 'Dockerfile'],
    topics: [''],
  }
]

export function toRepository(project: ExternalProject): Repository {
  return {
    name: project.name,
    description: project.description,
    html_url: project.html_url,
    homepage: project.homepage ?? null,
    languages_url: '',
    topics: []
  }
}