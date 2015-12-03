function PricingLib() {

	var self = this;
	
	self.jsonRateDictionary = 	{
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
	
	self.strErrorMsg = '';
	
	self.getRateDictionary = function () {
		return self.jsonRateDictionary;
	}
	
	self.getErrorMessage = function () {
		return self.strErrorMsg;
	}
	
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
