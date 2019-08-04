 # P(1 + r)Y   +   c[ ((1 + r)Y + 1 - (1 + r)) / r ]


def test1():
	principal = 10000 # Principal
	interest_rate = 0.07 # interest rate YEARLY
	periods_per_year = 4 # num of times per year $ is compounded
	years = 15 # years
	contribution_amount = 3000 # contributions
	contributions_per_year = 1 # contributions per year
	contributions_per_period = contributions_per_year / periods_per_year # (12 / 1 = 12)
	periodic_interest_rate = interest_rate / periods_per_year
	print(periodic_interest_rate)


	runningTotal = principal

	for i in range(years * periods_per_year):
		# one compound period
		i = i + 1
		runningTotal = (runningTotal + (contributions_per_period * contribution_amount) ) * (1 + periodic_interest_rate)
	print(runningTotal)


def test2():
	principal = 10000 # Principal
	interest_rate = 0.07 # interest rate YEARLY
	months_per_compound = 12 # compounded quarterly
	years = 15 # years
	contribution_amount = 250 # contributions
	months_per_contribution = 1 # 1 = monthly, 12 = annual


	runningTotal = principal

	x = 0

	for i in range(years * 12):
		# one compound period
		i = i + 1
		month = i % 12
		if month == 0:
			month = 12
		print(month)

		# add contribution if month % contributions_per_year
		if month % months_per_contribution == 0:
			print('contributed')
			runningTotal += contribution_amount


		# calc interest if month % compounds_per_year
		if month % months_per_compound == 0:
			print('compounded')
			runningTotal = runningTotal * (1 + (interest_rate / (12 / months_per_compound)))

	print(x)
	print(runningTotal)


test2()


