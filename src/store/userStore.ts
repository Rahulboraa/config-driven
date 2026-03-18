import { create } from "zustand";
import { UserRecord, initialData } from "../config/tableConfig";

interface UserStore {
  users: UserRecord[];
  addUser: (user: UserRecord) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: initialData,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));
