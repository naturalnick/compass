import Colors from "@/utils/colors";
import { fontStyles } from "@/utils/typography";
import { Entypo, Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "react-native-paper";

type Props = {
	compassId: string;
	promptId: string;
	prompt: string;
	hasContent: boolean;
};

function PromptItem({ compassId, promptId, prompt, hasContent }: Props) {
	return (
		<Link
			key={prompt}
			href={`/builder/prompts/${compassId}/${promptId}`}
			asChild
		>
			<Pressable>
				<Card
					style={{
						marginVertical: 10,
						padding: 15,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text style={fontStyles.regular}>{prompt}</Text>
						<View
							style={{
								flexDirection: "row",
								gap: 5,
							}}
						>
							{hasContent && (
								<Entypo
									name="check"
									size={24}
									color={Colors.bg}
								/>
							)}
							<Feather name="edit" size={24} color="black" />
						</View>
					</View>
				</Card>
			</Pressable>
		</Link>
	);
}

export default PromptItem;
