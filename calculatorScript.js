let prevNumber, prevOperator, result, expression, explosion;

const clearScreen = (a, b) => {
	if (a, b) {
		expression.innerHTML = a;
		result.innerHTML = b;
		setTimeout(() => {
			result.innerHTML = "";
			expression.innerHTML = "";
		}, 1000);
	} else { result.innerHTML = ""; expression.innerHTML = "" }
	prevNumber = prevOperator = null;
	return false;
};

const performOperation = (num1, num2) => {
	let _result;
	(num1 = Number(num1)), (num2 = Number(num2));
	switch (prevOperator) {
		case "+":
			_result = num1 + num2;
			break;
		case "-":
			_result = num1 - num2;
			break;
		case "x":
			_result = num1 * num2;
			break;
		case "÷":
			_result = num1 / num2;
			break;
		case "%":
			_result = num1 % num2;
			break;
		default:
			_result = 0;
	}
	_result = String(_result);
	if (_result === "Infinity") return clearScreen("Can't divide by", "zero");
	else if (_result.length > 9) return clearScreen("Range", "Error");
	return _result;
};

const handleOperator = (operator) => {
	if (isNaN(result.innerHTML)) result.innerHTML = "";
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
		result.innerHTML = "";
		expression.innerHTML = `${prevNumber} ${operator}`;
	}
};

const burnItDown = () => {
	explosion.style.display = 'block';
	explosion.src = './fun.gif';
	setTimeout(() => {
		window.close();
	}, 1000)
}

const handleClick = (buttonName) => {
	if (!buttonName) return burnItDown();
	if (buttonName === "C") clearScreen();
	else if (buttonName === "CE") {
		if (result.innerHTML.length === 1) result.innerHTML = "";
		else
			result.innerHTML = result.innerHTML.slice(
				0,
				result.innerHTML.length - 1
			);
	} else if (!isNaN(buttonName)) {
		if (result.innerHTML === "") result.innerHTML = buttonName;
		else if (result.innerHTML.length < 9) result.innerHTML += buttonName;
	} else handleOperator(buttonName);
};

window.addEventListener("load", () => {
	const buttonList = document.getElementById("button-list");
	result = document.getElementById("result");
	result.style.color = theme
	expression = document.getElementById("expression");
	expression.style.color = theme
	explosion = document.getElementById('explosion');
	buttons.forEach((button) => {
		const buttonItem = document.createElement("button");
		buttonItem.innerHTML = button;
		buttonItem.style.background = buttonProps[button].color;
		buttonProps[button].color == theme ? buttonItem.style.color = "white" : buttonItem.style.color = theme;;
		buttonItem.addEventListener("click", ({ target: { innerHTML } }) =>
			handleClick(button)
		);
		buttonList.append(buttonItem);
	});
});

const buttons = ["C", "CE", "%", "+", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "÷", "", "0", "", "=",
];

const rng = (lower, upper) => Math.floor(lower + (upper + 1 - lower) * Math.random());
h=rng(0, 360)
s=rng(20, 50)
const theme = `hsl(${h}deg,${s}%,${40}%)`, lightBtn = `hsl(${h}deg,${s}%,${90}%)`;


const buttonProps = {
	"C": { color: theme },
	"CE": { color: theme },
	"%": { color: theme },
	"+": { color: theme },
	"7": { color: lightBtn },
	"8": { color: lightBtn },
	"9": { color: lightBtn },
	"x": { color: theme },
	"4": { color: lightBtn },
	"5": { color: lightBtn },
	"6": { color: lightBtn },
	"-": { color: theme },
	"1": { color: lightBtn },
	"2": { color: lightBtn },
	"3": { color: lightBtn },
	"÷": { color: theme },
	"": { color: lightBtn },
	"0": { color: lightBtn },
	"": { color: lightBtn },
	"=": { color: theme },
};
