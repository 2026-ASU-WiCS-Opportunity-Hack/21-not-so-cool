const deploymentMode =
  process.env.NEXT_PUBLIC_DEPLOYMENT_MODE?.trim().toLowerCase() ?? "global";

const configuredChapterSlug =
  process.env.NEXT_PUBLIC_CHAPTER_SLUG?.trim().toLowerCase() ?? "";

const configuredGlobalSiteUrl =
  process.env.NEXT_PUBLIC_GLOBAL_SITE_URL?.trim().replace(/\/$/, "") ?? "";

export function isChapterDeployment() {
  return deploymentMode === "chapter" && configuredChapterSlug.length > 0;
}

export function isGlobalDeployment() {
  return !isChapterDeployment();
}

export function getConfiguredChapterSlug() {
  return isChapterDeployment() ? configuredChapterSlug : null;
}

export function getGlobalSiteUrl() {
  return configuredGlobalSiteUrl || null;
}

export function getChapterRoutePath(
  chapterSlug: string,
  suffix: "" | "/about" | "/contact" = "",
) {
  const deploymentChapterSlug = getConfiguredChapterSlug();

  if (deploymentChapterSlug && deploymentChapterSlug === chapterSlug) {
    return suffix || "/";
  }

  return `/${chapterSlug}${suffix}`;
}

export function getGlobalFallbackHref(path: string = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const globalSiteUrl = getGlobalSiteUrl();

  if (!globalSiteUrl) {
    return normalizedPath;
  }

  return `${globalSiteUrl}${normalizedPath}`;
}
