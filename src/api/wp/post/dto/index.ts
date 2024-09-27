import { z } from "zod";

// Schema for "rendered" object
export const renderedSchema = z.object({
  rendered: z.string(),
  protected: z.boolean().optional(), // Optional in case it's not present
});

// Schema for "_links" object
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
  about: z.array(
    z.object({
      href: z.string().url(),
    })
  ),
  author: z.array(
    z.object({
      embeddable: z.boolean(),
      href: z.string().url(),
    })
  ),
  replies: z.array(
    z.object({
      embeddable: z.boolean(),
      href: z.string().url(),
    })
  ),
  "version-history": z.array(
    z.object({
      count: z.number(),
      href: z.string().url(),
    })
  ),
  "predecessor-version": z.array(
    z.object({
      id: z.number(),
      href: z.string().url(),
    })
  ).optional(), // This field may be optional
  "wp:featuredmedia": z.array(
    z.object({
      embeddable: z.boolean(),
      href: z.string().url(),
    })
  ),
  "wp:attachment": z.array(
    z.object({
      href: z.string().url(),
    })
  ),
  "wp:term": z.array(
    z.object({
      taxonomy: z.string(),
      embeddable: z.boolean(),
      href: z.string().url(),
    })
  ),
  curies: z.array(
    z.object({
      name: z.string(),
      href: z.string().url(),
      templated: z.boolean(),
    })
  ),
});

// Main schema for each item in the array
export const postSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  date_gmt: z.coerce.date().optional(),
  slug: z.string(),
  type: z.string(),
  tags: z.number().array().optional(),
  link: z.string().url(),
  title: renderedSchema, // Schema for "title"
  excerpt: renderedSchema, // Schema for "excerpt"
  content: renderedSchema, // Schema for "content"
  author: z.number(),
  featured_media: z.number(),
  score: z.number().optional(),
  _links: linksSchema, // Schema for "_links"
});

export const relatedSchema = postSchema.omit({'content': true})
