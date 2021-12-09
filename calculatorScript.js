let prevNumber, prevOperator, result, expression, explosion;
let decimalUsed = false
const buttons = ["C", "CE", "%", "+", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "÷", "", "0", ".", "=",];

// random button theming
const rng = (lower, upper) => Math.floor(lower + (upper + 1 - lower) * Math.random());
h = rng(0, 360)
s = rng(20, 50)
const theme = `hsl(${h}deg,${s}%,${40}%)`;
let themeAlt = `hsl(${h}deg,${s}%,${90}%)`;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	themeAlt = `hsl(${h}deg,${s}%,${10}%)`;
}

const buttonProps = {
	C: { color: theme },
	CE: { color: theme },
	"%": { color: theme },
	"+": { color: theme },
	7: { color: themeAlt },
	8: { color: themeAlt },
	9: { color: themeAlt },
	x: { color: theme },
	4: { color: themeAlt },
	5: { color: themeAlt },
	6: { color: themeAlt },
	"-": { color: theme },
	1: { color: themeAlt },
	2: { color: themeAlt },
	3: { color: themeAlt },
	"÷": { color: theme },
	"": { color: themeAlt },
	0: { color: themeAlt },
	".": { color: themeAlt },
	"=": { color: theme },
};

//functions
const clearScreen = (a, b) => {
	if (a, b) {
		expression.innerHTML = a;
		result.innerHTML = b;
		setTimeout(() => {
			result.innerHTML = "0";
			expression.innerHTML = "";
		}, 1000);
	} else { result.innerHTML = "0"; expression.innerHTML = "" }
	prevNumber = prevOperator = null;
	return false;
};

const performOperation = (num1, num2) => {
	let _result;
	(num1 = Number(num1)), (num2 = Number(num2));
	switch (prevOperator) {
		case "+":
			_result = (num1 * 10 + num2 * 10) / 10;
			break;
		case "-":
			_result = (num1 * 10 - num2 * 10) / 10;
			break;
		case "x":
			_result = num1 * num2;
			break;
		case "÷":
			_result = (num1 * 10) / (num2 * 10);
			break;
		case "%":
			_result = num1 % num2;
			break;
		default:
			_result = 0;
	}
	if(String(_result).length >= 9 && String(_result).includes(".")) {
		const limit = 8 - String(_result).split('.')[0].length;
		_result = _result.toFixed(limit);
		if(_result - Math.round(_result) < 1 / Math.pow(10, 11)) 
			_result = Math.round(_result);
	}
	_result = String(_result);
	if (_result === "Infinity") return clearScreen("Can't divide by", "zero");
	else if (_result.length > 9) return clearScreen("Range", "Error");
	return _result;
};

const handleOperator = (operator) => {
	decimalUsed = false;
	if (isNaN(result.innerHTML)) result.innerHTML = "0";
	if (operator === "=") {
		if (prevOperator) {
			expression.innerHTML = `${prevNumber} ${prevOperator} ${result.innerHTML} = `;
			let _result = performOperation(prevNumber, result.innerHTML);
			if (!_result) return;
			result.innerHTML = _result;
			prevNumber = result.innerHTML;
			prevOperator = null;
		}
	} else {
		if (prevOperator) {
			let _result = performOperation(prevNumber, result.innerHTML);
			if (!_result) return;
			prevNumber = _result;
		} else prevNumber = result.innerHTML;
		prevOperator = operator;
		result.innerHTML = "0";
		expression.innerHTML = `${prevNumber} ${operator}`;
	}
};

const handleClick = (buttonName) => {
	result.innerHTML.includes(".") ? decimalUsed = true : decimalUsed = false;
	if (!buttonName) return burnItDown();

	if (buttonName === "C") clearScreen();
	else if (buttonName === "CE") {
		if (result.innerHTML.length === 1) result.innerHTML = "0";
		else
			result.innerHTML = result.innerHTML.slice(
				0,
				result.innerHTML.length - 1
			);
	} else if (!isNaN(buttonName)) {
		if (result.innerHTML === "0") result.innerHTML = buttonName;
		else if (result.innerHTML.length < 9) result.innerHTML += buttonName;
	} else if (buttonName === ".") {
		if (decimalUsed === false) {
			result.innerHTML += buttonName;
		}
	}
	else handleOperator(buttonName);
};

window.addEventListener("load", () => {
	const buttonList = document.getElementById("button-list");
	result = document.getElementById("result");
	result.style.color = theme;
	expression = document.getElementById("expression");
	expression.style.color = theme;
	explosion = document.getElementById('explosion');
	buttons.forEach((button) => {
		const buttonItem = document.createElement("button");
		buttonItem.innerHTML = button;
		buttonItem.style.background = buttonProps[button].color;
		buttonProps[button].color == theme ? buttonItem.style.color = "white" : buttonItem.style.color = theme;
		buttonItem.addEventListener("click", ({ target: { innerHTML } }) =>
			handleClick(button)
		);
		buttonList.append(buttonItem);
	});
});

//fun, try pressing the blank button
const burnItDown = () => {
	explosion.style.display = 'block';
	explosion.src = './fun.gif';
	setTimeout(() => {
		window.close();
	}, 1000)
}
