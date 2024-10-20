import { Pressable, Text, View } from "react-native";

import { fontStyles } from "@/src/utils/typography";
import { Link } from "expo-router";
import React from "react";
import { Card } from "react-native-paper";

type Props = {
	route: string;
	title: string;
	description?: string;
	icon: React.ReactNode;
};

export default function BuilderItem({
	route,
	title,
	description,
	icon,
}: Props) {
	return (
		<Link href={route} asChild>
			<Pressable>
				<Card style={{ marginBottom: 15 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingLeft: 15,
							paddingVertical: 12,
							paddingRight: 10,
						}}
					>
						{icon}
						<View
							style={{
								alignItems: "flex-start",
								flexGrow: 1,
								flexShrink: 1,
								paddingLeft: 12,
								gap: 3,
							}}
						>
							<Text
								style={{
									textAlign: "center",
									...fontStyles.regularBold,
								}}
							>
								{title}
							</Text>
							{description && (
								<Text
									style={{
										...fontStyles.regular,
										color: "gray",
									}}
								>
									{description}
								</Text>
							)}
						</View>
					</View>
				</Card>
			</Pressable>
		</Link>
	);
}
