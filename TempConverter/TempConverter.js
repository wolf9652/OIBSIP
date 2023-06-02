function convert() {
    const temperatureInput = document.getElementById("temperature");
    const celsiusInput = document.getElementById("celsius");
    const fahrenheitInput = document.getElementById("fahrenheit");
    const kelvinInput = document.getElementById("kelvin");
    const unitSelect = document.getElementById("unit");

    const temperatureValue = parseFloat(temperatureInput.value);
    const unitValue = unitSelect.value;

    if(!isNaN(temperatureValue)) {
        switch (unitValue) {
            case "celsius":
                celsiusInput.value = temperatureValue;
                fahrenheitInput.value = temperatureValue * 1.8 + 32;
                kelvinInput.value = temperatureValue + 273.15;
                break;
            case "fahrenheit":
                celsiusInput.value = (temperatureValue - 32) / 1.8;
                fahrenheitInput.value = temperatureValue;
                kelvinInput.value = (temperatureValue + 459.67) * 5 / 9;
                break;
            case "kelvin":
                celsiusInput.value = temperatureValue - 273.15;
                fahrenheitInput.value = temperatureValue * 9 / 5 - 459.67;
                kelvinInput.value = temperatureValue;
                break;
            default:
                console.log("unknown unit:" + unitValue);
        }
    }
}