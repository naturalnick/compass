import BuilderItem from "@/components/BuilderItem";
import { useCompass } from "@/services/compass";
import Colors from "@/utils/colors";
import {
	AntDesign,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
	Alert,
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import { Card } from "react-native-paper";

export default function Compass() {
	const { compassId } = useLocalSearchParams();
	const compass = useCompass(compassId as string | undefined);

	useEffect(() => {
		if (compass === null) {
			router.back();
			Alert.alert("Error retrieving Compass.");
		}
	}, [compass]);

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 15,
					}}
				>
					<Pressable
						onPress={() => router.back()}
						style={{
							minWidth: 50,
							alignItems: "center",
						}}
					>
						<Ionicons name="arrow-back" size={30} color="white" />
					</Pressable>
					<Pressable onPress={Keyboard.dismiss}>
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
					</Pressable>
					<Link href={`/compass/${compassId}/settings`} asChild>
						<Pressable>
							<View
								style={{
									minWidth: 50,
									alignItems: "center",
								}}
							>
								<Ionicons
									name="settings-sharp"
									size={30}
									color="white"
								/>
							</View>
						</Pressable>
					</Link>
				</View>
			</SafeAreaView>
			{compass === undefined ? (
				<View>
					<Text>Loading...</Text>
				</View>
			) : (
				<ScrollView style={{ padding: 15 }}>
					<Link href={`/compass/${compassId}/edit`} asChild>
						<Card
							style={{
								marginBottom: 30,
								padding: 15,
								borderColor: Colors.primary,
								borderWidth: 3,
							}}
						>
							<Text style={{ fontSize: 17, color: "gray" }}>
								{compass?.statement || "Start writing..."}
							</Text>
						</Card>
					</Link>
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
						title="Examples"
						description="View sample Compasses for inspiration."
						icon={
							<Ionicons name="reader" size={26} color="#31ADE6" />
						}
					/>
					<BuilderItem
						route={`/builder/values/${compassId}`}
						title="Core Values"
						description="Identify and select your core values."
						icon={
							<FontAwesome name="heart" size={26} color="red" />
						}
					/>
					<BuilderItem
						route={`/builder/prompts/${compassId}`}
						title="Prompts"
						description="Engage in writing exercises that encourage deep reflection."
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
		</View>
	);
}
