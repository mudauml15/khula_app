import { Stack } from 'expo-router';
import { theme } from "../theme";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.green300,
                    headerTitle: "Home"

                },
                headerTintColor: theme.colors.green200,
                headerTitleStyle: {
                    fontWeight: 'bold',

                },
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
        </Stack>
    );
}
