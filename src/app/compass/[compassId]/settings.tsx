import { updateTitle, useCompass } from "@/src/services/compass";
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

import { fontStyles } from "@/src/utils/typography";
import { Ionicons } from "@expo/vector-icons";
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
							...fontStyles.header,
							color: "white",
						}}
					>
						Compass Settings
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				<Card style={{ padding: 15, marginBottom: 100 }}>
					<Text
						style={{ ...fontStyles.regularBold, marginBottom: 5 }}
					>
						Name:
					</Text>
					<TextInput
						value={title}
						onChangeText={(text) => setTitle(text)}
						style={{ ...fontStyles.regular }}
						maxLength={36}
					/>
				</Card>
			</ScrollView>
		</View>
	);
}