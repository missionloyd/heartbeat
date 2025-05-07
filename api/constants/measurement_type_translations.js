const measurementTypeTranslations = {
    "elec_kwh" : "electricity",
    "htwt_mmbtuh" : "hot_water",
    "wtr_usgal" : "water",
    "chll_tonh" : "chilled_water",
    "co2_tonh" : "co2_emissions",
    "elec_kwh_heating": "electricity_heating",
    "elec_kwh_cooling": "electricity_cooling",
    "humidity_%": "humidity",
    "temperature_f": "temperature",
    "pressure_mbar": "pressure",
    "pm2.5_µg/m3": "pm2.5",
    "pm10.0_µg/m3": "pm10.0",
    "gas_kwh": "gas",
};

const reversedMeasurementTypeTranslations = Object.entries(measurementTypeTranslations).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

module.exports = {measurementTypeTranslations, reversedMeasurementTypeTranslations};