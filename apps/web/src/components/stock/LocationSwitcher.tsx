"use client";

import type { Location } from "@platform/contracts";

export function LocationSwitcher({ locations, selectedLocationId }: { locations: Location[]; selectedLocationId: string }) {
  return (
    <form method="get" className="flex items-center gap-2">
      <label htmlFor="locationId" className="text-sm text-zinc-500">
        Location
      </label>
      <select
        id="locationId"
        name="locationId"
        defaultValue={selectedLocationId}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      >
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="rounded border px-2 py-1.5 text-sm">
          Go
        </button>
      </noscript>
    </form>
  );
}
