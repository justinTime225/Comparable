export const TOGGLE_PIE = 'TOGGLE_PIE';
export const TOGGLE_BUBBLE = 'TOGGLE_BUBBLE';
export const TOGGLE_SCATTER = 'TOGGLE_SCATTER';

export function togglePie() {
  return {
    type: TOGGLE_PIE,
  };
}

export function toggleBubble() {
  return {
    type: TOGGLE_BUBBLE,
  };
}

export function toggleScatter() {
  return {
    type: TOGGLE_SCATTER,
  };
}
