/**
 * This fetches the test data from the test UI and calls the pricing 
 * library method to determine the markup price and then displays that
 * price in the test UI.
 *
 * @returns {null}
 */
function doCalculation(){

	var objBasePrice = document.getElementById('inpBasePrice');
	var nBasePrice = objBasePrice.value-0; // -0 to cast into number
	
	var objNumPeople = document.getElementById('inpNumPeople');
	var nNumPeople = objNumPeople.value-0; // -0 to cast into number

	var objSector = document.getElementById('inpSector');
	var strSector = objSector.value;	
	
	var objPricingLib = new PricingLib();
	var nCalculatedPrice = objPricingLib.calculateRate(nBasePrice, strSector, nNumPeople);
	
	var objAnswer = document.getElementById('answer');
	
	if (false !== nCalculatedPrice) {
		objAnswer.innerHTML = '$'+nCalculatedPrice;
	}
	else {
		objAnswer.innerHTML = 'ERROR: '+strErrorMsg;	
	}
	
	return;
}
