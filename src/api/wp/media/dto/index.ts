import { z } from "zod";

// Schema for the "guid" and "title" rendered objects
export const renderedSchema = z.object({
  rendered: z.string(),
});

// Schema for the "description" and "caption" rendered objects
export const descriptionSchema = z.object({
  rendered: z.string(),
});

// Schema for "sizes" object inside "media_details"
export const sizeSchema = z.object({
  file: z.string(),
  width: z.number(),
  height: z.number(),
  filesize: z.number().optional(), // This field might be optional
  mime_type: z.string(),
  source_url: z.string().url(),
});

// Schema for "media_details" object
export const mediaDetailsSchema = z.object({
  width: z.number(),
  height: z.number(),
  file: z.string(),
  filesize: z.number(),
  sizes: z.object({
    medium: sizeSchema,
    large: sizeSchema,
    thumbnail: sizeSchema,
    medium_large: sizeSchema.optional(), // Might be optional
    "1536x1536": sizeSchema.optional(), // Might be optional
    full: sizeSchema,
  }),
  image_meta: z.object({
    aperture: z.string(),
    credit: z.string(),
    camera: z.string(),
    caption: z.string(),
    created_timestamp: z.string(),
    copyright: z.string(),
    focal_length: z.string(),
    iso: z.string(),
    shutter_speed: z.string(),
    title: z.string(),
    orientation: z.string(),
    keywords: z.array(z.any()),
  }),
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
});

// Main schema for the entire object
export const mediaSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  date_gmt: z.coerce.date(),
  guid: renderedSchema, // Schema for "guid" rendered
  modified: z.coerce.date(),
  modified_gmt: z.coerce.date(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  link: z.string().url(),
  title: renderedSchema, // Schema for "title" rendered
  author: z.number(),
  featured_media: z.number(),
  comment_status: z.string(),
  ping_status: z.string(),
  template: z.string(),
  meta: z.array(z.any()), // Meta is an array, type can vary
  class_list: z.array(z.string()), // Array of strings
  description: descriptionSchema, // Schema for "description"
  caption: descriptionSchema, // Schema for "caption"
  alt_text: z.string(),
  media_type: z.string(),
  mime_type: z.string(),
  media_details: mediaDetailsSchema, // Schema for "media_details"
  post: z.number().nullable(), // Null value for post
  source_url: z.string().url(),
  _links: linksSchema, // Schema for "_links"
});