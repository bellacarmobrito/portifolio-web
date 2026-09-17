export interface Repository {
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  homepage: string | null;
  topics: string[];
}