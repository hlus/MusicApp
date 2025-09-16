import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

export const DATABASE_NAME = "MusicDB";

export const DBProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }} useSuspense>
        {children}
      </SQLiteProvider>
    </Suspense>
  );
};
