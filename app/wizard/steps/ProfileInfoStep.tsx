"use client";

import { useWizard } from "../wizardContext";

export default function ProfileInfoStep() {
  const { state, setState } = useWizard();

  return (
    <div className="space-y-6">
      <div className="p-5 border-2 border-black bg-[#ffde59]/20 relative">
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white border-2 border-black z-10"></div>
        <p className="font-medium">
          Mockup içinde kendi kullanıcı adınızı ve profil fotoğrafınızı
          kullanarak içeriğin nasıl görüneceğini daha gerçekçi şekilde
          görebilirsiniz.
        </p>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="checkbox"
          id="profileToggle"
          className="w-5 h-5 border-2 border-black"
          checked={state.useProfileInfo}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              useProfileInfo: e.target.checked,
            }))
          }
        />
        <label htmlFor="profileToggle" className="text-md font-bold">
          Mockup için kendi profil bilgilerimi kullan
        </label>
      </div>

      {state.useProfileInfo && (
        <>
          <div>
            <label htmlFor="username" className="block mb-3 font-bold">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
              placeholder="@kullaniciadiniz"
              value={state.username}
              onChange={(e) =>
                setState((prev) => ({ ...prev, username: e.target.value }))
              }
              required={state.useProfileInfo}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="profilePhoto" className="block mb-3 font-bold">
              Profil Fotoğrafı URL (Opsiyonel)
            </label>
            <input
              id="profilePhoto"
              type="text"
              className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
              placeholder="https://example.com/profil-foto.jpg"
              value={state.profilePhotoUrl}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  profilePhotoUrl: e.target.value,
                }))
              }
            />
            <p className="mt-2 text-sm text-gray-700 font-medium">
              Bir görsel URL&apos;si girmezseniz, varsayılan bir avatar
              kullanılacaktır.
            </p>
          </div>
        </>
      )}

      <div className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-8 relative">
        <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-[#ffde59] border-2 border-black z-10"></div>
        <h3 className="font-bold text-xl mb-4">Özet</h3>
        <ul className="space-y-3">
          <li className="font-medium">
            <span className="font-black">Platform:</span>{" "}
            <span className="px-2 py-1 bg-[#ffde59] border-2 border-black inline-block">
              {state.selectedPlatform === "twitter"
                ? "X (Twitter)"
                : state.selectedPlatform === "instagram"
                ? "Instagram"
                : state.selectedPlatform === "linkedin"
                ? "LinkedIn"
                : state.selectedPlatform === "facebook"
                ? "Facebook"
                : state.selectedPlatform === "tiktok"
                ? "TikTok"
                : ""}
            </span>
          </li>
          <li className="font-medium">
            <span className="font-black">İçerik Türü:</span>{" "}
            {state.selectedContentType ? state.selectedContentType : "-"}
          </li>
          <li className="font-medium">
            <span className="font-black">Sektör:</span>{" "}
            {state.selectedIndustry ? state.selectedIndustry : "-"}
          </li>
          <li className="font-medium">
            <span className="font-black">Amaç:</span>{" "}
            {state.selectedPurpose ? state.selectedPurpose : "-"}
          </li>
          <li className="font-medium">
            <span className="font-black">Hedef Kitle:</span>{" "}
            {state.selectedAudience ? state.selectedAudience : "-"}
          </li>
          <li className="font-medium">
            <span className="font-black">İçerik Tonu:</span>{" "}
            {state.selectedTone ? state.selectedTone : "-"}
          </li>
          {state.targetAgeRange && (
            <li className="font-medium">
              <span className="font-black">Yaş Aralığı:</span>{" "}
              {state.targetAgeRange}
            </li>
          )}
          {state.targetLocation && (
            <li className="font-medium">
              <span className="font-black">Konum:</span> {state.targetLocation}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
