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
				name="tipModal"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
