import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";

import * as schema from "./favorite-tracks";

export const useDB = () => {
  const db = useSQLiteContext();

  const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);

  return { drizzleDb };
};
