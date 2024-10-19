import { AuthContext } from "@/src/components/AuthProvider";
import { useContext } from "react";

export function useAuth() {
	return useContext(AuthContext);
}
