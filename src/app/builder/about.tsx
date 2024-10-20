import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { guide } from "@/src/constants/guide";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import React from "react";
import { Card } from "react-native-paper";

export default function About() {
	const { builder, compassId } = useLocalSearchParams<{
		builder: string;
		compassId: string;
	}>();

	return (
		<View style={{ height: "100%" }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						padding: 10,
					}}
				>
					<Pressable onPress={() => router.back()}>
						<Ionicons
							name="arrow-back"
							size={30}
							color={Colors.primary}
						/>
					</Pressable>
					{builder && (
						<Pressable
							onPress={() =>
								router.navigate({
									pathname: `/builder/values/${compassId}`,
									params: {
										builder: "true",
									},
								})
							}
						>
							<Ionicons
								name="arrow-forward-circle"
								size={40}
								color={Colors.primary}
							/>
						</Pressable>
					)}
				</View>
			</SafeAreaView>
			<ScrollView style={{ paddingHorizontal: 15 }}>
				<Text
					style={{
						...fontStyles.header,
						color: "white",
						paddingBottom: 10,
					}}
				>
					What is a Compass?
				</Text>
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
