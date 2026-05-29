import { getDefaultConfig } from "expo/metro-config";

export default (async () => {
  const config = await getDefaultConfig(__dirname);
  return config;
})();
