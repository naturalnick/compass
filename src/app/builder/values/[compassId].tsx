import {
	updateCoreValues,
	updateCustomValues,
	useCompass,
} from "@/src/services/compass";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { Card, Snackbar } from "react-native-paper";

import CoreValueItem from "@/src/components/CoreValueItem";
import { coreValues } from "@/src/constants/coreValues";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import Colors from "@/src/utils/colors";
import { isValidLettersOnly } from "@/src/utils/helpers";
import { fontStyles } from "@/src/utils/typography";

export default function ValuesPicker() {
	const searchParams = useLocalSearchParams();
	if (!searchParams?.compassId) return null;

	const compass = useCompass(searchParams.compassId as string);

	if (compass === null) return router.dismissAll();

	const [selectedValues, setSelectedValues] = useState(
		compass?.coreValues ?? []
	);
	const [customValues, setCustomValues] = useState(
		compass?.customValues ?? []
	);
	const [customValueText, setCustomValueText] = useState("");
	const [customValueError, setCustomValueError] = useState<string | null>(
		null
	);
	const { visible, message, show, hide } = useSnackbar();

	useEffect(() => {
		//this may just update every time, which is fine...
		if (!!compass?.coreValues && compass?.coreValues !== selectedValues)
			setSelectedValues(compass?.coreValues);
		if (!!compass?.customValues && compass?.customValues !== customValues)
			setCustomValues(compass?.customValues);
	}, [compass]);

	useEffect(() => {}, [selectedValues]);

	useEffect(() => {
		validateCustomValue(customValueText);
	}, [customValueText]);

	function selectValue(value: string) {
		setSelectedValues((prevValues) => {
			const valueIndex = prevValues.findIndex(
				(v) => v.toLowerCase() === value.toLowerCase()
			);
			if (valueIndex === -1) {
				return [...prevValues, value];
			} else {
				return prevValues.filter((v) => v !== value);
			}
		});

		if (selectedValues.length === 10) {
			show("Great job! You've selected 10!");
		}
		if (selectedValues.length === 20) {
			show(
				"Woah, you've selected 20! That's more than we recommend, but you do you!"
			);
		}
	}

	function handleSave() {
		if (compass?.coreValues !== selectedValues) {
			updateCoreValues(compass?.id!, selectedValues);
		}
		if (compass?.customValues !== customValues) {
			updateCustomValues(compass?.id!, customValues);
		}
		router.back();
	}

	function addCustomValue(value: string) {
		if (value === "") return;
		if (customValueError) return;

		if (customValues.includes(value)) {
			setSelectedValues((prevValues) => [...prevValues, value]);
			setCustomValueText("");
			return;
		}

		const allValues = coreValues.flatMap((section) => section.values);
		if (allValues.includes(value)) {
			setSelectedValues((prevValues) => [...prevValues, value]);
			setCustomValueText("");
			return;
		}

		setCustomValues((prevValues) => [...prevValues, value]);
		setSelectedValues((prevValues) => [...prevValues, value]);
		setCustomValueText("");
	}

	function validateCustomValue(value: string) {
		if (value === "") setCustomValueError(null);
		else if (!isValidLettersOnly(value)) {
			setCustomValueError(
				"Only letters are valid, no special characters or numbers."
			);
		} else setCustomValueError(null);
	}

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView>
				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-start",
						gap: 20,
						padding: 15,
					}}
				>
					<Pressable onPress={handleSave}>
						<Ionicons name="arrow-back" size={30} color="#FFCC01" />
					</Pressable>
					<View
						style={{
							gap: 5,
							flexGrow: 1,
							flexShrink: 1,
						}}
					>
						<Text
							style={{
								...fontStyles.regularBold,
								color: "white",
							}}
						>
							What are your core values?
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								style={{
									...fontStyles.regular,
									color: "white",
								}}
							>
								Choose your top 10
							</Text>
							<Text
								style={{
									...fontStyles.regular,
									color: "white",
								}}
							>
								{`${selectedValues.length} selected`}
							</Text>
						</View>
					</View>
				</View>
			</SafeAreaView>
			<ScrollView style={{ padding: 15 }}>
				{coreValues.map((section) => (
					<View
						key={section.section + selectedValues.length.toString()}
					>
						<Text
							style={{
								...fontStyles.regularBold,
								color: "white",
								marginVertical: 15,
							}}
						>
							{section.section}
						</Text>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								flexWrap: "wrap",
							}}
						>
							{section.values.map((value) => (
								<CoreValueItem
									key={value}
									value={value}
									selected={selectedValues.includes(value)}
									onSelect={selectValue}
								/>
							))}
						</View>
					</View>
				))}
				<View>
					<Text
						style={{
							...fontStyles.regularBold,
							color: "white",
							marginVertical: 15,
						}}
					>
						Custom
					</Text>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							marginBottom: 20,
						}}
					>
						{customValues.map((value) => (
							<CoreValueItem
								key={value}
								value={value}
								selected={selectedValues.includes(value)}
								onSelect={selectValue}
							/>
						))}
					</View>
					<Card
						style={{
							padding: 12,
							marginBottom: 100,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<TextInput
								value={customValueText}
								onChangeText={(text) =>
									setCustomValueText(text)
								}
								style={{
									...fontStyles.regular,
									flexGrow: 1,
									flexShrink: 1,
								}}
								multiline
								maxLength={26}
								placeholder="Enter a new value"
							/>
							<Pressable
								onPress={() =>
									addCustomValue(customValueText.trim())
								}
							>
								<AntDesign
									name="pluscircle"
									size={30}
									color={Colors.primary}
								/>
							</Pressable>
						</View>
						{customValueError && (
							<View
								style={{
									borderTopWidth: 1,
									borderTopColor: "red",
									marginTop: 10,
								}}
							>
								<Text
									style={{
										color: "red",
										padding: 3,
										...fontStyles.regularBold,
									}}
								>
									{customValueError}
								</Text>
							</View>
						)}
					</Card>
				</View>
			</ScrollView>
			<Snackbar
				visible={visible}
				onDismiss={() => hide()}
				action={{
					label: "Close",
					onPress: () => hide(),
				}}
			>
				{message}
			</Snackbar>
		</View>
	);
}
