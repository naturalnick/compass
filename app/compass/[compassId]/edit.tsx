import Loading from "@/components/Loading";
import { updateStatement, useCompass } from "@/services/compass";
import Colors from "@/utils/colors";
import { fontStyles } from "@/utils/typography";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

export default function CompassEditor() {
	const { compassId } = useLocalSearchParams();

	const savedCompass = useCompass(compassId as string);

	const [statement, setStatement] = useState<string | undefined>();

	useEffect(() => {
		if (savedCompass === undefined) return;
		setStatement(savedCompass?.statement ?? "");
	}, [savedCompass]);

	function handleSaveCompass() {
		if (!compassId) return;

		const hasChanged =
			statement !== undefined &&
			(savedCompass?.statement ?? "") !== statement;
		if (hasChanged) {
			updateStatement(compassId as string, statement);
		}
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
				<Pressable onPress={handleSaveCompass}>
					<AntDesign name="close" size={30} color={Colors.primary} />
				</Pressable>
				<Pressable
					onPress={Keyboard.dismiss}
					style={{ gap: 5, flexShrink: 1, flexGrow: 1 }}
				>
					<Text
						style={{
							...fontStyles.header,
							color: "white",
						}}
					>
						{savedCompass?.title}
					</Text>
				</Pressable>
			</View>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
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
					{statement !== undefined ? (
						<TextInput
							value={statement}
							onChangeText={(text) => setStatement(text)}
							style={{
								...fontStyles.regular,
								flexGrow: 1,
								paddingTop: 15,
								paddingBottom: 15,
								marginHorizontal: 15,
							}}
							multiline
							placeholder="Write your Compass..."
							placeholderTextColor="gray"
							autoFocus
						/>
					) : (
						<Loading message="Loading Compass..." mode="dark" />
					)}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
