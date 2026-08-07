import type { SVGProps } from "react";

export type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

/** Minimal dependency-free line-icon set (24x24, stroke-based) for the nav sidebar. */
function icon(paths: React.JSX.Element): IconComponent {
  return function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

export const IconDashboard = icon(
  <>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </>
);

export const IconBox = icon(
  <>
    <path d="M21 8 12 3 3 8l9 5 9-5Z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </>
);

export const IconLayers = icon(
  <>
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 12 10 5 10-5" />
    <path d="m2 17 10 5 10-5" />
  </>
);

export const IconTruck = icon(
  <>
    <rect x="1" y="6" width="14" height="11" rx="1.5" />
    <path d="M15 10h4l3 3v4h-7z" />
    <circle cx="6" cy="19" r="1.75" />
    <circle cx="17.5" cy="19" r="1.75" />
  </>
);

export const IconClipboard = icon(
  <>
    <rect x="5" y="4" width="14" height="17" rx="1.5" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M9 11h6M9 15h6M9 19h3" />
  </>
);

export const IconRepeat = icon(
  <>
    <path d="M17 2 21 6l-4 4" />
    <path d="M3 12v-2a4 4 0 0 1 4-4h14" />
    <path d="M7 22 3 18l4-4" />
    <path d="M21 12v2a4 4 0 0 1-4 4H3" />
  </>
);

export const IconChefHat = icon(
  <>
    <path d="M6 13a4 4 0 0 1-1-7.87A4.5 4.5 0 0 1 12 4a4.5 4.5 0 0 1 7 1.13A4 4 0 0 1 18 13" />
    <path d="M6 13h12v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5Z" />
    <path d="M6 21h12" />
  </>
);

export const IconTrash = icon(
  <>
    <path d="M3 6h18" />
    <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M6 6v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6" />
    <path d="M10 11v6M14 11v6" />
  </>
);

export const IconArrowLeftRight = icon(
  <>
    <path d="m17 3 4 4-4 4" />
    <path d="M3 7h18" />
    <path d="m7 21-4-4 4-4" />
    <path d="M21 17H3" />
  </>
);

export const IconBell = icon(
  <>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10.5 20a1.5 1.5 0 0 0 3 0" />
  </>
);

export const IconBarChart = icon(
  <>
    <path d="M4 20V10M12 20V4M20 20v-7" />
    <path d="M2 20h20" />
  </>
);

export const IconUsers = icon(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16.5 5.5A3.5 3.5 0 0 1 18 12.14" />
    <path d="M21.5 20a5.5 5.5 0 0 0-4.5-7.86" />
  </>
);

export const IconLogout = icon(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </>
);
