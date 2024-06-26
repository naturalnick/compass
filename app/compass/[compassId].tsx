import BuilderItem from "@/components/BuilderItem";
import { updateStatement, useCompass } from "@/services/compass";
import Colors from "@/utils/colors";
import {
	AntDesign,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { Card } from "react-native-paper";

export default function Compass() {
	const { compassId } = useLocalSearchParams();
	const compass = useCompass(compassId as string | undefined);

	const [statement, setStatement] = useState(compass?.statement ?? "");

	useEffect(() => {
		if (compass === null) {
			router.back();
			Alert.alert("Error retrieving Compass.");
		}
		if (compass?.statement) setStatement(compass.statement);
	}, [compass]);

	function saveStatement() {
		if (compass?.statement !== statement) {
			updateStatement(compassId as string, statement);
		}

		router.back();
	}

	return (
		<SafeAreaView>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					padding: 15,
				}}
			>
				<Pressable
					onPress={saveStatement}
					style={{
						minWidth: 50,
						alignItems: "center",
					}}
				>
					<Ionicons name="arrow-back" size={30} color="#FFCC01" />
				</Pressable>
				<Text
					style={{
						fontSize: 26,
						fontWeight: "bold",
						color: "white",
						fontFamily: "Cochin",
						flexGrow: 1,
						flexShrink: 1,
						textAlign: "center",
					}}
				>
					{compass?.title}
				</Text>
				<View
					style={{
						minWidth: 50,
						alignItems: "center",
					}}
				></View>
			</View>

			{compass === undefined ? (
				<View>
					<Text>Loading...</Text>
				</View>
			) : (
				<ScrollView style={{ padding: 15 }}>
					<Card
						style={{
							marginBottom: 30,
							padding: 15,
							borderColor: Colors.primary,
							borderWidth: 3,
						}}
					>
						<TextInput
							value={statement}
							onChangeText={(text) => setStatement(text)}
							style={{ fontSize: 17 }}
							multiline
							placeholder="Write your statement here..."
						/>
					</Card>
					<BuilderItem
						route="/builder/about"
						title="What is a Compass?"
						description="Learn more about what a Compass is and how to
								build one."
						icon={
							<MaterialCommunityIcons
								name="compass-rose"
								size={26}
								color="green"
							/>
						}
					/>
					<BuilderItem
						route="/builder/examples"
						title="View Examples"
						description="See examples for inspiration."
						icon={
							<Ionicons name="reader" size={26} color="#31ADE6" />
						}
					/>
					<BuilderItem
						route={`/builder/values/${compassId}`}
						title="Choose Core Values"
						description="Identify and select your core values."
						icon={
							<FontAwesome name="heart" size={26} color="red" />
						}
					/>
					<BuilderItem
						route={`/builder/prompts/${compassId}`}
						title="Complete Prompts"
						description="Answer thought-provoking prompts that encourange deep reflection."
						icon={
							<AntDesign
								name="checkcircle"
								size={26}
								color="purple"
							/>
						}
					/>
					<BuilderItem
						route={`/builder/review`}
						title="Review"
						description="Ensure your Compass truly reflects your values and goals by asking yourself these critical questions."
						icon={<AntDesign name="eye" size={26} color="orange" />}
					/>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}
