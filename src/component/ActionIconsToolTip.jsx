import PropTypes from "prop-types";
import {ActionIcon, Group, Tooltip} from "@mantine/core";
import icons from '@/theme/Icons.module.scss';

/**
 * const items = [{
 * 		tooltip: 'Close',
 * 		icon: <IconX/>,
 * 	    aria: 'aria-description',
 * 		onClick: () => state.closeModal()
 * 	}];
 * @param ITEMS
 * @returns {*}
 * @constructor
 */

export default function ActionIconsToolTip({items, size, ...rest}) {
	return (
		<Group gap={4} wrap='nowrap' {...rest}>
			{items.map(({tooltip, icon, aria, ...rest}, index) =>
				<Tooltip label={tooltip} color='dark.6' key={index}>
					<ActionIcon
						size={size || 26}
						variant="transparent"
						aria-label={aria || ''}
						color='dark.8'
						classNames={{
							root: icons['icon-root'],
							icon: icons['icon']
						}}
						{...rest}
					>
						{icon}
					</ActionIcon>
				</Tooltip>
			)}
		</Group>
	)
}

ActionIconsToolTip.propTypes = {
	items: PropTypes.array.isRequired,
	size: PropTypes.number
}