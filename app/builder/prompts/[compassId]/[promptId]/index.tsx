import Loading from "@/components/Loading";
import { personalPrompts } from "@/constants/prompts";
import { updatePrompt, usePrompt } from "@/services/prompts";
import Colors from "@/utils/colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
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

export default function PromptEditor() {
	const { compassId, promptId } = useLocalSearchParams();

	const prompt = personalPrompts.find((prompt) => prompt.id === promptId);
	const savedPrompt = usePrompt(compassId as string, promptId as string);

	const [response, setResponse] = useState<string | undefined>();

	useEffect(() => {
		if (savedPrompt === undefined) return;
		setResponse(savedPrompt?.response ?? "");
	}, [savedPrompt]);

	if (!prompt) return router.back();

	function handleSavePrompt() {
		if (!prompt || !compassId) return;

		const hasChanged =
			response !== undefined &&
			(savedPrompt?.response ?? "") !== response;
		if (hasChanged) {
			updatePrompt(
				compassId as string,
				prompt.id,
				prompt.prompt,
				response
			);
		}
		router.back();
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
						gap: 20,
						padding: 15,
					}}
				>
					<Pressable onPress={handleSavePrompt}>
						<Ionicons name="arrow-back" size={30} color="#FFCC01" />
					</Pressable>
					<Pressable
						onPress={Keyboard.dismiss}
						style={{ gap: 5, flexShrink: 1, flexGrow: 1 }}
					>
						<Text
							style={{
								fontSize: 24,
								fontWeight: "bold",
								color: "white",
								fontFamily: "Cochin",
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
									size={30}
									color={pressed ? "white" : Colors.primary}
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
								fontSize: 17,
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