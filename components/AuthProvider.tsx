import { User } from "@/models/User";
import { useFirebaseAuth } from "@/services/auth";
import { getUser } from "@/services/user";
import { generateUniqueId } from "@/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as fUser } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";

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
	}, []);

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
