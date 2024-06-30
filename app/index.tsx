import CompassList from "@/components/CompassList";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import Colors from "@/utils/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, SafeAreaView, View } from "react-native";
import { useCompasses } from "../services/compass";

export default function Index() {
	const { userId } = useAuth();
	const compasses = useCompasses(userId);
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 15,
					}}
				>
					<Link href="/settings" asChild>
						<Pressable>
							<Ionicons
								name="settings-sharp"
								size={30}
								color="white"
							/>
						</Pressable>
					</Link>
					<Link href="/new" asChild>
						<Pressable disabled={compasses === undefined}>
							<AntDesign
								name="pluscircle"
								size={30}
								color={Colors.primary}
							/>
						</Pressable>
					</Link>
				</View>
			</SafeAreaView>
			{compasses !== undefined && <CompassList compasses={compasses} />}
			{compasses === undefined && <Loading />}
		</View>
	);
}
