import { create } from 'zustand';

export type AppId = 'explorer' | 'browser' | 'notepad';

export interface OSWindow {
  id: string; // Unique window instance ID
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  props?: Record<string, any>;
  icon?: string;
  // History for restoring sizes
  restoreBoundary?: { x: number; y: number; width: number; height: number };
}

interface OSState {
  windows: OSWindow[];
  activeWindowId: string | null;
  topZIndex: number;

  openWindow: (app: AppId, title: string, options?: Partial<OSWindow>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  minimizeAll: () => void;
  isStartMenuOpen: boolean;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  topZIndex: 10,
  isStartMenuOpen: false,

  openWindow: (app, title, options = {}) => {
    const { windows, topZIndex } = get();
    // Check if a single-instance app is already open (could group later)
    
    // Instead of random, cascade horizontally and vertically somewhat deterministically
    const numWindows = windows.length;
    const cascadeOffset = (numWindows % 10) * 30;
    
    // Windows should open 90% height and 40% width natively, centered horizontally and vertically
    const defaultW = typeof window !== 'undefined' ? Math.max(300, window.innerWidth * 0.4) : DEFAULT_WIDTH;
    const defaultH = typeof window !== 'undefined' ? (window.innerHeight - 30) * 0.9 : DEFAULT_HEIGHT;
    const defaultX = typeof window !== 'undefined' ? (window.innerWidth - defaultW) / 2 + (cascadeOffset / 2) : 100;
    const defaultY = typeof window !== 'undefined' ? ((window.innerHeight - 30) - defaultH) / 2 + (cascadeOffset / 4) : 50;

    const newWindow: OSWindow = {
      id: `${app}-${Date.now()}`,
      app,
      title,
      x: defaultX,
      y: defaultY,
      width: defaultW,
      height: defaultH,
      isMinimized: false,
      isMaximized: false,
      zIndex: topZIndex + 1,
      ...options,
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: newWindow.id,
      topZIndex: topZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set((state) => {
      const newWindows = state.windows.filter((w) => w.id !== id);
      const activeWindowId = state.activeWindowId === id 
        ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null) 
        : state.activeWindowId;
      return { windows: newWindows, activeWindowId };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: true,
              restoreBoundary: { x: w.x, y: w.y, width: w.width, height: w.height },
            }
          : w
      ),
    }));
    get().focusWindow(id);
  },

  restoreWindow: (id) => {
    set((state) => {
      const newTopZIndex = state.topZIndex + 1;
      return {
        windows: state.windows.map((w) => {
          if (w.id === id) {
            const base = { ...w, zIndex: newTopZIndex };
            if (w.isMinimized) {
              return { ...base, isMinimized: false };
            }
            if (w.isMaximized) {
              return {
                ...base,
                isMaximized: false,
                x: w.restoreBoundary?.x ?? w.x,
                y: w.restoreBoundary?.y ?? w.y,
                width: w.restoreBoundary?.width ?? w.width,
                height: w.restoreBoundary?.height ?? w.height,
              };
            }
            return base;
          }
          return w;
        }),
        activeWindowId: id,
        topZIndex: newTopZIndex,
      };
    });
  },

  focusWindow: (id) => {
    set((state) => {
      if (state.activeWindowId === id && !state.windows.find(w => w.id === id)?.isMinimized) return state;
      
      const newTopZIndex = state.topZIndex + 1;
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: newTopZIndex, isMinimized: false } : w
        ),
        activeWindowId: id,
        topZIndex: newTopZIndex,
      };
    });
  },

  toggleWindow: (id) => {
    const state = get();
    const win = state.windows.find(w => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      state.restoreWindow(id);
    } else if (state.activeWindowId === id) {
      state.minimizeWindow(id);
    } else {
      state.focusWindow(id);
    }
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    }));
  },

  updateWindowSize: (id: string, width: number, height: number) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    }));
  },

  minimizeAll: () => {
    set((state) => ({
      windows: state.windows.map((w) => ({ ...w, isMinimized: true })),
      activeWindowId: null,
    }));
  },

  toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
  closeStartMenu: () => set({ isStartMenuOpen: false }),
}));
