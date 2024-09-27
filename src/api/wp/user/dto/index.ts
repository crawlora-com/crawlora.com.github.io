import { z } from "zod";

// Schema for avatar_urls object
export const avatarUrlsSchema = z.object({
  "24": z.string().url(),
  "48": z.string().url(),
  "96": z.string().url(),
});

// Schema for _links object
export const linksSchema = z.object({
  self: z.array(
    z.object({
      href: z.string().url(),
    })
  ),
  collection: z.array(
    z.object({
      href: z.string().url(),
    })
  ),
});

// Main schema for the entire object
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  description: z.string().optional(), // Description could be empty or optional
  link: z.string().url(),
  slug: z.string(),
  avatar_urls: avatarUrlsSchema, // Schema for avatar_urls
  meta: z.array(z.any()), // meta is an array, content could vary
  _links: linksSchema, // Schema for _links
});
