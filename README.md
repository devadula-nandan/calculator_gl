# UI Implementations

1. This calculator can detect the dark or light mode of your browser and change the theme/background accordingly upon window load.
2. A random color theme will be generated for buttons on every page load using an RNG function. The generated theme will always be visually appealing, thanks to implemented logic for good HSL color generation. This feature is inspired by Google's Material You theming on Android 12.
3. The calculator is designed to be responsive on all screens.

# UX Implementations

1. JavaScript float precision errors are rectified in most cases to ensure accurate calculations.
2. The maximum display limit for the calculator's result is set to 9. Any numbers beyond this limit (0 - 999999999, including decimal values) will display a Range Error.
3. If the result has a decimal and falls between 0 and 999999999 (including decimal values), a maximum of 9 characters will be displayed for the entire answer.
4. Error handling is implemented for zero division.
5. An additional "." button is provided to calculate decimal values, and JavaScript float precision errors are addressed in most cases.
6. Appropriate logic is implemented to prevent entering multiple decimals for a number.

# Further Improvements

1. The randomization of themes could be wrapped in a function and assigned to a button, allowing users to change the theme dynamically instead of randomizing it on page load. The theme values could also be stored in local storage and retrieved and applied after window loads.
2. Key mapping to the numpad can be implemented by adding an event listener on the window's keydown event and writing appropriate logic for the pressed key.
3. Animation could be added to enhance the user experience when entering digits on the display.
4. Every edge case has been taken care of, but if you encounter any bugs, please let us know.

