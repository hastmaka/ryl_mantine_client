import {createTheme, Modal, Pill, Text} from "@mantine/core";

export const theme = createTheme({
	fontFamily: 'Manrope, sans-serif',
	fontFamilyMonospace: 'Manrope, Monaco, Courier, monospace',
	headings: { fontFamily: 'Manrope, Greycliff CF, sans-serif' },
	components: {
		Text: Text.extend({
			defaultProps: {
				fw: 600
			}
		}),
		Modal: Modal.extend({
			styles: () => ({
				header: {
					borderBottom: '0.0625rem solid var(--mantine-color-gray-2)'
				},
				body: {
					padding: '1rem'
				}
			})
		}),
		Pill: Pill.extend({
			styles: () => ({
				root: {
					border: '1px solid #00000010',
				},
				label: {
					marginBottom: '4px'
				}
			})
		})
	},

	colors: {
		ratio: ['#AE650B'],
		primary: ['#ffa200', '#FFAD2A', '#FFBA54', '#FFC87E', '#FFD8A8', '#FFEAD2', '#FFFEFC'],
		secondary: ['#FF0000FF', '#FF2A2C', '#FF5458', '#FF7E82', '#FFA8AC', '#FFD2D5', '#FFFCFD',],
	},
});


