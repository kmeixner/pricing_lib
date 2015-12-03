/** 
* @class PricingLib
* 
* @desc
*
* This class provides methods to calculate pricing rates.
*/
function PricingLib() {

	// *** PROPERTIES ***:

	/**
	 * @private {object} self: convenient reference to class template from 
	 * within itself.
	 */ 
	var self = this;
	
	/**
	 * @public {string} strErrorMsg: a failure error message (or null string ("") if no error has occurred)
	 */ 	
	self.strErrorMsg = '';	
	
	/**
	 * @public 
	 * @property {object} jsonRateDictionary: the markup rate dictionary:
	 *
	 * Dictionary Format:	 
	 * 	{
	 * 		base:{flatrate:0.05},
	 * 		person:{personrate:0.012},
	 * 		sector:
	 * 			{
	 * 				pharmaceuticals:0.075,
	 * 				food:0.13,
	 * 				electronics:0.02,
	 * 				other:0.00
	 * 			}
	 * 	}
	 */	 
	self.jsonRateDictionary = 	
		{
			base:{flatrate:0.05},
			person:{personrate:0.012},
			sector:
				{
					pharmaceuticals:0.075,
					food:0.13,
					electronics:0.02,
					other:0.00
				}
		};
	
	// *** METHODS ***:	
	
	/**
	 * @method getRateDictionary
	 *
	 * @desc
	 *
	 * Returns the rate dictionary:
	 *
	 * Dictionary Format:
	 *
	 * 	{
	 * 		base:{flatrate:0.05},
	 * 		person:{personrate:0.012},
	 * 		sector:
	 * 			{
	 * 				pharmaceuticals:0.075,
	 * 				food:0.13,
	 * 				electronics:0.02,
	 * 				other:0.00
	 * 			}
	 * 	}	 
	 *
	 * @returns {object}: the rate dictionary
	 */	
	self.getRateDictionary = function () {
		return self.jsonRateDictionary;
	}
	
	/**
	 * @method getErrorMessage
	 *	
	 * @desc
	 *	 
	 * Returns the error message string if an error has occurred.
	 * Returns nulstring ("") if no error has occurred.
	 *
	 * @returns {string}
	 */		
	self.getErrorMessage = function () {
		return self.strErrorMsg;
	}
	
	/**
	 * @method getRateForSector
	 *	
	 * @desc
	 *	 
	 * Returns the rate for the given sector;
	 *
	 * @param {String} sector: 'pharmaceuticals'|'food'|'electronics'|'other'
	 *
	 * @returns {Number}: rate for the given sector (or false for an unsupported sector value)
	 */		
	self.getRateForSector = function (sector) {

		switch(sector) {
			
			case 'pharmaceuticals': case 'food': case 'electronics': case 'other':
				return self.jsonRateDictionary['sector'][sector];
			break;
			
			default:
				self.strErrorMsg = "getRateForSector(): unknown sector received (and 'other' not specified).";
				return false;
		}
	}
	
	/**
	 * @method calculateRate
	 *		
	 * @desc
	 *	 
	 * This calculates the markup rate given the base price, sector and number
	 * of people assigned to work on the job.
	 *
	 * How markup is calculated:
	 *
     * 1) The baseMarkupPrice is calucated by applying the base flat markup 
	 * rate to the basePrice
	 *
	 * 2) The sector markup percentage is calculated from the baseMarkupPrice
	 * and added
	 *
	 * 3) The markup percentage for the given number of people assigned to 
	 * work on the job is calculated from the baseMarkupPrice and added	 
	 *
	 * ie: Let nBaseMarkup = basePrice*(1+flatMarkupPercent)
	 *
	 * Then finalMarkupPrice := 
	 *	nBaseMarkup
	 *	+ nSectorPercentage*nBaseMarkup
	 *	+ numPeople*nPeoplePercentage*nBaseMarkup
	 *
	 * @param {Number} basePrice: base price before adding markup
	 * @param {String} sector: the sector ('pharmaceuticals'|'food'|'electronics'|'other')
	 * @param {Number} numPeople: number of people assigned to work on job
	 *
	 * @returns {Number}: the markup price (or false upon error)
	 */		
	self.calculateRate = function (basePrice, sector, numPeople) {

		if (null === basePrice) {
			self.strErrorMsg = 'calculateRate(): basePrice is required.';
			return false;
		}
		
		if (null === sector) {
			self.strErrorMsg = 'calculateRate(): sector is required.';
			return false;
		}

		if (null === numPeople || numPeople < 1) {
			self.strErrorMsg = 'calculateRate(): numPeople is required and must be 1 or more.';	
			return false;
		}
		
		var nBaseRate = self.jsonRateDictionary['base']['flatrate'];
		var nPerPersonRate = self.jsonRateDictionary['person']['personrate'];	
		var nSectorRate = self.getRateForSector(sector);
		
		if (false === nSectorRate) {
			return false;
		}
		
		var nBaseMarkupPrice = (1+nBaseRate)*basePrice;
		var nPeopleMarkup = numPeople*nPerPersonRate*nBaseMarkupPrice;
		var nSectorMarkup = nSectorRate*nBaseMarkupPrice;
		
		var nFinalPrice = nBaseMarkupPrice+nPeopleMarkup+nSectorMarkup;
		
		nFinalPrice = Math.round(nFinalPrice*100)/100; // round off to at most 2 decimals
		
		return nFinalPrice;
	}	
	
}
