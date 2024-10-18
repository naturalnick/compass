import { fontStyles } from "@/utils/typography";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type Props = {
	message?: string;
	mode?: "light" | "dark";
	size?: "small" | "large";
};

export default function Loading({
	message,
	mode = "light",
	size = "large",
}: Props) {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				gap: 10,
			}}
		>
			<ActivityIndicator
				size={size}
				color={mode === "light" ? "white" : "black"}
			/>
			{message && (
				<Text
					style={{
						textAlign: "center",
						color: mode === "light" ? "white" : "black",
						...fontStyles.regular,
					}}
				>
					{message}
				</Text>
			)}
		</View>
	);
}
