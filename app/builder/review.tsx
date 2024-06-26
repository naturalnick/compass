import { reviewQuestions } from "@/constants/reviewQuestions";
import Colors from "@/utils/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function Review() {
	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 20,
						padding: 15,
					}}
				>
					<Pressable onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={30} color="#FFCC01" />
					</Pressable>
					<Text
						style={{
							fontSize: 26,
							fontWeight: "bold",
							color: "white",
							fontFamily: "Cochin",
						}}
					>
						Review
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				<Card style={{ padding: 15, marginBottom: 20 }}>
					<Text
						style={{
							color: "black",
							fontSize: 17,
							letterSpacing: 0.3,
						}}
					>
						Once you've written your Compass, reflect on the
						following questions. They can aid you in ensuring your
						statement remains fully aligned with your principles.
					</Text>
					<Text
						style={{
							paddingTop: 15,
							color: "black",
							fontSize: 17,
							letterSpacing: 0.3,
						}}
					>
						Always feel free to update your Compass as needed. It
						will evolve as you learn more about yourself and the way
						you want to live.
					</Text>
				</Card>

				{reviewQuestions.map((text, index) => (
					<View key={text}>
						<Text
							style={{
								paddingVertical: 10,
								color: "white",
								fontSize: 17,
								letterSpacing: 0.4,
								marginBottom:
									index === reviewQuestions.length - 1
										? 100
										: 0,
								textAlign: "center",
							}}
						>
							{text}
						</Text>
						{index < reviewQuestions.length - 1 && (
							<MaterialCommunityIcons
								name="star-four-points"
								size={24}
								color={Colors.primary}
								style={{ textAlign: "center" }}
							/>
						)}
					</View>
				))}
			</ScrollView>
		</View>
	);
}
