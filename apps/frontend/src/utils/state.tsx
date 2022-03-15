import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData } from "./types";
import useStorage from "./storage";


interface AppContextType extends AppData {
    setGameDetails: (gameId: string, userId: string, adminCode: string) => void
    exitGame: () => void
}
const defaultAppStateValue: AppContextType = {
    gameId: '',
    userId: '',
    adminCode: '',
    isInGame: false,
    setGameDetails: (gameId: string, userId: string, adminCode: string) => { },
    exitGame: () => { }
}
const AppDataContext = React.createContext<AppContextType>(defaultAppStateValue);
export const useAppDataContext = () => useContext(AppDataContext);
export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
    const { storageItem, updateStorageItem, clearStorageItem } = useStorage();
    const [appState, setAppState] = useState<AppData>(defaultAppStateValue);
    useEffect(() => {
        if (storageItem) {
            setAppState(storageItem);
        }
    }, [storageItem]);
    const setGameDetails = (gameId: string, userId: string, adminCode: string) => {
        const obj = { gameId, userId, adminCode, isInGame: true };
        setAppState(obj);
        updateStorageItem(obj);
    };
    const exitGame = () => {
        const obj = { gameId: '', userId: '', adminCode: '', isInGame: false };
        setAppState(obj);
        updateStorageItem(obj);
    };
    const contextInput = {
        ...appState,
        setGameDetails,
        exitGame
    }
    return (
        <AppDataContext.Provider value={contextInput} >
            {children}
        </AppDataContext.Provider>
    );
}
