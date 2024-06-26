import { examples } from "@/constants/examples";
import Colors from "@/utils/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
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
							fontSize: 26,
							fontWeight: "bold",
							color: "white",
							fontFamily: "Cochin",
						}}
					>
						Examples
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				{examples.map((text, index) => (
					<View key={text}>
						<Card
							style={{
								marginBottom:
									index === examples.length - 1 ? 100 : 0,
							}}
						>
							<Text
								style={{
									padding: 15,
									color: "black",
									fontSize: 17,
									letterSpacing: 0.3,
								}}
							>
								{text}
							</Text>
						</Card>
						{index < examples.length - 1 && (
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
