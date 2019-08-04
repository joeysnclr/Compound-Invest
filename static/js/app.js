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


	// get final value
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
	// get "millionare after"
	var val = principal
	var i = 0
	while (val <= 1000000) {
		var month = (i + 1) % 12
		if (month == 0) {
			month = 12
		}

		if (month % months_per_contribution == 0) {
			val += contribution_amount
		}

		if (month % months_per_compound == 0) {
			val = val * (1 + (interest_rate / (12 / months_per_compound)))
		}

		i++;
	}


	var futureValue = round(runningTotal, 0)
	var contributions = (12 / months_per_contribution) * contribution_amount * years
	var totalInvested = contributions + principal
	var interestAccrued = futureValue - totalInvested
	var ROI = round(  (( futureValue - totalInvested ) / totalInvested) * 100  , 2)
	var millionareAfter = Math.ceil(i / 12)
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
	new AutoNumeric.multiple('.output-value', {digitGroupSeparator: ',', allowDecimalPadding: false, vMin: '0'});

	myChart.data.labels = data['years']
	myChart.data.datasets[0].data = data['values']
	myChart.options.scales.yAxes[0].ticks.max = Math.ceil(data['values'][data['values'].length - 1] / 10000) * 10000
	myChart.options.scales.xAxes[0].ticks.max = data['years'].length
	myChart.update()

	return
}

function formChange() {
	var principal = Number($('[name="principal"]').val().replace(/,/g, ''))
	var rate = Number($('[name="rate"]').val().replace(/,/g, ''))
	var years = Number($('[name="years"]').val().replace(/,/g, ''))
	var contribution = Number($('[name="contribution"]').val().replace(/,/g, ''))
	var contribution_freq = $('[name="contribution_freq"]').val()
	var compounded = $('[name="compounded"]').val()
	console.log(principal)

	var data = compoundData(Number(principal), Number(rate) / 100, Number(compounded), Number(years), Number(contribution), Number(contribution_freq))
	console.log(data)
	updateOutput(data)
}
formChange()

