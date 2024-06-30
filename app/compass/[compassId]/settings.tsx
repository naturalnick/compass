import { updateTitle, useCompass } from "@/services/compass";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { Card } from "react-native-paper";

export default function CompassSettings() {
	const { compassId } = useLocalSearchParams();

	const compass = useCompass(compassId as string);

	const [title, setTitle] = useState<string | undefined>();

	useEffect(() => {
		if (compass === undefined) return;
		setTitle(compass?.title ?? "");
	}, [compass]);

	function saveSettings() {
		if (title !== undefined && compass?.title !== title) {
			updateTitle(compassId as string, title);
		}
		router.back();
	}

	return (
		<View style={{ height: "100%" }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 20,
						padding: 15,
					}}
				>
					<Pressable onPress={saveSettings}>
						<Ionicons name="arrow-back" size={30} color="#FFCC01" />
					</Pressable>
					<Text
						style={{
							fontSize: 26,
							fontWeight: "bold",
							color: "white",
							fontFamily: "Cochin",
						}}
					>
						Compass Settings
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				<Card style={{ padding: 15, marginBottom: 100 }}>
					<Text style={{ fontWeight: "bold", marginBottom: 5 }}>
						Name:
					</Text>
					<TextInput
						value={title}
						onChangeText={(text) => setTitle(text)}
						style={{ fontSize: 17 }}
					/>
				</Card>
			</ScrollView>
		</View>
	);
}
