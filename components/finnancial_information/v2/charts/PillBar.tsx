'use client';
import React from 'react';

/** Bar shape with fully rounded ends (pill), like the reference design. */
export function PillBar(props: any) {
  const { x, y, width, height, fill } = props;
  if (width === undefined || height === undefined || height === 0) return null;
  const h = Math.abs(height);
  const top = height < 0 ? y + height : y;
  const r = Math.min(width / 2, h / 2, 14);
  return <rect x={x} y={top} width={width} height={h} rx={r} ry={r} fill={fill} />;
}
