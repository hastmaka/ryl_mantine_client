import {ScrollArea, Table} from '@mantine/core';
import PropTypes from "prop-types";
import classes from './EzTableInfo.module.scss'
import {capitalizeFirstLetter} from "@/util/index.js";

/**
 * simple table only to show info
 * @type {{head: string[], caption: string, body: string[][]}}
 */

function convertToArrayOfArrays(data, header) {
	let body = [],
		head = []
	data.map((item, index) => {
		let row = []
		Object.entries(header).forEach(([key, value]) => {
			if(index === 0) head.push(capitalizeFirstLetter(key))
			row.push(item[value])
		})
		body.push(row)
	})

	return {head, body}
}


export default function EzTableInfo({height, tableData, header}) {
	return (
		<ScrollArea h={height} type='hover'>
			<Table
				stickyHeader
				// stickyHeaderOffset={60}
				data={convertToArrayOfArrays(tableData, header)}
				//withTableBorder
				highlightOnHover
				className={classes.table}
			/>
		</ScrollArea>
	);
}

EzTableInfo.propTypes = {
	height: PropTypes.number.isRequired,
	tableData: PropTypes.array.isRequired,
	header: PropTypes.object
}

/**
 * @typedef {Object} TableData
 * const tableData = {
 *     // caption: 'Some elements from periodic table',
 *     head: ['Name', 'Status', 'Reason'],
 *     body: [
 *         ['John Doe', 'Pending', 'Authorization Expired'],
 *         ['sarah Johnson', 'Active', 'Pending document approval'],
 *         ['Michael Smith', 'Pending', 'Task pending for this week'],
 *         ['Emely White', 'Active', 'Task overdue by 2 weeks'],
 *         ['Emely White', 'Pending', ''],
 *         ['John Doe', 'Active', ''],
 *         ['sarah Johnson', 'Pending', ''],
 *         ['Michael Smith', 'Active', ''],
 *         ['Emely White', 'Pending', ''],
 *         ['Emely White', 'Active', ''],
 *     ]
 * };
 */