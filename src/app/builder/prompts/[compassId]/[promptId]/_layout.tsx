import Colors from "@/src/utils/colors";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: Colors.bg },
			}}
		>
			<Stack.Screen
				name="index"
				options={{ animation: "slide_from_right" }}
			/>
			<Stack.Screen
				name="tipModal"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
