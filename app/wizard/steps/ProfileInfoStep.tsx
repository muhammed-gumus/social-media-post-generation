"use client";

import { useWizard } from "../wizardContext";

export default function ProfileInfoStep() {
  const { state, setState } = useWizard();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-primary/5 rounded-lg mb-4">
        <p className="text-sm">
          Mockup içinde kendi kullanıcı adınızı ve profil fotoğrafınızı
          kullanarak içeriğin nasıl görüneceğini daha gerçekçi şekilde
          görebilirsiniz.
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <input
          type="checkbox"
          id="profileToggle"
          className="w-4 h-4"
          checked={state.useProfileInfo}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              useProfileInfo: e.target.checked,
            }))
          }
        />
        <label htmlFor="profileToggle" className="text-sm font-medium">
          Mockup için kendi profil bilgilerimi kullan
        </label>
      </div>

      {state.useProfileInfo && (
        <>
          <div>
            <label htmlFor="username" className="block mb-2 font-medium">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="@kullaniciadiniz"
              value={state.username}
              onChange={(e) =>
                setState((prev) => ({ ...prev, username: e.target.value }))
              }
              required={state.useProfileInfo}
            />
          </div>

          <div>
            <label htmlFor="profilePhoto" className="block mb-2 font-medium">
              Profil Fotoğrafı URL (Opsiyonel)
            </label>
            <input
              id="profilePhoto"
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/profil-foto.jpg"
              value={state.profilePhotoUrl}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  profilePhotoUrl: e.target.value,
                }))
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Bir görsel URL&apos;si girmezseniz, varsayılan bir avatar
              kullanılacaktır.
            </p>
          </div>
        </>
      )}

      <div className="p-4 border rounded-lg mt-6">
        <h3 className="font-medium mb-2">Özet</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-medium">Platform:</span>{" "}
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
          </li>
          <li>
            <span className="font-medium">İçerik Türü:</span>{" "}
            {state.selectedContentType ? state.selectedContentType : "-"}
          </li>
          <li>
            <span className="font-medium">Sektör:</span>{" "}
            {state.selectedIndustry ? state.selectedIndustry : "-"}
          </li>
          <li>
            <span className="font-medium">Amaç:</span>{" "}
            {state.selectedPurpose ? state.selectedPurpose : "-"}
          </li>
          <li>
            <span className="font-medium">Hedef Kitle:</span>{" "}
            {state.selectedAudience ? state.selectedAudience : "-"}
          </li>
          <li>
            <span className="font-medium">İçerik Tonu:</span>{" "}
            {state.selectedTone ? state.selectedTone : "-"}
          </li>
          {state.targetAgeRange && (
            <li>
              <span className="font-medium">Yaş Aralığı:</span>{" "}
              {state.targetAgeRange}
            </li>
          )}
          {state.targetLocation && (
            <li>
              <span className="font-medium">Konum:</span> {state.targetLocation}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
