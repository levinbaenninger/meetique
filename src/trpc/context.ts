export const createContext = () => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;
