import { reviewQuestions } from "@/constants/reviewQuestions";
import Colors from "@/utils/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Review() {
	return (
		<SafeAreaView style={{ height: "100%" }}>
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
			<ScrollView style={{ padding: 15 }}>
				<Text
					style={{
						paddingVertical: 12,
						color: "white",
						fontSize: 18,
						letterSpacing: 0.4,
					}}
				>
					Once you've written your Compass, reflect on the following
					questions. They can aid you in ensuring your statement
					remains fully aligned with your principles.
				</Text>
				<Text
					style={{
						paddingVertical: 12,
						marginBottom: 15,
						color: "white",
						fontSize: 18,
						letterSpacing: 0.4,
					}}
				>
					Always feel free to update your Compass as needed. It will
					evolve as you learn more about yourself and the way you want
					to live.
				</Text>

				{reviewQuestions.map((text, index) => (
					<View key={text}>
						<Text
							style={{
								paddingVertical: 12,
								color: "white",
								fontSize: 18,
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
		</SafeAreaView>
	);
}
