import Colors from "@/utils/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: Colors.bg },
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
