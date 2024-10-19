import { useState } from "react";

export function useSnackbar() {
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");

	function show(text: string) {
		if (text !== "") {
			setMessage(text);
			setVisible(true);
		}
	}

	function hide() {
		setMessage("");
		setVisible(false);
	}

	return {
		message,
		visible,
		show,
		hide,
	};
}
