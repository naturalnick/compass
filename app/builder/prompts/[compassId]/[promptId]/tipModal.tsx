import { personalPrompts } from "@/constants/prompts";
import Colors from "@/utils/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function TipModal() {
	const searchParams = useLocalSearchParams();
	if (!searchParams.promptId) return null;

	const prompt = personalPrompts.find(
		(prompt) => prompt.id === searchParams.promptId
	);

	useEffect(() => {
		if (!prompt) router.back();
	}, [prompt]);

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						gap: 20,
						padding: 15,
					}}
				>
					<Pressable onPress={() => router.back()}>
						<AntDesign
							name="close"
							size={30}
							color={Colors.primary}
						/>
					</Pressable>
					<View style={{ gap: 5, flexShrink: 1, flexGrow: 1 }}>
						<Text
							style={{
								fontSize: 26,
								fontWeight: "bold",
								color: "white",
								fontFamily: "Cochin",
							}}
						>
							Prompt Tips
						</Text>
					</View>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				<View
					style={{
						borderTopWidth: 2,
						borderBottomWidth: 2,
						marginBottom: 20,
						paddingVertical: 10,
						borderColor: "white",
					}}
				>
					<Text
						style={{
							fontSize: 26,
							fontWeight: "bold",
							color: "white",
							fontFamily: "Cochin",
						}}
					>
						{prompt?.prompt}
					</Text>
				</View>
				<Text
					style={{
						fontSize: 18,
						color: "white",
						letterSpacing: 0.3,
					}}
				>
					{prompt?.tips}
				</Text>
				<Text
					style={{
						fontSize: 18,
						color: "white",
						letterSpacing: 0.3,
						marginTop: 20,
					}}
				>
					There are no wrong answers - trust yourself, be honest and
					take time for deep reflection.
				</Text>
			</ScrollView>
		</View>
	);
}
