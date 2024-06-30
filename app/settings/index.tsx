import { useAuth } from "@/hooks/useAuth";
import { signOutUser } from "@/services/auth";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
	Alert,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import { Card } from "react-native-paper";

export default function AppSettings() {
	const { fUser } = useAuth();

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
					<Pressable onPress={() => {}}>
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
						Compass Settings
					</Text>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				<Text
					style={{
						color: "white",
						fontSize: 17,
						paddingBottom: 10,
						fontWeight: "bold",
					}}
				>
					Account
				</Text>
				{!fUser ? (
					<Link href="/auth" asChild>
						<Pressable>
							<Card
								style={{
									padding: 15,
									marginBottom: 15,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
										}}
									>
										<FontAwesome5
											name="user-alt"
											size={22}
											color="black"
										/>
										<Text
											style={{
												fontWeight: "bold",
												fontSize: 17,
											}}
										>
											Sign-In or Sign-up
										</Text>
									</View>
									<Feather
										name="chevron-right"
										size={24}
										color="black"
									/>
								</View>
							</Card>
						</Pressable>
					</Link>
				) : (
					<View>
						<Text
							style={{
								color: "white",
								fontSize: 17,
								padding: 15,
							}}
						>
							Signed In
						</Text>
						<Pressable onPress={() => signOutUser()}>
							<Card
								style={{
									padding: 15,
									marginBottom: 15,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
										}}
									>
										<FontAwesome5
											name="user-alt"
											size={22}
											color="black"
										/>
										<Text
											style={{
												fontWeight: "bold",
												fontSize: 17,
											}}
										>
											Sign Out
										</Text>
									</View>
									<Ionicons
										name="exit"
										size={24}
										color="black"
									/>
								</View>
							</Card>
						</Pressable>
					</View>
				)}
				<Pressable
					onPress={() =>
						!fUser &&
						Alert.alert("Sign-In To Upgrade", "", [
							{
								text: "Sign In",
								onPress: () => router.navigate("/auth"),
								isPreferred: true,
							},
							{
								text: "Cancel",
								onPress: () => console.log("Cancel Pressed"),
								style: "cancel",
							},
						])
					}
				>
					<Card
						style={{
							padding: 15,
							marginBottom: 15,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 10,
									flexGrow: 1,
									flexShrink: 1,
								}}
							>
								<FontAwesome5
									name="user-plus"
									size={22}
									color="black"
								/>
								<View
									style={{
										flexGrow: 1,
										flexShrink: 1,
										gap: 5,
									}}
								>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 17,
										}}
									>
										Upgrade
									</Text>
									<Text>
										Remove ads, increase your maximum number
										of Compasses to five & back-up your
										data. Supports a solo developer!
									</Text>
								</View>
							</View>
							<Feather
								name="chevron-right"
								size={24}
								color="black"
							/>
						</View>
					</Card>
				</Pressable>
			</ScrollView>
		</View>
	);
}
