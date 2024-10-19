import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { reviewQuestions } from "@/src/constants/reviewQuestions";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import { router } from "expo-router";
import React from "react";
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
							color: "white",
							...fontStyles.header,
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
							...fontStyles.regular,
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
							...fontStyles.regular,
						}}
					>
						Always feel free to update your Compass as needed. It
						will evolve as you learn more about yourself and the way
						you want to live.
					</Text>
					<View
						style={{
							height: 1,
							backgroundColor: "gray",
							opacity: 0.5,
							marginVertical: 20,
						}}
					></View>
					{reviewQuestions.map((text) => (
						<View
							key={text}
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
								marginBottom: 15,
							}}
						>
							<MaterialCommunityIcons
								name="star-four-points"
								size={24}
								color={Colors.primary}
								style={{ textAlign: "center" }}
							/>
							<Text
								style={{
									paddingVertical: 10,
									...fontStyles.regular,
									flexGrow: 1,
									flexShrink: 1,
								}}
							>
								{text}
							</Text>
						</View>
					))}
				</Card>
			</ScrollView>
		</View>
	);
}
