import { AuthProvider } from "@/components/AuthProvider";
import Colors from "@/utils/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: Colors.bg },
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen
					name="new"
					options={{
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="auth"
					options={{
						presentation: "modal",
					}}
				/>
			</Stack>
		</AuthProvider>
	);
}
