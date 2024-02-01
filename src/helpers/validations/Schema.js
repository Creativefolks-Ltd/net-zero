import * as Yup from 'yup';

//// General Form Validations
const requiredMsg = "This field is required";
const selectOptionMsg = "Please select one option";
const numberAllowMsg = "Only numbers are allowed";

const strongPasswordRegex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(?:[^@$!%*?&]*[@$!%*?&]){1}[^@$!%*?&]*$)[A-Za-z\d@$!%*?&]{6,}$/ ;

export const userFormValidation = Yup.object().shape({
    first_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "First name must be at least 2 characters").max(25, "First name must be at most 25 characters").required("Please enter your first name"),
    last_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "Last name must be at least 2 characters").max(25, "Last name must be at most 25 characters").required("Please enter your last name"),
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter valid email address').required('Please enter your email'),
});
export const createUserFormValidation = Yup.object().shape({
    first_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "First name must be at least 2 characters").max(25, "First name must be at most 25 characters").required("Please enter your first name"),
    last_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "Last name must be at least 2 characters").max(25, "Last name must be at most 25 characters").required("Please enter your last name"),
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter valid email address').required('Please enter your email'),
    password: Yup.string().matches(strongPasswordRegex, "Password must include an uppercase letter, a lowercase letter, a number, and only one special character").required("Please enter your password"),
    cpassword: Yup.string().required("Confirm Password field is required").oneOf([Yup.ref('password'), null], 'Confirm Password not matched')
});

export const changePasswordFormValidation = Yup.object().shape({
    new_password: Yup.string().matches(strongPasswordRegex, "Password must include an uppercase letter, a lowercase letter, a number, and only one special character").required("Please enter your password"),
    reenter_password: Yup.string().required("Confirm Password field is required").oneOf([Yup.ref('new_password'), null], 'Confirm Password not matched'),
    old_password: Yup.string().required("Old Password field is required")
});

export const loginFormValidation = Yup.object().shape({
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter valid email address').required('Please enter your email'),
    password: Yup.string().required("Please enter your password"),
});

export const formvalidation = Yup.object().shape({
    first_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "First name must be at least 2 characters").max(25, "First name must be at most 25 characters").required(requiredMsg),
    last_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "Last name must be at least 2 characters").max(25, "Last name must be at most 25 characters").required(requiredMsg),
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter valid email address').required(requiredMsg),
    emailConfirmation: Yup.string().email().required(requiredMsg).oneOf([Yup.ref('email'), null], 'Email Confirmation must match with email'),
    year_of_birth: Yup.string().required(selectOptionMsg),
    country_of_residence: Yup.string().required(selectOptionMsg),
    num_of_homes: Yup.string().required(selectOptionMsg),
    first_home_country: Yup.string().when('num_of_homes', (value, schema) => {
        return Number(value) >= 1 ? schema.required(selectOptionMsg) : schema;
    }),
    second_home_country: Yup.string().when('num_of_homes', (value, schema) => {
        return Number(value) >= 2 ? schema.required(selectOptionMsg) : schema;
    }),
    third_home_country: Yup.string().when('num_of_homes', (value, schema) => {
        return Number(value) >= 3 ? schema.required(selectOptionMsg) : schema;
    }),
    fourth_home_country: Yup.string().when('num_of_homes', (value, schema) => {
        return Number(value) >= 4 ? schema.required(selectOptionMsg) : schema;
    }),
    fifth_home_country: Yup.string().when('num_of_homes', (value, schema) => {
        return Number(value) >= 5 ? schema.required(selectOptionMsg) : schema;
    }),
    living_with_partner: Yup.string().required(selectOptionMsg),
    num_of_children_under_18: Yup.string().required(requiredMsg),
    other_dependants: Yup.string().required(requiredMsg),
    other_dependants_details: Yup.string().when('other_dependants', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
    }),
})

//// Home Form Validations ////
export const homeFormvalidation = (values) => {
    const errors = {};
    if (!values?.location?.trim()) {
        errors.location = selectOptionMsg
    }
    if (!values?.heating_type || !Array.isArray(values?.heating_type) || values?.heating_type.length === 0) {
        errors.heating_type = requiredMsg;
    }
    if (!values?.zero_carbon_energy_tariff?.trim()) {
        errors.zero_carbon_energy_tariff = selectOptionMsg;
    }

    //// Electricity
    if (values?.zero_carbon_energy_tariff === "No" && values?.heating_type?.includes("Electricity")) {
        if (!values?.electricity_usage_known?.trim()) {
            errors.electricity_usage_known = selectOptionMsg
        }

        if (values?.electricity_usage_known !== "No") {
            if (!values?.electricity_usage_amount?.trim()) {
                errors.electricity_usage_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.electricity_usage_amount)) {
                errors.electricity_usage_amount = numberAllowMsg;
            }

            if (!values?.electricity_usage_unit?.trim()) {
                errors.electricity_usage_unit = selectOptionMsg;
            }
            if (values?.electricity_usage_unit === "Billed per year" && !values?.electricity_usage_amount_currency?.trim()) {
                errors.electricity_usage_amount_currency = requiredMsg;
            }
        }

        if (values?.electricity_usage_known === "Yes, for part of the year" && !values?.electricity_usage_time_period?.trim()) {
            errors.electricity_usage_time_period = requiredMsg;
        }

        if (values?.electricity_usage_known === "No" && !values?.electricity_annual_spend?.trim()) {
            errors.electricity_annual_spend = requiredMsg;
        }

        if (values?.electricity_usage_known === "No" && values?.electricity_annual_spend === "Yes") {
            if (!values?.electricity_annual_amount?.trim()) {
                errors.electricity_annual_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.electricity_annual_amount)) {
                errors.electricity_annual_amount = numberAllowMsg;
            }

            if (!values?.electricity_annual_unit?.trim()) {
                errors.electricity_annual_unit = selectOptionMsg;
            }
        }

        if (!values?.electricity_supplier?.trim()) {
            errors.electricity_supplier = requiredMsg;
        }

        if (!values?.on_site_renewable_energy?.trim()) {
            errors.on_site_renewable_energy = selectOptionMsg;
        }

        if (values?.on_site_renewable_energy !== "No") {
            if (!values?.on_site_renewable_amount?.trim()) {
                errors.on_site_renewable_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.on_site_renewable_amount)) {
                errors.on_site_renewable_amount = numberAllowMsg;
            }

            if (!values?.on_site_renewable_unit?.trim()) {
                errors.on_site_renewable_unit = selectOptionMsg;
            }
        }
    }

    //// Gas
    if (values?.heating_type?.includes("Gas")) {
        if (!values?.natural_gas_usage_known?.trim()) {
            errors.natural_gas_usage_known = selectOptionMsg
        }

        if (values?.natural_gas_usage_known !== "No") {
            if (!values?.natural_gas_usage_amount?.trim()) {
                errors.natural_gas_usage_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.natural_gas_usage_amount)) {
                errors.natural_gas_usage_amount = numberAllowMsg;
            }

            if (!values?.natural_gas_usage_unit?.trim()) {
                errors.natural_gas_usage_unit = selectOptionMsg;
            }
        }

        if (values?.natural_gas_usage_known === "Yes, for part of the year" && !values?.natural_gas_usage_time_period?.trim()) {
            errors.natural_gas_usage_time_period = requiredMsg;
        }

        if (values?.natural_gas_usage_known === "No" && !values?.natural_gas_annual_spend?.trim()) {
            errors.natural_gas_annual_spend = selectOptionMsg;
        }

        if (values?.natural_gas_usage_known === "No" && values?.natural_gas_annual_spend !== "No") {
            if (!values?.natural_gas_annual_amount?.trim()) {
                errors.natural_gas_annual_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.natural_gas_annual_amount)) {
                errors.natural_gas_annual_amount = numberAllowMsg;
            }

            if (!values?.natural_gas_annual_unit?.trim()) {
                errors.natural_gas_annual_unit = selectOptionMsg;
            }
        }

        if (!values?.gas_consumption_offset?.trim()) {
            errors.gas_consumption_offset = selectOptionMsg;
        }
    }

    //// Oil
    if (values?.heating_type?.includes("Oil")) {
        if (!values?.oil_usage_known?.trim()) {
            errors.oil_usage_known = selectOptionMsg;
        }

        if (values?.oil_usage_known !== "No") {
            if (!values?.oil_usage_amount?.trim()) {
                errors.oil_usage_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.oil_usage_amount)) {
                errors.oil_usage_amount = numberAllowMsg;
            }

            if (!values?.oil_usage_unit?.trim()) {
                errors.oil_usage_unit = selectOptionMsg;
            }
        }

        if (values?.oil_usage_known === "No") {
            if (!values?.oil_annual_spend?.trim()) {
                errors.oil_annual_spend = selectOptionMsg
            }

            if (values?.oil_annual_spend !== "No") {
                if (!values?.oil_annual_amount?.trim()) {
                    errors.oil_annual_amount = requiredMsg;
                } else if (!/^[0-9]+$/.test(values?.oil_annual_amount)) {
                    errors.oil_annual_amount = numberAllowMsg;
                }
                if (!values?.oil_annual_unit?.trim()) {
                    errors.oil_annual_unit = selectOptionMsg;
                }
            }
        }
    }

    //// Wood
    if (values?.heating_type?.includes("Wood")) {
        if (!values?.wood_usage_known?.trim()) {
            errors.wood_usage_known = selectOptionMsg;
        }

        if (values?.wood_usage_known !== "No") {
            if (!values?.wood_usage_amount?.trim()) {
                errors.wood_usage_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.wood_usage_amount)) {
                errors.wood_usage_amount = numberAllowMsg;
            }

            if (!values?.wood_usage_unit?.trim()) {
                errors.wood_usage_unit = selectOptionMsg;
            }
        }

        if (values?.wood_usage_known === "No") {
            if (!values?.wood_annual_spend?.trim()) {
                errors.wood_annual_spend = selectOptionMsg
            }

            if (values?.wood_annual_spend !== "No") {
                if (!values?.wood_annual_amount?.trim()) {
                    errors.wood_annual_amount = requiredMsg;
                } else if (!/^[0-9]+$/.test(values?.wood_annual_amount)) {
                    errors.wood_annual_amount = numberAllowMsg;
                }

                if (!values?.wood_annual_unit?.trim()) {
                    errors.wood_annual_unit = selectOptionMsg;
                }
            }
        }
    }

    //// Coal
    if (values?.heating_type?.includes("Coal")) {
        if (!values?.coal_usage_known?.trim()) {
            errors.coal_usage_known = selectOptionMsg;
        }

        if (values?.coal_usage_known !== "No") {
            if (!values?.coal_usage_amount?.trim()) {
                errors.coal_usage_amount = requiredMsg;
            } else if (!/^[0-9]+$/.test(values?.coal_usage_amount)) {
                errors.coal_usage_amount = numberAllowMsg;
            }

            if (!values?.coal_usage_unit?.trim()) {
                errors.coal_usage_unit = selectOptionMsg;
            }
        }

        if (values?.coal_usage_known === "No") {
            if (!values?.coal_annual_spend?.trim()) {
                errors.coal_annual_spend = selectOptionMsg
            }
            if (values?.coal_annual_spend !== "No") {
                if (!values?.coal_annual_amount?.trim()) {
                    errors.coal_annual_amount = requiredMsg;
                } else if (!/^[0-9]+$/.test(values?.coal_annual_amount)) {
                    errors.coal_annual_amount = numberAllowMsg;
                }

                if (!values?.coal_annual_unit?.trim()) {
                    errors.coal_annual_unit = selectOptionMsg;
                }
            }
        }
    }

    //// Other
    if (values?.heating_type?.includes("Coal") || values?.heating_type?.includes("Oil") || values?.heating_type?.includes("Wood")) {
        if (!values?.other_energy_usage?.trim()) {
            errors.other_energy_usage = selectOptionMsg;
        }
        if (values?.other_energy_usage !== "No" && !values?.other_energy_which_and_amount?.trim()) {
            errors.other_energy_which_and_amount = requiredMsg;
        }
    }
    console.log(errors, "///////errors")
    return errors;
}

// export const homeFormvalidation = Yup.object().shape({
// location: Yup.string().required(selectOptionMsg),
// heating_type: Yup.array().required(requiredMsg),
// zero_carbon_energy_tariff: Yup.string().required(requiredMsg),

//// Electricity
// electricity_usage_known: Yup.string().required(selectOptionMsg),

// // If  electricity_usage_known !== "No" 
// electricity_usage_amount: Yup.string().when('electricity_usage_known', (value, schema) => {
//     return value?.toString() !== null && value?.toString() !== "No" ? schema.required(requiredMsg).nullable().matches(/^[0-9]+$/, numberAllowMsg) : schema;
// }),
// electricity_usage_unit: Yup.string().when('electricity_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  electricity_usage_known === "Yes, for part of the year" 
// electricity_usage_time_period: Yup.string().when('electricity_usage_known', (value, schema) => {
//     return value?.toString() === "Yes, for part of the year" ? schema.required(requiredMsg) : schema;
// }),

// // If  electricity_usage_known === "No" 
// electricity_annual_spend: Yup.string().when('electricity_usage_known', (value, schema) => {
//     return value?.toString() === "No" ? schema.required(requiredMsg) : schema;
// }),

// // If  electricity_annual_spend !== "No" 
// electricity_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('electricity_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
// }),
// electricity_annual_unit: Yup.string().when('electricity_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
// }),

// electricity_supplier: Yup.string().required(requiredMsg),

// // onSite
// on_site_renewable_energy: Yup.string().required(selectOptionMsg),

// // If on_site_renewable_energy !== "No"
// on_site_renewable_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('on_site_renewable_energy', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
// }),
// on_site_renewable_unit: Yup.string().when('on_site_renewable_energy', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
// }),


// //// Gas
// natural_gas_usage_known: Yup.string().required(selectOptionMsg),
// // If  natural_gas_usage_known !== "No" 
// natural_gas_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('natural_gas_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
// }),
// natural_gas_usage_unit: Yup.string().when('natural_gas_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  natural_gas_usage_known === "Yes, for part of the year" 
// natural_gas_usage_time_period: Yup.string().when('natural_gas_usage_known', (value, schema) => {
//     return value?.toString() === "Yes, for part of the year" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  natural_gas_usage_known === "No" 
// natural_gas_annual_spend: Yup.string().when('natural_gas_usage_known', (value, schema) => {
//     return value?.toString() === "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  natural_gas_annual_spend !== "No" 
// natural_gas_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('natural_gas_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
// }),
// natural_gas_annual_unit: Yup.string().when('natural_gas_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
// }),

// gas_consumption_offset: Yup.string().required(selectOptionMsg),


// //// Oil
// oil_usage_known: Yup.string().required(selectOptionMsg),
// // If  oil_usage_known !== "No" 
// oil_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('oil_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
// }),
// oil_usage_unit: Yup.string().when('oil_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  oil_usage_known === "No" 
// oil_annual_spend: Yup.string().when('oil_usage_known', (value, schema) => {
//     return value?.toString() === "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  oil_annual_spend !== "No" 
// oil_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('oil_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
// }),
// oil_annual_unit: Yup.string().when('oil_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
// }),


// // Wood
// wood_usage_known: Yup.string().required(selectOptionMsg),
// // If  wood_usage_known !== "No" 
// wood_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('wood_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
// }),
// wood_usage_unit: Yup.string().when('wood_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  wood_usage_known === "No" 
// wood_annual_spend: Yup.string().when('wood_usage_known', (value, schema) => {
//     return value?.toString() === "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  wood_annual_spend !== "No" 
// wood_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('wood_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
// }),
// wood_annual_unit: Yup.string().when('wood_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
// }),


// // Coal
// coal_usage_known: Yup.string().required(selectOptionMsg),
// // If  coal_usage_known !== "No" 
// coal_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('coal_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
// }),
// coal_usage_unit: Yup.string().when('coal_usage_known', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  coal_usage_known === "No" 
// coal_annual_spend: Yup.string().when('coal_usage_known', (value, schema) => {
//     return value.toString() === "No" ? schema.required(selectOptionMsg) : schema;
// }),

// // If  coal_annual_spend !== "No" 
// coal_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('coal_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
// }),
// coal_annual_unit: Yup.string().when('coal_annual_spend', (value, schema) => {
//     return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
// }),


// // Other
// other_energy_usage: Yup.string().required(selectOptionMsg),
// other_energy_which_and_amount: Yup.string().when('other_energy_usage', (value, schema) => {
//     return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
// }),
// })


//// Travel Form Validations
export const travelformvalidation = Yup.object().shape({

    short_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
        }),
    medium_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
        }),
    long_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
        }),
    extended_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
        }),

    partner_children_short_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
        }),
    partner_children_medium_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
        }),
    partner_children_long_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
        }),
    partner_children_extended_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            business: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            firstClass: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
            private: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
        }),

    proportion_offset_flights: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required(requiredMsg),
    how_many_cars: Yup.string().required(selectOptionMsg),
    cars_detail: Yup.array().of(
        Yup.object().shape({
            makeAndModel: Yup.string().required(requiredMsg),
            vehicalType: Yup.string().required(requiredMsg),
            kmsInSelectedYear: Yup.string().required(requiredMsg),
        })
    ),
});

export const foodFormValidation = Yup.object().shape({
    purchased_new_vehicle: Yup.string().required(selectOptionMsg),
    vehicle_detail: Yup.string().when('purchased_new_vehicle', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
})
