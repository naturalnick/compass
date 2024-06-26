import CompassList from "@/components/CompassList";
import Loading from "@/components/Loading";
import { CompassType } from "@/models/Compass";
import Colors from "@/utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, Pressable, SafeAreaView, View } from "react-native";
import { addCompass, useCompasses } from "../services/compass";

export default function Index() {
	const compasses = useCompasses("nick");

	function handleAddCompass() {
		// if (compasses && compasses?.length < 0) {
		// 	addCompass("nick", CompassType.personal);
		// } else {
		// 	Alert.alert(
		// 		"1 Compass Limit",
		// 		"You've hit the max number of Compasses for your device.\n\nUpgrade to add more Compasses.",
		// 		[
		// 			{
		// 				text: "Upgrade",
		// 				onPress: () => console.log("Upgrade pressed"),
		// 			},
		// 			{
		// 				text: "Cancel",
		// 				onPress: () => console.log("Cancel Pressed"),
		// 				style: "cancel",
		// 			},
		// 		]
		// 	);
		// }
	}

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<SafeAreaView>
				<View
					style={{
						alignItems: "flex-end",
						padding: 15,
					}}
				>
					<Link href="/new" asChild>
						<Pressable
							onPress={handleAddCompass}
							disabled={compasses === undefined}
						>
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
