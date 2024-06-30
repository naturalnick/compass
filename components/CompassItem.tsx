import { Compass } from "@/models/Compass";
import { formatDate } from "@/utils/helpers";
import { fontStyles } from "@/utils/typography";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function CompassItem({ compass }: { compass: Compass }) {
	return (
		<Link href={`/compass/${compass.id!}`} asChild>
			<Pressable>
				<Card
					style={{
						marginVertical: 8,
						height: 140,
					}}
				>
					<View
						style={{
							height: "100%",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								textAlign: "center",
								...fontStyles.header,
							}}
						>
							{compass.title}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
							position: "absolute",
							left: 0,
							bottom: 0,
							padding: 12,
						}}
					>
						<SimpleLineIcons name="pencil" size={15} color="gray" />
						<Text style={{ color: "gray", ...fontStyles.regular }}>
							{formatDate(compass.dateUpdated)}
						</Text>
					</View>
				</Card>
			</Pressable>
		</Link>
	);
}
