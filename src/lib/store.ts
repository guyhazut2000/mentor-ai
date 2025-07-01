import { create } from "zustand";
import { devtools } from "zustand/middleware";

// App state interface
interface AppState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  appMode:
    | "live"
    | "maintenance"
    | "development"
    | "staging"
    | "testing"
    | "preview";

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: AppState["theme"]) => void;
}

// App store - also no provider needed!
export const useAppStore = create<AppState>()(
  devtools((set) => ({
    sidebarOpen: false,
    theme: "system",
    appMode: "live",

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setTheme: (theme) => set({ theme }),
  }))
);
