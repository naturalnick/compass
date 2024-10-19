import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { guide } from "@/src/constants/guide";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import { router } from "expo-router";
import React from "react";
import { Card } from "react-native-paper";

export default function About() {
	return (
		<View style={{ height: "100%" }}>
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
							...fontStyles.header,
							color: "white",
						}}
					>
						What is a Compass?
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				<Card style={{ padding: 15, marginBottom: 100 }}>
					{guide.map((text, index) => (
						<View key={text}>
							<Text
								style={{
									paddingVertical: 8,
									color: "black",
									...fontStyles.regular,
								}}
							>
								{text}
							</Text>
							{index < guide.length - 1 && (
								<MaterialCommunityIcons
									name="star-four-points"
									size={24}
									color={Colors.primary}
									style={{ textAlign: "center" }}
								/>
							)}
						</View>
					))}
				</Card>
			</ScrollView>
		</View>
	);
}
