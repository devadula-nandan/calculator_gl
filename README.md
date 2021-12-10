# ui implementations
# this calculator can detect dark or light mode of your browser, and can change the theme/background accordingly (on window loads)
# a random color theme will be generated for buttons on every page load, with the help of an rng function & the generated theme will always be good (logics for good hsl color generation were implemented) (inspired from google's material you theming on android 12)
# responsive on all screens


# ux implementations
# javascript float precision errors are rectified in most cases
# max display limit for result is 9 (numbers from 0 - 999999999 including decimal values), beyond which Range Error will be displayed.
# if there is decimal in the result and the result lies between 0 - 999999999 including decimal values, total of only 9 charecters will be displayed of the whole answer
# error handling for zero division is implemented
# implemented an additional "." button to calculate decimal values (javascript float precision error is also fixed in most cases)
# the assignment template has a blank button, for which i have implemented a functionality (only for fun !!!)
# appropriate logics were implemented, to avoid entering multiple decimals for a number.


# further improvements
# the theme randomization could be wrapped in a function and can be assigned to a button (instead of randomizing on page load) and the theme values could be stored in local storage and could be retrieved & applied after window loads
# key mapping to numpad can be done by adding event listener on window on keydown and writing appropriate logics for the key pressed
# animation could be added for entering digits to the display
