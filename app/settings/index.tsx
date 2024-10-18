import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { signOutUser } from "@/services/auth";
import { deleteUserAccount } from "@/services/user";
import Colors from "@/utils/colors";
import { fontStyles } from "@/utils/typography";
import {
	Feather,
	FontAwesome,
	Ionicons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
	const { fUser, userId } = useAuth();
	const [hasReauthenticated, setHasReauthenticated] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const params = useLocalSearchParams();

	useEffect(() => {
		if (params?.status === "AUTHENTICATED") {
			setHasReauthenticated(true);
		}
	}, [params]);

	async function handleDeleteAccount() {
		if (!hasReauthenticated) {
			router.navigate("/auth");
			return;
		}

		setDeleting(true);

		if (userId && fUser) await deleteUserAccount(fUser, userId);
		setDeleting(false);
		router.dismissAll();
	}

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
					<Pressable onPress={() => router.dismissAll()}>
						<Ionicons name="arrow-back" size={30} color="#FFCC01" />
					</Pressable>
					<Text
						style={{
							...fontStyles.header,
							color: "white",
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
						...fontStyles.regularBold,
						paddingBottom: 10,
					}}
				>
					Account
				</Text>
				{!fUser && (
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
										<FontAwesome
											name="user"
											size={24}
											color="black"
										/>
										<Text style={fontStyles.regular}>
											Sign In or Sign Up
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
				)}
				{!!fUser && (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							padding: 10,
							gap: 15,
						}}
					>
						<FontAwesome
							name="user-circle"
							size={30}
							color={Colors.primary}
						/>
						<Text
							style={{
								color: "white",
								...fontStyles.regular,
							}}
						>
							{fUser.email}
						</Text>
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
								<FontAwesome
									name="user-plus"
									size={24}
									color="black"
								/>
								<View
									style={{
										flexGrow: 1,
										flexShrink: 1,
										gap: 5,
									}}
								>
									<Text style={fontStyles.regularBold}>
										Upgrade
									</Text>
									<Text style={fontStyles.regular}>
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
				{!!fUser && (
					<View>
						<Pressable
							onPress={() =>
								Alert.alert(
									"Delete Account",
									"Confirm that you want to delete your account and it's data. This action cannot be undone.",
									[
										{
											text: "Delete",
											onPress: handleDeleteAccount,
											isPreferred: true,
											style: "destructive",
										},
										{
											text: "Cancel",
											style: "cancel",
										},
									]
								)
							}
							disabled={deleting}
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
									<Text
										style={{
											...fontStyles.regular,
											flexGrow: 1,
										}}
									>
										Delete Account
									</Text>
									{deleting && (
										<Loading mode="dark" size="small" />
									)}
									<MaterialIcons
										name="delete-forever"
										size={24}
										color="red"
									/>
								</View>
							</Card>
						</Pressable>
						<Pressable
							onPress={() => signOutUser()}
							disabled={deleting}
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
											gap: 10,
										}}
									>
										<Text style={fontStyles.regular}>
											Sign Out
										</Text>
									</View>
									<Ionicons
										name="exit-outline"
										size={24}
										color="black"
									/>
								</View>
							</Card>
						</Pressable>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
