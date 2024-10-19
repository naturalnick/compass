import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import { Compass } from "@/src/models/Compass";
import { fontStyles } from "@/src/utils/typography";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native-paper";
import CompassItem from "./CompassItem";

export default function CompassList({ compasses }: { compasses: Compass[] }) {
	if (compasses.length === 0)
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					alignItems: "flex-start",
					gap: 15,
					marginEnd: 20,
				}}
			>
				<Text
					style={{
						...fontStyles.header,
						color: "white",
						fontSize: 30,
					}}
				>
					Start your Compass
				</Text>
				<FontAwesome6 name="arrow-turn-up" size={30} color="white" />
			</View>
		);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				width: "100%",
			}}
		>
			<FlatList
				data={compasses}
				style={{ padding: "5%" }}
				renderItem={({ item }) => <CompassItem compass={item} />}
				keyExtractor={(item) => item.id!}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
