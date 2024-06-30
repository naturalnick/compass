import { AuthProvider } from "@/components/AuthProvider";
import Colors from "@/utils/colors";
import {
	Lora_400Regular,
	Lora_500Medium,
	Lora_600SemiBold,
} from "@expo-google-fonts/lora";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Lora_400Regular,
		Lora_500Medium,
		Lora_600SemiBold,
	});

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
