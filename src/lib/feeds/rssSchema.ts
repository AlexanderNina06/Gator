import { z } from "zod";

export const RSSItemSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string().optional(),
  pubDate: z.string(),
});

export const RSSChannelSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string(),
  item: z.union([RSSItemSchema, z.array(RSSItemSchema)]),
});

export const RSSFeedSchema = z.object({
  rss: z.object({
    channel: RSSChannelSchema,
  }),
});

export type RSSFeed = z.infer<typeof RSSFeedSchema>;
