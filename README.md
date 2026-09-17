# Isabella Brito — Portfólio

[![CI/CD](https://github.com/bellacarmobrito/portifolio-web/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/bellacarmobrito/portifolio-web/actions/workflows/ci-cd.yaml)

🔗 **Site no ar:** http://portifolio-isabella.s3-website.us-east-2.amazonaws.com/

Portfólio pessoal construído com Angular 21, contando minha transição de mais de 10 anos liderando produção de eventos corporativos nacionais e internacionais para o desenvolvimento Full Stack.

## Sobre o projeto

Além de reunir meus projetos e contato, este site é meu primeiro projeto Angular "de verdade" fora de sala de aula — usei ele pra praticar decisões de arquitetura que não aparecem em exercício de curso: Signals no lugar de RxJS pra estado local, SSR com hydration, consumo de API externa (GitHub), tema dark/light persistido, e um pipeline de CI/CD publicando direto num bucket S3 a cada push.

### Principais funcionalidades

- **Tema dark/light** com detecção da preferência do sistema e persistência em `localStorage`
- **Projetos carregados dinamicamente da API do GitHub** (linguagens + topics), com fallback pra projetos que não estão no GitHub (ex: apps corporativos privados)
- **Ícones de tecnologia resolvidos automaticamente** a partir da linguagem/topic de cada repositório, com fallback entre dois serviços de ícones
- **SSR (Server-Side Rendering) com hydration**, SEO (Open Graph, Twitter Card, JSON-LD) e página 404 customizada
- **Totalmente responsivo**, testado em mobile real (iOS/Android)
- Download de CV, links de contato e voltar ao topo

## Stack

- [Angular 21](https://angular.dev/) (standalone components, Signals, novo control flow `@if`/`@for`)
- TypeScript
- SCSS com design tokens (CSS custom properties) para os temas
- [Vitest](https://vitest.dev/) para testes unitários
- GitHub Actions para CI/CD, deploy em AWS S3

## Rodando localmente

```bash
npm install
ng serve
```

Acesse `http://localhost:4200/`.

### Testes

```bash
ng test
```

### Build de produção

```bash
ng build
```

Os artefatos são gerados em `dist/portifolio-web/`.

## Deploy

O deploy é automático: todo push na branch `master` dispara o workflow em [`.github/workflows/ci-cd.yaml`](.github/workflows/ci-cd.yaml), que builda o projeto e sincroniza os arquivos com um bucket S3 configurado como site estático.

## Backlog (próximos passos)

- Migrar o hosting para um domínio próprio com HTTPS
- Buscar dados do GitHub em build-time (evitar o rate limit da API não-autenticada)
- Loading state enquanto os projetos carregam
- Toggle de idioma PT/EN

## Contato

- [LinkedIn](https://www.linkedin.com/in/isabellabrito1)
- [GitHub](https://github.com/bellacarmobrito)
- E-mail: isadocarmo7@gmail.com
=======
# portifolio-web
Criando meu primeiro portifolio web
>>>>>>> origin/main
