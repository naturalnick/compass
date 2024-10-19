import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import Loading from "@/src/components/Loading";
import PromptItem from "@/src/components/PromptItem";
import { personalPrompts } from "@/src/constants/prompts";
import { useCompass } from "@/src/services/compass";
import { usePrompts } from "@/src/services/prompts";
import { fontStyles } from "@/src/utils/typography";
import { Ionicons } from "@expo/vector-icons";

export default function Prompts() {
	const { compassId } = useLocalSearchParams();

	const compass = useCompass(compassId as string);

	if (compass === null) return router.dismissAll();

	const prompts = usePrompts(compassId as string);

	function handleSave() {
		router.back();
	}

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
					<Ionicons name="arrow-back" size={30} color="#FFCC01" />
				</Pressable>
				<View style={{ gap: 5, flexShrink: 1, flexGrow: 1 }}>
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
						Use these prompts as a creative space to dig deeper into
						what really matters to you.
					</Text>
				</View>
			</View>
			{prompts !== undefined ? (
				<ScrollView style={{ padding: 15 }}>
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
