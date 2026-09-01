// Mapa token de diseño -> hex (de §3.1 del spec). Centraliza el color de los charts
// para que Recharts respete exactamente la paleta del sistema.
export const TOKEN_HEX: Record<string, string> = {
  'sky.500': '#97d1dc',
  'secondary.500': '#d65f00',
  'ocre.500': '#c5a266',
  'gray.500': '#b4b4b4',
  'primary.500': '#00586f',
  'teal.500': '#1d8585',
  surface2: '#eeeeea',
};

export const hex = (token?: string, fallback = '#166e6e'): string =>
  (token && TOKEN_HEX[token]) || fallback;
