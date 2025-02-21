import PropTypes from "prop-types";
import { MantineProvider } from "@mantine/core";
import {theme} from "./theme.js";
import {Notifications} from "@mantine/notifications";
import {ThemeController} from "@/theme/ThemeController.js";
import ModalManager from '@/ezMantine/modalManager/ModalManager.jsx';

export default function Theme ({children}) {
	return (
		<MantineProvider
			theme={theme}
			forceColorScheme={ThemeController.theme}
		>
			<ModalManager/>
			<Notifications position='bottom-right'/>
			{children}
		</MantineProvider>
	);
}

Theme.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
		PropTypes.array,
		PropTypes.string
	]),
}
