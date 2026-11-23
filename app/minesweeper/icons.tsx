export function FlagIcon() {
  return (
    <svg viewBox="3 1 11 14" width="80%" height="80%" shapeRendering="crispEdges">
      {/* red flag, pointing left */}
      <g fill="#e11d1d">
        <rect x="7" y="2" width="1" height="1" />
        <rect x="6" y="3" width="2" height="1" />
        <rect x="5" y="4" width="3" height="1" />
        <rect x="4" y="5" width="4" height="1" />
        <rect x="5" y="6" width="3" height="1" />
        <rect x="6" y="7" width="2" height="1" />
        <rect x="7" y="8" width="1" height="1" />
      </g>
      {/* pole and base */}
      <g fill="#000">
        <rect x="8" y="2" width="1" height="9" />
        <rect x="6" y="11" width="5" height="1" />
        <rect x="4" y="12" width="9" height="2" />
      </g>
    </svg>
  );
}

export function BombIcon() {
  return (
    <svg viewBox="0 0 16 16" width="70%" height="70%" shapeRendering="crispEdges">
      <g fill="#000" stroke="#000" strokeWidth="1.5">
        <circle cx="8" cy="8" r="4.5" />
        <line x1="8" y1="1" x2="8" y2="15" />
        <line x1="1" y1="8" x2="15" y2="8" />
        <line x1="3" y1="3" x2="13" y2="13" />
        <line x1="13" y1="3" x2="3" y2="13" />
      </g>
      {/* shine */}
      <rect x="5" y="5" width="2" height="2" fill="#fff" />
    </svg>
  );
}