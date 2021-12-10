let prevNumber, prevOperator, result, expression, explosion;
let decimalUsed = false
const buttons = ["C", "CE", "%", "+", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "÷", "", "0", ".", "="];

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
	"x": { color: theme },
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
			_result = Number(parseFloat(num1+num2).toPrecision(12)) // type casting to numbers to remove trailing zeros automatically
			break;
		case "-":
			_result = Number(parseFloat(num1-num2).toPrecision(12))
			break;
		case "x":
			_result = Number(parseFloat(num1*num2).toPrecision(12))
			break;
		case "÷":
			_result = Number(parseFloat(num1/num2).toPrecision(12))
			break;
		case "%":
			(num1/num2)
			_result = Number(parseFloat(num1%num2).toPrecision(12))
			break;
		default:
			_result = 0;
	}
	_result = String(_result);
	if (_result === "Infinity") return clearScreen("Can't divide by", "Zero");
	if (_result === "NaN") return clearScreen("Syntax", "Error");
	if (_result.includes(".")){
		if (_result.split('.')[0].length <= 8) return _result.split('.')[0] + "." + (_result.split('.')[1].length > 8 - _result.split('.')[0].length  ? (_result.split('.')[1].slice(0 , (8-_result.split('.')[0].length))) :(_result.split('.')[1]) )
		
	} else {
		if (_result.length > 9) return (clearScreen("Range", "Error") , console.log(_result));
		return _result;
	}
	
};
const handleOperator = (operator) => {
	console.log(prevOperator);
	if (operator === "=") {
		decimalUsed = false;
		if (["+","-"].includes(result.innerHTML) && result.innerHTML.length == 1){
			return clearScreen("Syntax", "Error");
		} else if (prevOperator) {
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
		if (decimalUsed === false && result.innerHTML.length < 9) {
			result.innerHTML += buttonName;
		}
	} else if(["%" , "x" , "÷"].includes(`${expression.innerHTML[expression.innerHTML.length-1]}`) && ["+","-"].includes(buttonName)){
		result.innerHTML = buttonName;
	} else if(["+","-"].includes(buttonName) && result.innerHTML == "0"){
		result.innerHTML = buttonName;
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
