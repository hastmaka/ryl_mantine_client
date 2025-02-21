import PropTypes from "prop-types";
import {Center, ScrollArea, Stack, Table} from "@mantine/core";
import table from './EzTable.module.scss'
import ActionIconsToolTip from "@/component/ActionIconsToolTip.jsx";
import {IconDatabaseOff} from "@tabler/icons-react";
import EzText from "@/ezMantine/text/EzText.jsx";

export default function EzTable({
	height,
	tableProps,
	containerProps,
	toolbar,
	head,
	data,
	tdMap,
	actions,
	dataKey
}) {
	let ToolBar = toolbar ? toolbar.component : undefined
	const thead = head.map((item, index) =>	{
		return (
			<Table.Th
				key={index}
				{...(typeof tdMap[index] === "object" && {
					w: tdMap[index].w
				})}
				{...(item === 'Actions' && {
					w: '10%'
				})}
			>
				<EzText fw='sm' style={{textWrap: 'nowrap'}}>{item}</EzText>
			</Table.Th>
		)
	})

	const rows = data.map((row) => {
		return <Table.Tr key={row[dataKey]}>
			{tdMap.map((item, index) => {
				return (
					<Table.Td
						key={index}
					>
						{item.render
							? item.render(row[item.name])
							: row[typeof item === "object"
								? item.name
								: item]?.toString()
						}
					</Table.Td>
				)
			})}
			{actions.length > 0 &&
				<Table.Td
					className={table.action}
					style={{
						width: `${actions.length*40+32}px`,
						minWidth: `${actions.length*40+32}px`,
					}}
				>
					<ActionIconsToolTip
						justify='center'
						items={actions.map((action) => {
							return {
								...action,
								onClick: () => action.onClick(row)
							}
						})}
					/>
				</Table.Td>
			}
		</Table.Tr>
	})

	return (
		<Stack gap={0} className={table.container} {...containerProps}>
			{toolbar && <ToolBar/>}
			{data.length > 0
				?
				<ScrollArea h={height} type='hover'>

						<Table
							stickyHeader
							highlightOnHover
							className={table.table}
							{...tableProps}
						>
							<Table.Thead>
								<Table.Tr>
									{thead}
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>

				</ScrollArea>
				:
				<Center h={height}>
					<Stack align='center'>
						<IconDatabaseOff
							style={{
								width: 'clamp(3.5rem, 3vw, 3.5rem)',
								height: 'clamp(3.5rem, 3vw, 3.5rem)'
							}}
							color='gray'
							stroke={1}
						/>
						<EzText	color='gray'>No Data</EzText>
					</Stack>
				</Center>
			}
		</Stack>
	);
}

EzTable.propTypes = {
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	tableProps: PropTypes.object,
	containerProps: PropTypes.object,
	toolbar: PropTypes.object,
	head: PropTypes.array,
	data: PropTypes.array,
	tdMap: PropTypes.array,
	actions: PropTypes.array,
	dataKey: PropTypes.string
}