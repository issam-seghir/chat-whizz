import React from 'react'
import {create} from "zustand"

interface ActiveListState {
  members: string[];
  set: (ids: string[]) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
}

const useActiveList = create<ActiveListState>((set) => ({
  members: [],
  set: (ids) => set({ members: ids }),
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) => set((state) => ({ members: state.members.filter((memberId) => memberId !== id) })),
}));

export default useActiveList
