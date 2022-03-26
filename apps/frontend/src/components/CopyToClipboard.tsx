import * as React from 'react';
import { Button, useToast } from 'native-base';
import * as Clipboard from 'expo-clipboard';
import { Platform } from 'react-native';

interface ICopyToClipboardProps {
    label: string
    value: string;
}
export default function CopyToClipboard(props: ICopyToClipboardProps) {
    const toast = useToast();
    const copyToClipboard = () => {
        Clipboard.setString(props.value);
        toast.show({
            description: "Copied to web clipboard",
        });
    };

    return (
        <Button onPress={copyToClipboard} >{props.label}</Button>
    );
}