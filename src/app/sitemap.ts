import { BASE_URL, ROUTES } from "@/lib/constants";
import { getLatestPosts } from "@/lib/dal/post";
import type { MetadataRoute } from "next";

const fullURL = (url: string) => `${BASE_URL}${url}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const importantPage = [ROUTES.blogs];
  const staticRoutes: MetadataRoute.Sitemap = Object.values(ROUTES).map(
    (url) => {
      return {
        url: fullURL(url),
        priority: importantPage.includes(url) ? 1 : 0.8,
        lastModified: new Date().toISOString(),
        changeFrequency: importantPage.includes(url) ? "daily" : "weekly"
      };
    }
  );

  // TODO: find a way to map all the posts later.
  const blogsPages: MetadataRoute.Sitemap = (await getLatestPosts()).map(
    (post) => ({
      url: fullURL(`${ROUTES.post}/${post._id}`),
      priority: 1,
      lastModified: post.updatedAt,
      changeFrequency: "daily"
    })
  );

  return [...staticRoutes, ...blogsPages];
}
