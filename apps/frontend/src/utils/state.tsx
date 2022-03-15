import React, { createContext, useContext, useState } from "react"

interface AppData {
    gameId: string,
    userId: string,
    adminCode: string,
    isInGame: boolean,
}
interface AppContextType extends AppData {
    setGameDetails: (gameId: string, userId: string, adminCode: string) => void
    resetGame: () => void
}
const defaultAppStateValue: AppContextType = {
    gameId: '',
    userId: '',
    adminCode: '',
    isInGame: false,
    setGameDetails: (gameId: string, userId: string, adminCode: string) => { },
    resetGame: () => { }
}
const AppDataContext = React.createContext<AppContextType>(defaultAppStateValue);
export const useAppDataContext = () => useContext(AppDataContext)
export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [appState, setAppState] = useState<AppData>(defaultAppStateValue);
    const setGameDetails = (gameId: string, userId: string, adminCode: string) => {
        setAppState({ gameId, userId, adminCode, isInGame: true });
    };
    const resetGame = () => setAppState({ gameId: '', userId: '', adminCode: '', isInGame: false });
    const contextInput = {
        ...appState,
        setGameDetails,
        resetGame
    }
    return (
        <AppDataContext.Provider value={contextInput} >
            {children}
        </AppDataContext.Provider>
    );
}
