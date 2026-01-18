import { z } from "zod";

// ============ USERS ============
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const insertUserSchema = userSchema.omit({ id: true });
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// ============ STORIES ============
export const storyTypeEnum = z.enum(['match', 'transfer', 'news', 'interview']);

export const storySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  whatHappened: z.string(),
  whyItMatters: z.string(),
  entity: z.string(),
  time: z.string(),
  timestamp: z.coerce.date(),
  type: storyTypeEnum,
  image: z.string().optional(),
  published: z.boolean().default(true),
  author: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
  }),
  content: z.object({
    block1: z.string(),
    block2: z.string(),
    hubLink: z.object({
      text: z.string(),
      url: z.string(),
    }),
  }).optional(),
});

export const insertStorySchema = storySchema.omit({ id: true, slug: true, time: true });
export type Story = z.infer<typeof storySchema>;
export type InsertStory = z.infer<typeof insertStorySchema>;

// ============ MATCHES ============
export const matchSchema = z.object({
  id: z.string(),
  teamA: z.string(),
  teamB: z.string(),
  competition: z.string(),
  time: z.string(),
  isLive: z.boolean().default(false),
  caster: z.string().optional(),
  link: z.string(),
});

export const insertMatchSchema = matchSchema.omit({ id: true });
export type Match = z.infer<typeof matchSchema>;
export type InsertMatch = z.infer<typeof insertMatchSchema>;

// ============ BRIEFINGS ============
export const briefingSchema = z.object({
  id: z.string(),
  text: z.string(),
  time: z.string(),
});

export const insertBriefingSchema = briefingSchema.omit({ id: true });
export type Briefing = z.infer<typeof briefingSchema>;
export type InsertBriefing = z.infer<typeof insertBriefingSchema>;
