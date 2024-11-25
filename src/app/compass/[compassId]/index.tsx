import {
	AntDesign,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
	Alert,
	Keyboard,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

import BuilderItem from "@/src/components/BuilderItem";
import Loading from "@/src/components/Loading";
import { useCompass } from "@/src/services/compass";
import Colors from "@/src/utils/colors";
import { fontStyles } from "@/src/utils/typography";
import { Card } from "react-native-paper";

export default function Compass() {
	const { compassId } = useLocalSearchParams<{ compassId: string }>();
	const compass = useCompass(compassId);

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 15,
					}}
				>
					<Pressable onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={30} color="white" />
					</Pressable>
					<Link href={`/compass/${compassId}/settings`} asChild>
						<Ionicons
							name="settings-sharp"
							size={30}
							color="white"
						/>
					</Link>
				</View>
			</SafeAreaView>
			{compass === undefined ? (
				<Loading />
			) : (
				<ScrollView style={{ paddingHorizontal: 15 }}>
					<Pressable
						onPress={Keyboard.dismiss}
						style={{ marginBottom: 10 }}
					>
						<Text
							style={{
								...fontStyles.header,
								color: "white",
							}}
						>
							{compass?.title}
						</Text>
					</Pressable>

					<Link href={`/compass/${compassId}/edit`} asChild>
						<Pressable style={{ marginBottom: 20 }}>
							<Card
								style={{
									padding: 15,
									borderColor: Colors.primary,
									borderWidth: 3,
								}}
							>
								<Text
									style={{
										...fontStyles.regular,
										color: compass?.statement
											? "black"
											: "gray",
									}}
								>
									{compass?.statement ||
										"Write your Compass here..."}
								</Text>
							</Card>
						</Pressable>
					</Link>
					<Link
						href={{
							pathname: "/builder/about",
							params: { builder: "true", compassId: compassId! },
						}}
						asChild
					>
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
									<View
										style={{
											backgroundColor: Colors.primary,
											borderRadius: 100,
										}}
									>
										<Ionicons
											name="play-circle"
											size={30}
											color={Colors.bg}
										/>
									</View>
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
											Launch Compass Builder
										</Text>
									</View>
								</View>
							</Card>
						</Pressable>
					</Link>
					<Text
						style={{
							...fontStyles.regularBold,
							color: "white",
							paddingBottom: 15,
						}}
					>
						Or customize your experience:
					</Text>
					<BuilderItem
						route="/builder/about"
						title="What is a Compass?"
						description="Learn more about what a Compass is and how to
								build one"
						icon={
							<MaterialCommunityIcons
								name="compass-rose"
								size={26}
								color="green"
							/>
						}
					/>
					<BuilderItem
						route="/builder/examples"
						title="Examples"
						description="View sample Compasses for inspiration"
						icon={
							<Ionicons name="reader" size={26} color="#31ADE6" />
						}
					/>
					<BuilderItem
						route={`/builder/values/${compassId}`}
						title="Core Values"
						description="Identify your core values"
						icon={
							<FontAwesome name="heart" size={26} color="red" />
						}
					/>
					<BuilderItem
						route={`/builder/prompts/${compassId}`}
						title="Prompts"
						description="Engage in writing exercises that encourage deep reflection"
						icon={
							<AntDesign
								name="checkcircle"
								size={26}
								color="purple"
							/>
						}
					/>
					{compass?.statement && compass.statement.length > 0 && (
						<BuilderItem
							route={`/builder/review`}
							title="Review"
							description="Ensure your Compass truly reflects your values and goals by asking yourself these critical questions"
							icon={
								<AntDesign
									name="eye"
									size={26}
									color="orange"
								/>
							}
						/>
					)}
					<View style={{ height: 100 }}></View>
				</ScrollView>
			)}
		</View>
	);
}
