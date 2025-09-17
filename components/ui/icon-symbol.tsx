import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

export type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

interface IconSymbolProps {
  name: MaterialIconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color, style, weight = "regular" }) => (
  <MaterialIcons color={color} size={size} name={name} style={style} weight={weight} />
);
