# Diagram Systems

A visual atlas of ten animated engineering diagrams, built entirely with semantic HTML and CSS.

## Diagrams

- Distributed service architecture
- CI/CD pipeline
- Request sequence
- Entity relationship model
- Job state machine
- Event streaming topology
- Circuit breaker health
- Load distribution
- Golden signals telemetry
- Cache hierarchy

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm test
```

The static site is exported to `out/`.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes the site whenever `main` is updated. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
