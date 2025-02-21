import {SignalState} from "./SignalClass.js";
import {FetchApi} from "../api/FetchApi.js";

export class SignalGridClass extends SignalState {
	constructor(props, func) {
		let defaultProps = {
			statusBar: false,
			loading: false,
			loadingForm: false,
			searchValue: '',
			confirmRowToDelete: '',
			modal: {open: false, who: '', title: ''},
			data: {list: [], total: 0},
			pagination: {pageIndex: 0, pageSize: props.store.limit || 5},
			businessData: {},
			isEditing: false,
			...props
		}
		super(defaultProps, func);
		this.addDefaultMethods();
	}

	addDefaultMethods() {
		const defaultMethods = {
			openModal(who, title) {
				this.modal = {open: true, who, title}
			},
			closeModal() {
				this.modal.open = false
				setTimeout(() => {
					this.modal = {...this.modal, who: '', title: ''}
				}, 200)
				// this.businessData = {}
				this.isEditing = false
			},
			handlePagination(updatedPagination) {
				this.search = this.searchValue
				this.pagination = {
					...updatedPagination,
					page: this.getPages(updatedPagination)
				}
			},
			getPages(updatedPagination) {
				let {pageSize} = updatedPagination,
					total = this.data.total,
					a = total % pageSize,
					page = total / pageSize;
				if(a !== 0) {
					page = Math.ceil(page)
				}
				return page
			},
			updateGrid(res) {
				const {data, dataCount} = res
				const transformedData = data.length ? data.map((item) => {
					return new this.store.model.main(item)
				}) : []
				this.data = {list: transformedData, total: dataCount}
				this.loading = false;
			},
			//search
			handleSearch(value) {
				if(value) {
					this.searchValue = value
					this.search = true
					this.pagination = {
						pageSize: this.pagination.pageSize,
						pageIndex: this.pagination.pageIndex,
						page: this.getPages(this.pagination)
					}
				} else {
					this.search = true
					this.searchValue = ''
					this.pagination = {
						pageSize: 10,
						pageIndex: 0,
					}
				}
			},
			async fetchData () {
				try {
					// let query = {eT, userId};
					let query = {};
					query.offset = this.search ? 0 : this.pagination.pageIndex * this.pagination.pageSize
					query.limit = this.pagination.pageSize
					//when search or pagination with search
					if(this.searchValue) {
						query.filters = JSON.stringify(this.store.filterFields.map(field => ({
							columnField: field,
							value: this.searchValue
						})))
					}

					this.loading = true

					const res = await FetchApi(this.store.api.read, null, null, query);

					this.updateGrid(res)
				} catch(error) {
					console.log(error)
				}
			},
			handleConfirm(id) {
				this.confirmRowToDelete = id
			},
		};

		for (const key in defaultMethods) {
			if (!Object.prototype.hasOwnProperty.call(this.signal, key)) {
				this.signal[key] = defaultMethods[key].bind(this.signal);
			}
		}
	}
}
