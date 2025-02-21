import PropTypes from "prop-types";
import {Flex, Pagination, Select, Text} from "@mantine/core";
import {DataGrid} from "mantine-data-grid";
import classes from "./MantineGrid.module.scss";

export default function MantineGrid({state, rowId, toolbar, ...rest}) {
	return (
		<div style={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
			{/*<ToolBar state={state}/>*/}
			{toolbar}
			<DataGrid
				columns={state.columns}
				data={state.data.list}
				total={state.data.total}
				// onPageChange={state.fetchData}
				// onSearch={handleSearch}
				highlightOnHover
				// withColumnResizing
				verticalSpacing='md'
				// withColumnFilters
				// withSorting
				withFixedHeader
				loading={state.loading}
				withPagination
				// pageSizes={["1", "5", "10", "15"]}
				paginationMode
				state={{...state, rowId}}
				onRow={(row) => ({
					onDoubleClick(){
						state.onDoubleClick(row.original);
					}
				})}
				//this is the initial state in case of ndd some state that never change
				// initialState={{...state, rowId}}
				// debug //see debug
				components={{
					pagination: ({table}) => {
						const {pagination, handlePagination, data} = table.getState()
						return (
							<Flex
								justify='flex-end'
								align='center'
								p='.5rem'
								gap={16}
								style={{
									borderTop: `1px solid var(--mantine-color-default-border)`
								}}
							>
								<Flex direction='row' align='center' gap={8}>
									<Text>Page Size</Text>
									<Select
										// size='md'
										value={pagination.pageSize.toString()}
										data={['10', '20', '50', '100']}
										className={classes.select}
										onChange={(pageSize) => handlePagination({
											pageSize: +pageSize,
											pageIndex: 0
										})}
									/>
								</Flex>
								<Pagination
									size="md"
									total={Math.ceil(data.total / pagination.pageSize)}
									value={pagination?.pageIndex + 1}
									onChange={(pageIndex) => handlePagination({
										...pagination,
										pageIndex: pageIndex - 1
									})}
									className={classes.pagination}
									// withControls={false}
								/>
							</Flex>
						)
					}
				}}
				styles={{
					wrapper: {
						flex: 1,
						gap: 0,
						justifyContent: 'space-between',
						// border: `0.0625rem solid var(--mantine-color-default-border)`,
						borderBottomLeftRadius: 'var(--mantine-radius-md)',
						borderBottomRightRadius: 'var(--mantine-radius-md)',
						backgroundColor: 'var(--mantine-color-body)',
						padding: '1rem'
					},
					scrollArea: {
						paddingBottom: 0,
						flex: 1,
						'.mantine-LoadingOverlay-root': {
							div: {
								backgroundColor: 'light-dark(var(--mantine-color-overlay-1), var(--mantine-color-overlay-0))',
							}
						}
					},
					resizer: {
						borderRight: '0.0625rem solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
					},
					thead: {
						backgroundColor: 'var(--mantine-color-body)',
						'&:after': {
							backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))',
						},
					},
					tbody: {
						td: {
							borderTop: 'transparent !important',
							borderBottom: '0.0625rem solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-6)) !important',
						}
					},
					th: {
						div: {
							color: 'var(--mantine-color-text)',
							fontSize: 'var(--mantine-font-size-sm)',
						}
					},
					td: {
						alignItems: 'center',
						backgroundColor: 'var(--mantine-color-body)',
						// borderTop: '0.0625rem solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4)) !important',
						color: 'var(--mantine-color-text)',
					},
					tr: {
						'&:hover': {
							td: {
								backgroundColor: 'var(--mantine-color-default-hover)',
							}
						},
					},
				}}
				{...rest}
			/>
		</div>
	);
}

MantineGrid.propTypes = {
	state: PropTypes.object.isRequired,
	forms: PropTypes.object,
	rowId: PropTypes.string.isRequired,
	toolbar: PropTypes.node
}
