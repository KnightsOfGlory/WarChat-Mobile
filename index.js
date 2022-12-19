import * as React from 'react';
import {AppRegistry} from 'react-native';
import {MD3DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Configuration } from "./src/wiring/Configuration";
import { ConnectionManager } from "./src/state/ConnectionManager";
import { ProfileManager } from "./src/state/ProfileManager";

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#90caf9",
    secondary: "ce93d8"
  }
};

export default function Main() {
    Configuration.inject()
    ProfileManager.initialize()
    ConnectionManager.initialize()

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </SafeAreaProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
