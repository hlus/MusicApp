import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import * as schema from "./favorite-tracks";

export const useDB = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  return { drizzleDb };
};
