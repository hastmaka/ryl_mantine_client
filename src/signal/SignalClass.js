import { deepSignal } from "deepsignal/react";

export class SignalState {
	constructor(props, func) {
		this.props = props
		this.func = func
		this.signal = deepSignal({});
		this.init()
	}

	init() {
		for (const key in this.props) {
			try {
				//if doesnt exist create reset object
				if (!this['reset']) this['reset'] = {}
				//check if key is an object before copying
				if (typeof this.props[key] === 'object' &&
					this.props[key] !== null &&
					key !== 'store'
				) {
					// Deep copy the object to avoid reference issues
					Object.assign(this['reset'], {[key]: this.props[key]});
				}
				if (Object.prototype.hasOwnProperty.call(this.props, key)) {
					this.signal[key] =  this.props[key]
				}
			} catch (error) {
				throw new Error(`Error in SignalState: ${error.message}`)
			}

		}
		for (const key in this.func) {
			if (Object.prototype.hasOwnProperty.call(this.func, key)) {
				this.signal[key] = this.func[key].bind(this.signal);
			}
		}

		return this.signal;
	}
}