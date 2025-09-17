import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const favoriteTracks = sqliteTable("favorite_tracks", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  albumImageUrl: text("album_image_url").notNull(),
  albumName: text("album_name").notNull(),
  duration: integer("duration").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
});

export type FavoriteTrack = typeof favoriteTracks.$inferSelect;
export type NewFavoriteTrack = typeof favoriteTracks.$inferInsert;
