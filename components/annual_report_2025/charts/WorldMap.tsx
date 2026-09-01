'use client';
import { useEffect, useState } from 'react';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { MapPinVM } from '@/types/annualReport2025';

const PIN_PATH =
  'M0 0 C -6.5 -11 -10.5 -15 -10.5 -22 A 10.5 10.5 0 1 1 10.5 -22 C 10.5 -15 6.5 -11 0 0 Z';

export default function WorldMap({ pins = [] }: { pins?: MapPinVM[] }) {
  const [paths, setPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/countries-110m.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((world) => {
        const land = feature(world, world.objects.countries as any) as any;
        const projection = geoEquirectangular().fitSize([1000, 500], land);
        const pathGenerator = geoPath().projection(projection);
        const generated = (land.features as any[]).map((f: any) => pathGenerator(f));
        setPaths(generated.filter(Boolean) as string[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const summary = pins
    .map((p) => p.label)
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-ar-line bg-ar-surface"
      role="img"
      aria-label={summary ? `Global presence map: ${summary}` : 'Global presence map'}
    >
      {loading ? (
        <div className="flex aspect-[2/1] items-center justify-center text-sm text-ar-muted">
          Loading map…
        </div>
      ) : (
        <svg
          viewBox="0 0 1000 500"
          className="h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <g fill="#d6d7cf" stroke="#c8c9c0" strokeWidth="0.75" strokeLinejoin="round">
            {paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {pins.map((p, i) => {
            const cx = (p.x / 100) * 1000;
            const cy = (p.y / 100) * 500;
            const fill = p.accent ? '#e06b3b' : '#143055';
            return (
              <g key={i} transform={`translate(${cx}, ${cy})`}>
                <ellipse cx="0" cy="1.5" rx="7" ry="2.5" fill="rgba(0,0,0,0.12)" />
                <path d={PIN_PATH} fill={fill} />
                <circle cx="0" cy="-22" r="4.2" fill="#ffffff" />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
