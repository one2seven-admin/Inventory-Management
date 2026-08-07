"use client";

import type { Location } from "@platform/contracts";
import { MapPin } from "lucide-react";

export function LocationSwitcher({ locations, selectedLocationId }: { locations: Location[]; selectedLocationId: string }) {
  return (
    <form method="get" className="flex items-center">
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-on-surface-variant"
          aria-hidden="true"
        />
        <select
          id="locationId"
          name="locationId"
          aria-label="Location"
          defaultValue={selectedLocationId}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
          className="label-caps appearance-none rounded border border-outline bg-surface-container-high py-1.5 pl-8 pr-3 text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <noscript>
        <button type="submit" className="ml-2 rounded border border-outline px-2 py-1.5 text-sm">
          Go
        </button>
      </noscript>
    </form>
  );
}
