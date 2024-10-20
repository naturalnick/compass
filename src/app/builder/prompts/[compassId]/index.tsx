import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import Loading from "@/src/components/Loading";
import PromptItem from "@/src/components/PromptItem";
import { personalPrompts } from "@/src/constants/prompts";
import { useCompass } from "@/src/services/compass";
import { usePrompts } from "@/src/services/prompts";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function Prompts() {
	const { compassId, builder } = useLocalSearchParams<{
		builder: string;
		compassId: string;
	}>();

	const compass = useCompass(compassId);
	const prompts = usePrompts(compassId);

	useEffect(() => {
		if (builder)
			router.navigate({
				pathname: `/builder/prompts/${compassId}/${personalPrompts[0].id}`,
				params: builder ? { builder } : {},
			});
	}, [builder]);

	function handleSave() {
		router.back();
	}

	if (compass === null) return router.dismissAll();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					flexDirection: "row",
					gap: 20,
					padding: 15,
				}}
			>
				<Pressable onPress={handleSave}>
					<Ionicons
						name="arrow-back"
						size={30}
						color={Colors.primary}
					/>
				</Pressable>
			</View>
			{prompts !== undefined ? (
				<ScrollView style={{ paddingHorizontal: 15 }}>
					<View style={{ gap: 5, marginBottom: 10 }}>
						<Text
							style={{
								...fontStyles.header,
								color: "white",
							}}
						>
							Prompts
						</Text>
						<Text
							style={{
								...fontStyles.regular,
								color: "white",
							}}
						>
							Use these prompts as a creative space to dig deeper
							into what really matters to you.
						</Text>
					</View>
					{personalPrompts.map((personalPrompt) => {
						const savedPrompt = prompts?.find(
							(p) => p.id === personalPrompt.id
						);
						return (
							<PromptItem
								key={personalPrompt.id}
								compassId={compass!.id!}
								promptId={personalPrompt.id}
								prompt={personalPrompt.prompt}
								hasContent={!!savedPrompt?.response}
							/>
						);
					})}
				</ScrollView>
			) : (
				<Loading message="Loading Prompts..." />
			)}
		</SafeAreaView>
	);
}
