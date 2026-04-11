
import { create } from 'zustand';
import { persist , createJSONStorage } from 'zustand/middleware'

export const useStore = create (
    persist(
        (set) =>({
        emaill: '' ,
        token : '',

        setEmail: (dataEmail) => set({ emaill: dataEmail}) ,
        setToken: (dataToken) => set ({ token: dataToken}) ,
        logout: () => set({ emaill: '' , token:''}),
        }),
        {
            name:'auto-storage',
            storage: createJSONStorage(() => sessionStorage )
        }
    )  
);

