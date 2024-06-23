import { Compass } from "@/models/Compass";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CompassItem from "./CompassItem";

export default function CompassList({ compasses }: { compasses: Compass[] }) {
	if (compasses.length === 0) return <Text>No compasses</Text>;
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
