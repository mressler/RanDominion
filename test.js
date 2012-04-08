/**
 * When included, this file will test the cards and the recommendedKingdoms for
 * integrity.
 */

var requiredProps = ["name", "setId", "cost", "description"];
function hasRequiredProps(card) {
	for (var i in requiredProps) {
		var reqProp = requiredProps[i];
		if (!card.hasOwnProperty(reqProp)) {
			console.log("Missing property " + reqProp);
			return false;
		}
	}
	
	return true;
}

function hasPrimaryType(card) {
	return card.isVictory || card.isTreasure || card.isAction;
}

var allowedProps = [
    "name", "setId", "isVictory", "isReaction", "isAction", "isTreasure", 
    "isAttack", "isDuration", "cost", "victoryPoints", "buys", "description", 
    "actions", "cards", "coins", "potion"
];
function onlyHasAllowedProps(card) {
	for (var prop in card) {
		if (allowedProps.indexOf(prop) == -1) {
			console.log("Invalid prop " + prop);
			return false;
		}
	}
	
	return true;
}

function hasTenCards(set) {
	return set.cards.length == 10;
}

function allCardsExist(set) {
	for (var i in set.cards) {
		var cardName = set.cards[i];
		if (cardLookupByName[cardName] == undefined) {
			console.log("The card " + cardName + " does not exist.");
			return false;
		}
	}
	
	return true;
}

var cardChecks = [
     hasPrimaryType,
     onlyHasAllowedProps,
     hasRequiredProps,
];

var setChecks = [
     hasTenCards,
     allCardsExist,
];

for (var i in cards) {
	var card = cards[i];
	for (var j in cardChecks) {
		var check = cardChecks[j];
		
		if (!check(card)) {
			console.log("The card " + card.name + " failed the check " + check);
		}
	}
}
for (var i in recommendedKingdoms) {
	var set = recommendedKingdoms[i];
	for (var j in setChecks) {
		var check = setChecks[j];
		
		if (!check(set)) {
			console.log("The set " + set.name + " failed the check " + check);
		}
	}
}