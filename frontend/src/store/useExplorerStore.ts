import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExplorerState {
    explorerName: string;
    setExplorerName: (name: string) => void;
    logout: () => void;
}

export const useExplorerStore = create<ExplorerState>()(
    persist(
        (set) => ({
            explorerName: "",
            setExplorerName: (name) => set({ explorerName: name }),
            logout: () => set({ explorerName: "" }),
        }),
        { name: "explorer-storage" }
    )
);
