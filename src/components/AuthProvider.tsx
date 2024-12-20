import { ReactNode, createContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

import { User } from "@/src/models/User";
import { useFirebaseAuth } from "@/src/services/auth";
import { getUser } from "@/src/services/user";
import { generateUniqueId } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as fUser } from "firebase/auth";

interface AuthContextType {
	userId: string | undefined;
	fUser: fUser | null | undefined;
	user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
	userId: undefined,
	fUser: undefined,
	user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<string | undefined>(undefined);
	const [user, setUser] = useState<User | null>(null);
	const fUser = useFirebaseAuth();

	useEffect(() => {
		(async () => {
			const uid = await getUserId();
			setUserId(uid ?? undefined);
		})();

		// (async () => {
		// 	try {
		// 		if (await Purchases.isConfigured()) {
		// 			const offerings = await Purchases.getOfferings();
		// 			if (offerings.current !== null) {
		// 				// Display current offering with offerings.current
		// 			}
		// 		}
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// })();
	}, []);

	// useEffect(() => {
	// 	Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

	// 	if (Platform.OS === "ios") {
	// 		Purchases.configure({ apiKey: "" });
	// 	} else if (Platform.OS === "android") {
	// 		Purchases.configure({ apiKey: "" });
	// 	}
	// }, []);

	useEffect(() => {
		if (fUser) {
			(async () => {
				const userData = await getUser(fUser.uid);
				setUser(userData);
			})();
		}
	}, [fUser]);

	async function getUserId() {
		try {
			const value = await AsyncStorage.getItem("uid");
			if (value !== null) {
				return value;
			} else {
				const uid = await assignUserId();
				return uid;
			}
		} catch (e) {
			const uid = assignUserId();
			return uid;
		}
	}

	async function assignUserId() {
		try {
			const uuid = generateUniqueId();
			await AsyncStorage.setItem("uid", uuid);
			return uuid;
		} catch (e) {
			console.error(e);
			throw "User data storage error - unable to load user.";
		}
	}

	return (
		<AuthContext.Provider
			value={{
				userId,
				fUser,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
