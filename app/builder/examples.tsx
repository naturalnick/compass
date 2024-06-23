import { examples } from "@/constants/examples";
import Colors from "@/utils/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Examples() {
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
					Examples
				</Text>
			</View>
			<ScrollView style={{ padding: 15 }}>
				{examples.map((text, index) => (
					<View key={text}>
						<Text
							style={{
								paddingVertical: 12,
								color: "white",
								fontSize: 18,
								letterSpacing: 0.4,
								marginBottom:
									index === examples.length - 1 ? 100 : 0,
							}}
						>
							{text}
						</Text>
						{index < examples.length - 1 && (
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
