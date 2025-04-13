"use client";

import { useWizard } from "../wizardContext";

export default function AudienceStep() {
  const { state, setState, getAudienceOptions } = useWizard();
  const audienceOptions = getAudienceOptions();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {audienceOptions.map((audience) => (
          <div
            key={audience.id}
            className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
              state.selectedAudience === audience.id
                ? "border-primary bg-primary/10"
                : ""
            }`}
            onClick={() =>
              setState((prev) => ({ ...prev, selectedAudience: audience.id }))
            }
          >
            <div className="font-medium">{audience.name}</div>
            <div className="text-sm text-gray-500">{audience.description}</div>
          </div>
        ))}
      </div>

      {/* Additional audience details */}
      <div className="mt-8 space-y-4 border p-4 rounded-lg">
        <h3 className="font-medium">Hedef Kitle Detaylandırma (Opsiyonel)</h3>

        <div>
          <label htmlFor="ageRange" className="block mb-2 text-sm font-medium">
            Yaş Aralığı
          </label>
          <select
            id="ageRange"
            className="w-full p-2 border rounded-md"
            value={state.targetAgeRange}
            onChange={(e) =>
              setState((prev) => ({ ...prev, targetAgeRange: e.target.value }))
            }
          >
            <option value="">Seçiniz</option>
            <option value="13-17">13-17</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
            <option value="65+">65+</option>
            <option value="all">Tüm yaşlar</option>
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="block mb-2 text-sm font-medium">
            Cinsiyet
          </label>
          <select
            id="gender"
            className="w-full p-2 border rounded-md"
            value={state.targetGender}
            onChange={(e) =>
              setState((prev) => ({ ...prev, targetGender: e.target.value }))
            }
          >
            <option value="all">Tümü</option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block mb-2 text-sm font-medium">
            Konum / Şehir
          </label>
          <input
            id="location"
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="ör: İstanbul, Türkiye, Avrupa, vb."
            value={state.targetLocation}
            onChange={(e) =>
              setState((prev) => ({ ...prev, targetLocation: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
