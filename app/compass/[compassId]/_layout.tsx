import Colors from "@/utils/colors";
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
				name="edit"
				options={{
					presentation: "fullScreenModal",
				}}
			/>
		</Stack>
	);
}
