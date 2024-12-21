import { create } from "zustand";

export const useHandleMemo= create((set)=>{
    return{
        data: {},
        isOpen: false,
        setData: (newData) => set(state => ({...state, data: {...state.data, ...newData} })),
        handleOpenCreateMemo: (data)=>set(state=>({isOpen: true, data: {...state.data, ...data}})),
        handleCloseCreateMemo: ()=>set({isOpen: false, data: {}}),
    }
})