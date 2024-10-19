import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { personalPrompts } from "@/src/constants/prompts";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";

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
								...fontStyles.header,
								color: "white",
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
							...fontStyles.regularBold,
							color: "white",
						}}
					>
						{prompt?.prompt}
					</Text>
				</View>
				<Text
					style={{
						color: "white",
						...fontStyles.regular,
					}}
				>
					{prompt?.tips}
				</Text>
				<Text
					style={{
						color: "white",
						...fontStyles.regular,
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
