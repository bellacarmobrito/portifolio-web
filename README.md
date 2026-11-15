# Isabella Brito — Portfólio

🔗 **Site no ar:** https://isabellabrito.vercel.app/

Portfólio pessoal construído com Angular 21, contando minha transição de mais de 10 anos liderando produção de eventos corporativos nacionais e internacionais para o desenvolvimento Full Stack.

## Sobre o projeto

Além de reunir meus projetos e contato, este site é meu primeiro projeto Angular "de verdade" fora de sala de aula — usei ele pra praticar decisões de arquitetura que não aparecem em exercício de curso: Signals no lugar de RxJS pra estado local, SSR com hydration, consumo de API externa (GitHub), tema dark/light persistido, e deploy contínuo: cada push na `main` publica o site na Vercel.

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
- [Vercel](https://vercel.com/) para hospedagem e deploy contínuo

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

O deploy é automático pela Vercel: todo push na branch `main` publica uma nova versão em produção, e cada Pull Request ganha uma URL de preview para revisão antes do merge.

A página é pré-renderizada no build (`RenderMode.Prerender`), então os dados do GitHub exibidos nos cards refletem o momento do último deploy.

## Backlog (próximos passos)

- Domínio próprio
- Manter os dados do GitHub atualizados sem depender de um novo deploy (redeploy agendado ou SSR por requisição) e evitar o rate limit da API não-autenticada
- Loading state enquanto os projetos carregam
- Toggle de idioma PT/EN

## Contato

- [LinkedIn](https://www.linkedin.com/in/isabellabrito1)
- [GitHub](https://github.com/bellacarmobrito)
- E-mail: isadocarmo7@gmail.com

