const getWinterTemperature = (temperature) => {
  if (temperature >= 1 && temperature <= 18) {
    return "< 14°C";
  } else if (temperature > 18 && temperature < 40) {
    return "14°C - 17°C";
  } else if (temperature >= 40 && temperature < 61) {
    return "18°C - 21°C";
  } else if (temperature >= 61 && temperature < 80) {
    return "> 21°C";
  } else if (temperature >= 80) {
    return "Don't know";
  } else {
    return "";
  }
};

const validateAndFilterFields = (values) => {
    const {
      heating_type,
      property_features,
      additional_property_features,
      winter_temperature,
      electricity_usage_known,
      electricity_usage_amount,
      electricity_usage_unit,
      electricity_usage_amount_currency,
      electricity_usage_time_period,
      electricity_annual_spend,
      electricity_annual_amount,//: null,
      electricity_annual_unit,
      electricity_supplier,
      on_site_renewable_energy,
      on_site_renewable_amount,//: null,
      on_site_renewable_unit,
      natural_gas_usage_known,
      natural_gas_usage_amount,//: null,
      natural_gas_usage_unit,
      natural_gas_usage_time_period,
      natural_gas_annual_spend,
      natural_gas_annual_amount,//: null,
      natural_gas_annual_unit,
      gas_consumption_offset,
      oil_usage_known,
      oil_usage_amount,//: null,
      oil_usage_unit,
      oil_annual_spend,
      oil_annual_amount,//: null,
      oil_annual_unit,
      wood_usage_known,
      wood_usage_amount,//: null,
      wood_usage_unit,
      wood_annual_spend,
      wood_annual_amount,//: null,
      wood_annual_unit,
      coal_usage_known,
      coal_usage_amount,//: null,
      coal_usage_unit,
      coal_annual_spend,
      coal_annual_amount,//: null,
      coal_annual_unit,
      other_energy_usage,
      other_energy_which_and_amount,
      significant_land,
      land_details,
      zero_carbon_energy_tariff,
      ...rest
    } = values;

    const filteredValues = {
      ...rest,
      heating_type: heating_type?.toString(),
      property_features: property_features?.toString(),
      additional_property_features: additional_property_features?.toString(),
      winter_temperature: getWinterTemperature(winter_temperature),
      significant_land,
      ...(significant_land === "Yes" ? { land_details: land_details?.trim() } : {}),
      zero_carbon_energy_tariff,
    };

    // Electricity
    if (zero_carbon_energy_tariff === "No" && heating_type?.includes("Electricity")) {
      filteredValues.electricity_usage_known = electricity_usage_known;

      if (electricity_usage_known !== "No") {
        filteredValues.electricity_usage_amount = electricity_usage_amount?.trim();
        filteredValues.electricity_usage_unit = electricity_usage_unit;

        if (electricity_usage_unit === "Billed per year") {
          filteredValues.electricity_usage_amount_currency = electricity_usage_amount_currency;
        }
      }

      if (electricity_usage_known === "Yes, for part of the year") {
        filteredValues.electricity_usage_time_period = electricity_usage_time_period?.trim();
      }

      if (electricity_usage_known === "No") {
        filteredValues.electricity_annual_spend = electricity_annual_spend;

        if (electricity_annual_spend === "Yes") {
          filteredValues.electricity_annual_amount = electricity_annual_amount?.trim();
          filteredValues.electricity_annual_unit = electricity_annual_unit;
        }
      }

      filteredValues.electricity_supplier = electricity_supplier?.trim();
      filteredValues.on_site_renewable_energy = on_site_renewable_energy;

      if (on_site_renewable_energy !== "No") {
        filteredValues.on_site_renewable_amount = on_site_renewable_amount?.trim();
        filteredValues.on_site_renewable_unit = on_site_renewable_unit;
      }
    }

    // Gas
    if (heating_type?.includes("Gas")) {
      filteredValues.natural_gas_usage_known = natural_gas_usage_known;

      if (natural_gas_usage_known !== "No") {
        filteredValues.natural_gas_usage_amount = natural_gas_usage_amount?.trim();
        filteredValues.natural_gas_usage_unit = natural_gas_usage_unit;
      }

      if (natural_gas_usage_known === "Yes, for part of the year") {
        filteredValues.natural_gas_usage_time_period = natural_gas_usage_time_period?.trim();
      }

      if (natural_gas_usage_known === "No" && natural_gas_annual_spend !== "No") {
        filteredValues.natural_gas_annual_spend = natural_gas_annual_spend;

        if (natural_gas_annual_spend === "Yes") {
          filteredValues.natural_gas_annual_amount = natural_gas_annual_amount?.trim();
          filteredValues.natural_gas_annual_unit = natural_gas_annual_unit;
        }
      }

      filteredValues.gas_consumption_offset = gas_consumption_offset;
    }

    // Oil
    if (heating_type?.includes("Oil")) {
      filteredValues.oil_usage_known = oil_usage_known;

      if (oil_usage_known !== "No") {
        filteredValues.oil_usage_amount = oil_usage_amount?.trim();
        filteredValues.oil_usage_unit = oil_usage_unit;
      }

      if (oil_usage_known === "No") {
        filteredValues.oil_annual_spend = oil_annual_spend;

        if (oil_annual_spend === "Yes") {
          filteredValues.oil_annual_amount = oil_annual_amount?.trim();
          filteredValues.oil_annual_unit = oil_annual_unit;
        }
      }
    }

    // Wood
    if (heating_type?.includes("Wood")) {
      filteredValues.wood_usage_known = wood_usage_known;

      if (wood_usage_known !== "No") {
        filteredValues.wood_usage_amount = wood_usage_amount?.trim();
        filteredValues.wood_usage_unit = wood_usage_unit;
      }

      if (wood_usage_known === "No") {
        filteredValues.wood_annual_spend = wood_annual_spend;

        if (wood_annual_spend === "Yes") {
          filteredValues.wood_annual_amount = wood_annual_amount?.trim();
          filteredValues.wood_annual_unit = wood_annual_unit;
        }
      }
    }

    // District heating
    if (heating_type?.includes("District heating")) {
      filteredValues.coal_usage_known = coal_usage_known;

      if (coal_usage_known !== "No") {
        filteredValues.coal_usage_amount = coal_usage_amount?.trim();
        filteredValues.coal_usage_unit = coal_usage_unit;
      }

      if (coal_usage_known === "No") {
        filteredValues.coal_annual_spend = coal_annual_spend;

        if (coal_annual_spend === "Yes") {
          filteredValues.coal_annual_amount = coal_annual_amount?.trim();
          filteredValues.coal_annual_unit = coal_annual_unit;
        }
      }
    }

    // Other
    if (heating_type?.includes("District heating") || heating_type?.includes("Oil") || heating_type?.includes("Wood")) {
      filteredValues.other_energy_usage = other_energy_usage;

      if (other_energy_usage !== "No") {
        filteredValues.other_energy_which_and_amount = other_energy_which_and_amount?.trim();
      }
    }
    return filteredValues;
  };

  export default validateAndFilterFields