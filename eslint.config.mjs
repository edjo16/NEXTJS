// ESLint flat config — Next.js 16 removio el comando `next lint` y
// eslint-config-next 16 ya exporta flat config (array) en vez de un objeto `extends`.
// Reemplaza al antiguo .eslintrc.cjs (extends: ["next/core-web-vitals"]).
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // Se mantiene apagada igual que en el .eslintrc.cjs anterior.
      'react-hooks/exhaustive-deps': 'off',

      // eslint-plugin-react-hooks v6 (que trae eslint-config-next 16) agrega estas
      // reglas nuevas del React Compiler, activadas como "error" por defecto.
      // No existian en Next 15 y `next build` ya no corre lint, asi que no rompen
      // el build. Se dejan en "warn" para no volver rojo un `npm run lint` que
      // antes pasaba, y para poder atacarlas en un cambio aparte.
      // Conteo actual: refs 48, set-state-in-effect 34, immutability 9, error-boundaries 4.
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/error-boundaries': 'warn',
    },
  },
];
