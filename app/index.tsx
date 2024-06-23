import CompassList from "@/components/CompassList";
import { CompassType } from "@/models/Compass";
import Colors from "@/utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { addCompass, useCompasses } from "../services/compass";

export default function Index() {
	const compasses = useCompasses("nick");

	function handleAddCompass() {
		addCompass("nick", CompassType.personal);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					alignItems: "flex-end",
					padding: 15,
				}}
			>
				<Pressable onPress={handleAddCompass}>
					<AntDesign
						name="pluscircle"
						size={30}
						color={Colors.primary}
					/>
				</Pressable>
			</View>
			{compasses !== undefined && <CompassList compasses={compasses} />}
			{compasses === undefined && <Text>Loading...</Text>}
		</SafeAreaView>
	);
}
