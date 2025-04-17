"use client";

import { useWizard } from "../wizardContext";

export default function AudienceStep() {
  const { state, setState, getAudienceOptions } = useWizard();
  const audienceOptions = getAudienceOptions();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {audienceOptions.map((audience) => (
          <div
            key={audience.id}
            className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
              state.selectedAudience === audience.id
                ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            }`}
            onClick={() =>
              setState((prev) => ({ ...prev, selectedAudience: audience.id }))
            }
          >
            {state.selectedAudience === audience.id && (
              <div
                className="absolute top-0 right-0 w-0 h-0 
                border-t-[20px] border-t-black 
                border-l-[20px] border-l-transparent"
              ></div>
            )}
            <div className="font-bold">{audience.name}</div>
            <div className="text-sm text-gray-700 mt-1">
              {audience.description}
            </div>
          </div>
        ))}
      </div>

      {/* Additional audience details */}
      <div className="mt-8 border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative">
        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-black z-10"></div>
        <h3 className="font-bold text-xl mb-4">
          Hedef Kitle Detaylandırma (Opsiyonel)
        </h3>

        <div className="mb-5">
          <label htmlFor="ageRange" className="block mb-2 text-sm font-bold">
            Yaş Aralığı
          </label>
          <select
            id="ageRange"
            className="w-full p-3 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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

        <div className="mb-5">
          <label htmlFor="gender" className="block mb-2 text-sm font-bold">
            Cinsiyet
          </label>
          <select
            id="gender"
            className="w-full p-3 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
          <label htmlFor="location" className="block mb-2 text-sm font-bold">
            Konum / Şehir
          </label>
          <input
            id="location"
            type="text"
            className="w-full p-3 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
