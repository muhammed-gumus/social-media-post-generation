import WizardClient from "./client";

// Server component for the wizard page
export default function WizardPage() {
  // You can add any server-side operations here
  // For example:
  // - Fetching initial data
  // - Handling server-side authentication
  // - Processing metadata

  // Return the client component that handles all interactive logic
  return <WizardClient />;
}

// Server components metadata
export const metadata = {
  title: "İçerik Oluşturma Sihirbazı",
  description: "Sosyal medya içeriğinizi oluşturun",
};
