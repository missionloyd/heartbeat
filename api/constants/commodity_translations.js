const commodityTranslations = {
    elec_kwh : "electricity",
    htwt_mmbtuh : "hot_water",
    wtr_usgal : "water",
    chll_tonh : "chilled_water",
    co2_tonh : "co2_emissions"
};

const reversedCommodityTranslations = Object.entries(commodityTranslations).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

module.exports = {commodityTranslations, reversedCommodityTranslations};