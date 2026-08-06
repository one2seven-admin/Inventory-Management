"use client";

import type { Location } from "@platform/contracts";
import { Select } from "@/components/ui/Select";

export function LocationSwitcher({ locations, selectedLocationId }: { locations: Location[]; selectedLocationId: string }) {
  return (
    <form method="get" className="flex items-center gap-2">
      <label htmlFor="locationId" className="text-sm text-stone-500">
        Location
      </label>
      <Select
        id="locationId"
        name="locationId"
        defaultValue={selectedLocationId}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Select>
      <noscript>
        <button type="submit" className="rounded border px-2 py-1.5 text-sm">
          Go
        </button>
      </noscript>
    </form>
  );
}
