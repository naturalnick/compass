import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { personalExamples } from "@/src/constants/examples";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import { router } from "expo-router";
import { Card } from "react-native-paper";

export default function Examples() {
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
							...fontStyles.header,
							color: "white",
						}}
					>
						Examples
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				{personalExamples.map((text, index) => (
					<View key={text}>
						<Card
							style={{
								marginBottom:
									index === personalExamples.length - 1
										? 100
										: 0,
							}}
						>
							<Text
								style={{
									padding: 15,
									color: "black",
									...fontStyles.regular,
								}}
							>
								{text}
							</Text>
						</Card>
						{index < personalExamples.length - 1 && (
							<MaterialCommunityIcons
								name="star-four-points"
								size={24}
								color={Colors.primary}
								style={{
									textAlign: "center",
									marginVertical: 8,
								}}
							/>
						)}
					</View>
				))}
			</ScrollView>
		</View>
	);
}
