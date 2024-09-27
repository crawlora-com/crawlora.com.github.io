import { z } from "zod";

// Schema for "_links" object
export const linkSchema = z.object({
  href: z.string().url(),
});

export const linksSchema = z.object({
  self: z.array(linkSchema),
  collection: z.array(linkSchema),
  about: z.array(linkSchema),
  "wp:post_type": z.array(linkSchema),
  curies: z.array(
    z.object({
      name: z.string(),
      href: z.string(),
      templated: z.boolean(),
    })
  ),
});

// Main schema for the entire tag object
export const tagSchema = z.object({
  id: z.number(),
  count: z.number(),
  description: z.string(),
  link: z.string().url(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  meta: z.array(z.any()), // Meta is an array, type can vary
  _links: linksSchema, // Schema for "_links"
});
