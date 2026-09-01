import { getApiUrl } from '@/lib/api-config';

/**
 * Resuelve un filename_disk / UUID de Directus a una URL absoluta de asset.
 * Reutiliza el mismo patrón de la versión legacy ({DIRECTUS_URL}/assets/{id}).
 */
export function getAssetUrl(
  fileId?: string | null,
  opts: { format?: 'webp' | 'png' | 'jpg'; quality?: number; width?: number } = {}
): string | undefined {
  if (!fileId) return undefined;
  // Marcadores de seed sin sustituir todavía -> no romper el render.
  if (fileId.startsWith('REUSE:')) return undefined;

  const params = new URLSearchParams();
  if (opts.format) params.set('format', opts.format);
  if (opts.quality) params.set('quality', String(opts.quality));
  if (opts.width) params.set('width', String(opts.width));

  const qs = params.toString();
  return `${getApiUrl()}/assets/${fileId}${qs ? `?${qs}` : ''}`;
}
