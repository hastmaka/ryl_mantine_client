export const formatMoney = (value) => {
	// Convert cents to dollars
	// let dollars = value / 100;

	// Format with two decimal places
	let formattedMoney = value.toFixed(2);
	
	// Format the integer part with commas for thousands separators
	formattedMoney = formattedMoney.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	
	// Prepend a dollar sign to the formatted money string
	formattedMoney = '$' + formattedMoney;
	
	return formattedMoney;
}