import { pgTable, text, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ============ DRIZZLE TABLES ============

// Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

// Stories Table
export const stories = pgTable("stories", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  whatHappened: text("what_happened").notNull(),
  whyItMatters: text("why_it_matters").notNull(),
  entity: text("entity").notNull(),
  time: text("time").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  type: text("type").notNull(), // 'match' | 'transfer' | 'news' | 'interview'
  image: text("image"),
  published: boolean("published").notNull().default(true),
  author: json("author").notNull().$type<{ name: string; role: string; avatar?: string }>(),
  content: json("content").$type<{
    block1: string;
    block2: string;
    hubLink: { text: string; url: string };
  }>(),
});

// Matches Table
export const matches = pgTable("matches", {
  id: text("id").primaryKey(),
  teamA: text("team_a").notNull(),
  teamB: text("team_b").notNull(),
  competition: text("competition").notNull(),
  time: text("time").notNull(),
  isLive: boolean("is_live").notNull().default(false),
  caster: text("caster"),
  link: text("link").notNull(),
});

// Briefings Table
export const briefings = pgTable("briefings", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  time: text("time").notNull(),
});

// Settings Table (for maintenance mode, etc.)
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

// ============ ZOD SCHEMAS ============

// User schemas
export const userSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Story schemas
export const storyTypeEnum = z.enum(['match', 'transfer', 'news', 'interview']);

export const storySchema = createSelectSchema(stories, {
  type: storyTypeEnum,
  timestamp: z.coerce.date(),
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
export const insertStorySchema = createInsertSchema(stories, {
  type: storyTypeEnum,
  timestamp: z.coerce.date().optional(),
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
}).omit({ id: true, slug: true, time: true });
export type Story = z.infer<typeof storySchema>;
export type InsertStory = z.infer<typeof insertStorySchema>;

// Match schemas
export const matchSchema = createSelectSchema(matches);
export const insertMatchSchema = createInsertSchema(matches).omit({ id: true });
export type Match = z.infer<typeof matchSchema>;
export type InsertMatch = z.infer<typeof insertMatchSchema>;

// Briefing schemas
export const briefingSchema = createSelectSchema(briefings);
export const insertBriefingSchema = createInsertSchema(briefings).omit({ id: true });
export type Briefing = z.infer<typeof briefingSchema>;
export type InsertBriefing = z.infer<typeof insertBriefingSchema>;
