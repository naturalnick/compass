import { updatePrompt, usePrompt } from "@/src/services/prompts";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
} from "react-native";

import Loading from "@/src/components/Loading";
import { personalPrompts } from "@/src/constants/prompts";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";

export default function PromptEditor() {
	const { compassId, promptId, builder } = useLocalSearchParams<{
		compassId: string;
		promptId: string;
		builder: string;
	}>();

	const prompt = personalPrompts.find((prompt) => prompt.id === promptId);
	const savedPrompt = usePrompt(compassId!, promptId!);
	const nav = useNavigation();
	const [response, setResponse] = useState<string | undefined>();

	useEffect(() => {
		if (savedPrompt === undefined) return;
		setResponse(savedPrompt?.response ?? "");
	}, [savedPrompt]);

	if (!prompt) return router.back();

	function savePrompt() {
		if (!prompt || !compassId) return;

		const hasChanged =
			response !== undefined &&
			(savedPrompt?.response ?? "") !== response;
		if (hasChanged) {
			updatePrompt(compassId, prompt.id, prompt.prompt, response);
		}
	}

	function handlePromptNavigation(direction: "back" | "next") {
		savePrompt();

		if (direction === "back") {
			if (
				builder &&
				personalPrompts.findIndex(
					(prompt) => prompt.id === promptId
				) === 0
			) {
				router.replace({
					pathname: `/builder/values/${compassId}`,
					params: builder ? { builder } : {},
				});
			} else {
				router.back();
			}
		} else {
			const nextPromptIndex =
				personalPrompts.findIndex((prompt) => prompt.id === promptId) +
				1;

			if (nextPromptIndex > personalPrompts.length - 1) {
				router.push({
					pathname: `/compass/${compassId}/edit`,
					params: builder ? { builder } : {},
				});
			} else {
				const nextPromptId = personalPrompts[nextPromptIndex].id;

				router.push({
					pathname: `/builder/prompts/${compassId}/${nextPromptId}`,
					params: builder ? { builder } : {},
				});
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						padding: 15,
					}}
				>
					<Pressable onPress={() => handlePromptNavigation("back")}>
						<Ionicons
							name="arrow-back"
							size={30}
							color={Colors.primary}
						/>
					</Pressable>
					{builder && (
						<Pressable
							onPress={() => handlePromptNavigation("next")}
						>
							<Ionicons
								name="arrow-forward-circle"
								size={40}
								color={Colors.primary}
							/>
						</Pressable>
					)}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 20,
					}}
				>
					<Pressable onPress={Keyboard.dismiss} style={{ gap: 5 }}>
						<Text
							style={{
								...fontStyles.regularBold,
								color: "white",
							}}
						>
							{prompt?.prompt}
						</Text>
					</Pressable>
					<Link
						href={`/builder/prompts/${compassId}/${promptId}/tipModal`}
						asChild
					>
						<Pressable>
							{({ pressed }) => (
								<Entypo
									name="help-with-circle"
									size={26}
									color={pressed ? "darkgray" : "white"}
								/>
							)}
						</Pressable>
					</Link>
				</View>
				<View
					style={{
						backgroundColor: "white",
						borderRadius: 15,
						shadowColor: "black",
						shadowOffset: { width: 5, height: 5 },
						shadowRadius: 15,
						shadowOpacity: 0.3,
						flexGrow: 1,
						flex: 1,
						margin: 15,
					}}
				>
					{response !== undefined ? (
						<TextInput
							value={response}
							onChangeText={(text) => setResponse(text)}
							style={{
								...fontStyles.regular,
								flexGrow: 1,
								paddingTop: 15,
								paddingBottom: 15,
								marginHorizontal: 15,
							}}
							multiline
							placeholder="Write your response..."
							placeholderTextColor="gray"
						/>
					) : (
						<Loading message="Loading Response..." mode="dark" />
					)}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
