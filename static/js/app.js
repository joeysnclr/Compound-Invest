function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function toggleMobileNav() {
	var x = document.getElementById("nav");
	if (x.style.display === "flex") {
		x.style.display = "none";
	} else {
		x.style.display = "flex";
	}
}


function compoundData(principal, interest_rate, months_per_compound, years, contribution_amount, months_per_contribution) {
	var runningTotal = principal

	var graphYears = []
	var graphValues = []

	var i = 0
	while (i <= years * 12) {
		var month = (i + 1) % 12
		if (month == 0) {
			month = 12
		}

		if (month % months_per_contribution == 0) {
			runningTotal += contribution_amount
		}

		if (month % months_per_compound == 0) {
			runningTotal = runningTotal * (1 + (interest_rate / (12 / months_per_compound)))
		}

		if (month == 12) {
			graphYears.push(Math.round(i / 12))
			graphValues.push(Math.round(runningTotal))
		}

		i++;
	}


	var futureValue = Math.round(runningTotal)
	var contributions = (12 / months_per_contribution) * contribution_amount * years
	var totalInvested = contributions + principal
	var interestAccrued = futureValue - totalInvested
	var ROI = round(  (( futureValue - totalInvested ) / totalInvested) * 100  , 2)
	var millionareAfter = 99
	return_data = {
		"futureValue": futureValue,
		"contributions": contributions,
		"totalInvested": totalInvested,
		"interestAccrued": interestAccrued,
		"ROI": ROI,
		"millionareAfter": millionareAfter,
		"years": graphYears,
		"values": graphValues
	}

	return return_data


}

function updateOutput(data) {
	$("#future").html(data['futureValue'])
	$("#roi").html(data['ROI'])
	$("#milli").html(data['millionareAfter'])
	$("#invested").html(data['totalInvested'])
	$("#contributed").html(data['contributions'])
	$("#accrued").html(data['interestAccrued'])
	new AutoNumeric.multiple('.output-value', {digitGroupSeparator: ',', allowDecimalPadding: false});

	myChart.data.labels = data['years']
	myChart.data.datasets[0].data = data['values']
	myChart.update()

	return
}

function formChange() {
	var principal = Number($('[name="principal"]').val().replace(',', ''))
	var rate = Number($('[name="rate"]').val().replace(',', ''))
	var years = Number($('[name="years"]').val().replace(',', ''))
	var contribution = Number($('[name="contribution"]').val().replace(',', ''))
	var contribution_freq = $('[name="contribution_freq"]').val()
	var compounded = $('[name="compounded"]').val()

	var data = compoundData(Number(principal), Number(rate) / 100, Number(compounded), Number(years), Number(contribution), Number(contribution_freq))

	updateOutput(data)
}
formChange()

