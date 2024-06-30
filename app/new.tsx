import { CompassType } from "@/models/Compass";
import { addCompass, useCompasses } from "@/services/compass";
import Colors from "@/utils/colors";
import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
	Alert,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import { Card } from "react-native-paper";

export default function NewCompassModal() {
	const compasses = useCompasses("nick");

	function handleAddCompass(compassType: CompassType) {
		if (compasses && compasses?.length < 0) {
			addCompass("nick", compassType);
		} else {
			Alert.alert(
				"1 Compass Limit",
				"You've hit the max number of Compasses (1) for this device.\n\nUpgrade to add more Compasses.",
				[
					{
						text: "Upgrade",
						onPress: () => console.log("Upgrade pressed"),
						isPreferred: true,
					},
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
				]
			);
		}

		router.back();
	}
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
							New Compass
						</Text>
					</View>
				</View>
			</SafeAreaView>
			<ScrollView>
				<View style={{ padding: 15, gap: 20 }}>
					<Text
						style={{
							color: "white",
							fontSize: 20,
							fontWeight: "bold",
							fontFamily: "Cochin",
						}}
					>
						Choose your Compass Type:
					</Text>
					<Pressable
						onPress={() => handleAddCompass(CompassType.personal)}
					>
						<Card style={{ padding: 20 }}>
							<View
								style={{
									flexDirection: "row",
									gap: 15,
									marginBottom: 10,
								}}
							>
								<FontAwesome
									name="user"
									size={24}
									color="black"
								/>
								<Text
									style={{
										fontSize: 20,
										fontFamily: "Cochin",
										fontWeight: "bold",
									}}
								>
									Personal
								</Text>
							</View>
							<Text>
								Define your core values, passions, goals, and
								purpose to guide your personal growth and
								decisions in life.
							</Text>
						</Card>
					</Pressable>
					<Pressable
						onPress={() => handleAddCompass(CompassType.family)}
					>
						<Card style={{ padding: 20 }}>
							<View
								style={{
									flexDirection: "row",
									gap: 15,
									marginBottom: 10,
								}}
							>
								<FontAwesome6
									name="people-roof"
									size={24}
									color="black"
								/>
								<Text
									style={{
										fontSize: 20,
										fontFamily: "Cochin",
										fontWeight: "bold",
									}}
								>
									Family
								</Text>
							</View>
							<Text>
								Collaborate with family members, couples, or
								close friends to outline shared values, goals,
								and visions, fostering unity and guiding
								collective decisions.
							</Text>
						</Card>
					</Pressable>
					<Pressable
						onPress={() => handleAddCompass(CompassType.company)}
					>
						<Card style={{ padding: 20 }}>
							<View
								style={{
									flexDirection: "row",
									gap: 15,
									marginBottom: 10,
								}}
							>
								<FontAwesome6
									name="people-group"
									size={24}
									color="black"
								/>
								<Text
									style={{
										fontSize: 20,
										fontFamily: "Cochin",
										fontWeight: "bold",
									}}
								>
									Company
								</Text>
							</View>
							<Text>
								Collaborate with co-workers to create a mission
								statement that aligns with your company's values
								and objectives to steer business strategies and
								operations and foster a cohesive work
								environment.
							</Text>
						</Card>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
}
