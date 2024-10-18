import { useAuth } from "@/hooks/useAuth";
import { signInUser, signUpUser } from "@/services/auth";
import Colors from "@/utils/colors";
import { isValidEmail, isValidPassword } from "@/utils/helpers";
import { fontStyles } from "@/utils/typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { Button, Card } from "react-native-paper";

export default function Authentication() {
	const { userId, fUser } = useAuth();
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		error?: string;
	}>({});
	const [loading, setLoading] = useState(false);

	function isFormValid() {
		setErrors({});
		if (email.length < 5 || !isValidEmail(email)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: "Invalid email address.",
			}));
			return false;
		}
		if (password.length < 8) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: "Password must be 8 or more characters.",
			}));
			return false;
		}
		if (isValidPassword(password)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password:
					"Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
			}));
			return false;
		}
		return true;
	}

	async function submitForm() {
		setLoading(true);
		if (!isFormValid()) return setLoading(false);

		try {
			if (fUser) {
				await reauthenticateWithCredential(
					fUser,
					EmailAuthProvider.credential(email, password)
				);
				return router.navigate({
					pathname: "/settings",
					params: { status: "AUTHENTICATED" },
				});
			} else if (isSigningIn) {
				await signInUser(email, password);
			} else {
				if (!userId) {
					setLoading(false);
					return setErrors((prevErrors) => ({
						...prevErrors,
						error: "User status invalid. Please contact customer support.",
					}));
				}
				await signUpUser(userId, email, password);
				await signInUser(email, password);
			}
			setLoading(false);
			router.back();
		} catch (error) {
			setErrors((prevErrors) => ({
				...prevErrors,
				error: (error as string) ?? "Form error",
			}));
			setLoading(false);
			return;
		}
	}

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
					<Pressable onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={30} color="#FFCC01" />
					</Pressable>
					<Text
						style={{
							color: "white",
							...fontStyles.header,
						}}
					>
						{isSigningIn ? "Sign In" : "Create an Account"}
					</Text>
				</View>
			</SafeAreaView>
			<View style={{ padding: 15, flex: 1 }}>
				<Text
					style={{
						color: "white",
						...fontStyles.regularBold,
						paddingBottom: 10,
					}}
				>
					Email
				</Text>
				<Card style={{ padding: 5 }}>
					<TextInput
						value={email}
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
						textContentType="emailAddress"
						style={{ ...fontStyles.regular, padding: 10 }}
					/>
				</Card>
				{!!errors?.email && (
					<Text
						style={{
							color: Colors.primary,
							padding: 5,
							...fontStyles.regularBold,
						}}
					>
						{errors.email}
					</Text>
				)}

				<Text
					style={{
						color: "white",
						...fontStyles.regular,
						paddingVertical: 10,
						...fontStyles.regularBold,
					}}
				>
					Password
				</Text>
				<Card style={{ padding: 5 }}>
					<TextInput
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry={true}
						textContentType={
							isSigningIn ? "password" : "newPassword"
						}
						style={{ ...fontStyles.regular, padding: 10 }}
					/>
				</Card>
				{!!errors?.password && (
					<Text
						style={{
							color: Colors.primary,
							padding: 5,
							...fontStyles.regularBold,
						}}
					>
						{errors.password}
					</Text>
				)}
				<Button
					mode="contained"
					style={{
						backgroundColor: Colors.primary,
						padding: 5,
						marginVertical: 20,
					}}
					onPress={submitForm}
					loading={loading}
				>
					<Text style={{ color: "black", ...fontStyles.regularBold }}>
						{isSigningIn ? "Sign In" : "Sign Up"}
					</Text>
				</Button>
				{!!errors?.error && (
					<Text
						style={{
							color: Colors.primary,
							padding: 5,
							...fontStyles.regularBold,
						}}
					>
						{errors.error}
					</Text>
				)}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							color: "white",
							...fontStyles.regular,
						}}
					>
						{isSigningIn
							? "Don't have an account yet?"
							: "Already have an account?"}
					</Text>
					{!fUser && (
						<Button onPress={() => setIsSigningIn((prev) => !prev)}>
							<Text
								style={{
									color: Colors.primary,
									...fontStyles.regularBold,
								}}
							>
								{isSigningIn ? "Sign Up" : "Sign In"}
							</Text>
						</Button>
					)}
				</View>
			</View>
		</View>
	);
}
