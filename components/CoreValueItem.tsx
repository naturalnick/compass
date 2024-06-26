import Colors from "@/utils/colors";
import React from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";

type Props = {
	value: string;
	selected: boolean;
	onSelect: (value: string) => void;
};

export default function CoreValueItem({ value, selected, onSelect }: Props) {
	return (
		<View
			key={value + (selected ? "yes" : "no")}
			style={{
				marginRight: 7,
				marginVertical: 4,
			}}
		>
			<Chip
				mode="outlined"
				style={{
					borderRadius: 100,
					borderWidth: 0,
					backgroundColor: selected ? Colors.primary : "white",
				}}
				onPress={() => onSelect(value)}
			>
				{value}
			</Chip>
		</View>
	);
}
