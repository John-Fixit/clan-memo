// import { createWithEqualityFn } from 'zustand';
import { shallow } from 'zustand/shallow';
import { create } from 'zustand';

const useNotification = create(
  (set) => ({
    data: {
      current: [],
      awaiting_approval: [],
      treated_requests: [],
    },
    updateData: (payload) => set((state) => ({ data: { ...state.data, ...payload } })),
  }),
  shallow
);

export default useNotification;