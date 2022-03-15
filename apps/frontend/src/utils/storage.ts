/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData } from './types';

const key = 'AppData';
export default function useStorage() {
    const [storageItem, setStorageItem] = useState<AppData | null>();

    async function getStorageItem() {
        const data = await AsyncStorage.getItem(key);
        if (data) {
            setStorageItem(JSON.parse(data));
        } else {
            setStorageItem(null);
        }

    }

    function updateStorageItem(data: AppData) {
        AsyncStorage.setItem(key, JSON.stringify(data));
        setStorageItem(data);
        return data;
    }

    function clearStorageItem() {
        AsyncStorage.removeItem(key);
        setStorageItem(null);
    }

    useEffect(() => {
        getStorageItem();
    }, []);

    return { storageItem, updateStorageItem, clearStorageItem };
};