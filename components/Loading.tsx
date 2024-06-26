import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type Props = { message?: string; mode?: "light" | "dark" };

export default function Loading({ message, mode = "light" }: Props) {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				gap: 10,
			}}
		>
			<ActivityIndicator
				size="large"
				color={mode === "light" ? "white" : "black"}
			/>
			{message && (
				<Text
					style={{
						textAlign: "center",
						color: mode === "light" ? "white" : "black",
						fontSize: 17,
					}}
				>
					{message}
				</Text>
			)}
		</View>
	);
}
