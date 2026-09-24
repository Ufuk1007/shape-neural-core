import { useEffect, useState } from "react";

export type StudioLanguage = "de" | "en";

export function useStudioLanguage() {
  const [language, setLanguage] = useState<StudioLanguage>(() => {
    try {
      return window.localStorage.getItem("sn-studio-language") === "en" ? "en" : "de";
    } catch {
      return "de";
    }
  });

  useEffect(() => {
    window.localStorage.setItem("sn-studio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return { language, setLanguage };
}
