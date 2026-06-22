# ENVIRONMENTS.md — ReciclaFácil (ODS 12)

## DEV
- Rama: feature/* y develop
- Deploy: libre para cualquier integrante
- Pruebas obligatorias: Jest (cobertura parcial permitida con --passWithNoTests)
- Política de fallo: notifica, no bloquea

## QA
- Rama: develop -> Pull Request hacia main
- Deploy: requiere aprobación de QA (Arturo Ygnacio Del Rio Rayas)
- Pruebas obligatorias: type-check + lint + 100% Jest
- Política de fallo: bloquea el merge del PR

## PROD
- Rama: main
- Deploy: automático vía GitHub Actions tras merge aprobado
- Pruebas obligatorias: type-check + lint + Jest + build de producción
- Política de fallo: bloquea el job deploy-vercel
