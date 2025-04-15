/**
 * TEMPLATES FUNCTIONALITY TEMPORARILY DISABLED
 *
 * This feature is currently under development and has been temporarily disabled.
 * The actual implementation can be found in /disabled-features/templates/
 */

export interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  industry: string;
  platform: string;
  contentType: string;
  popularity: string;
  prompt: string;
  prefilledFields: Record<string, string>;
}

// Empty templates array to ensure no templates are shown in the UI
export const templates: ContentTemplate[] = [];

// Placeholder functions that return empty results
export function getTemplateById(): ContentTemplate | undefined {
  console.log("Templates functionality is temporarily disabled");
  return undefined;
}

export function getTemplatesByIndustry(): ContentTemplate[] {
  console.log("Templates functionality is temporarily disabled");
  return [];
}

export function getTemplatesByPlatform(): ContentTemplate[] {
  console.log("Templates functionality is temporarily disabled");
  return [];
}

export function getTemplatesByContentType(
): ContentTemplate[] {
  console.log("Templates functionality is temporarily disabled");
  return [];
}

export function getAllIndustries(): string[] {
  console.log("Templates functionality is temporarily disabled");
  return [];
}

export function getAllPlatforms(): string[] {
  console.log("Templates functionality is temporarily disabled");
  return [];
}

export function getAllContentTypes(): string[] {
  console.log("Templates functionality is temporarily disabled");
  return [];
}
