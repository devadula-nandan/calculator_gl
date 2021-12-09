# ui implementations
# this calculator can detect dark or light mode of your browser, and can change the theme/background accordingly (on window loads)
# a random color theme will be generated for buttons on every page load, with the help of an rng function & the generated theme will always be good (logics for good hsl color generation were implemented) (inspired from google's material you theming on android 12)
# is mobile responsive for most screens


# ux implementations
# max display limit for result is 9 , beyond which Range Error will be displayed.
# error handling for zero division is implemented
# implemented an additional "." button to calculate decimal values (javascript float precision error is also fixed in most cases, but is still present in few cases, so this feature needs some fine tuning)
# the assignment template has a blank button, for which i have implemented a functionality (only for fun !!!)
# appropriate logics were implemented, to avoid entering multiple decimals for single number.


# further improvements
# javascript float precision error could be fixed perfectly in few cases
# the theme randomization could be wrapped in a function and can be assigned to a button (instead of randomizing on page load) and the theme values could be stored in local storage and could be retrieved & applied after window loads
# key mapping to numpad can be done by adding event listener on window on keydown and writing appropriate logics for the key pressed
# animation could be added for entering digits to the display
