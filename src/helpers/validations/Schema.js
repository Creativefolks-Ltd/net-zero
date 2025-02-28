import * as Yup from 'yup';

//// General Form Validations
const requiredMsg = "This field is required";
const selectOptionMsg = "Please select one option";
const numberAllowMsg = "Only numbers are allowed";

const firstNameMin2CharMsg = "First name must be at least 2 characters";
const firstNameMax25CharMsg = "First name must be at most 25 characters";
const firstNameRequiredMsg = "Please enter your first name";

const lastNameMin2CharMsg = "Last name must be at least 2 characters";
const lastNameMax25CharMsg = "Last name must be at most 25 characters";
const lastNameRequiredMsg = "Please enter your last name";

const emailRequiredMsg = "Please enter your email address";
const emailInvalidMsg = "Please enter valid email address";
const emailConfirmationMsg = "Email Confirmation must match with email";

const passwordRequiredMsg = "Please enter your password";
const passwordMin6CharMsg = "Password must be at least 6 characters";
const passwordInvalidMsg = "Password must include an uppercase letter, a lowercase letter, a number, and a special character";

const confirmPasswordRequiredMsg = "Confirm Password field is required";
const confirmPasswordNotMatchMsg = "Confirm Password not matched";

const oldPasswordRequiredMsg = "Old Password field is required";



const alphabetsAllowMsg = "Only alphabetic characters and hyphens are allowed";

export const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export const nameRegex = /^[A-Za-z-]+$/;

export const numberRegex = /^\d*\.?\d+$/;

export const userFormValidation = Yup.object().shape({
    first_name: Yup.string().matches(nameRegex, alphabetsAllowMsg).min(2, firstNameMin2CharMsg).max(25, firstNameMax25CharMsg).required(firstNameRequiredMsg),
    last_name: Yup.string().matches(nameRegex, alphabetsAllowMsg).min(2, lastNameMin2CharMsg).max(25, lastNameMax25CharMsg).required(lastNameRequiredMsg),
    email: Yup.string().matches(emailRegex, emailInvalidMsg).required(emailRequiredMsg),
});
export const createUserFormValidation = Yup.object().shape({
    first_name: Yup.string().matches(nameRegex, alphabetsAllowMsg).min(2, firstNameMin2CharMsg).max(25, firstNameMax25CharMsg).required(firstNameRequiredMsg),
    last_name: Yup.string().matches(nameRegex, alphabetsAllowMsg).min(2, lastNameMin2CharMsg).max(25, lastNameMax25CharMsg).required(lastNameRequiredMsg),
    email: Yup.string().matches(emailRegex, emailInvalidMsg).required(emailRequiredMsg),
    password: Yup.string().matches(strongPasswordRegex, passwordInvalidMsg).required(passwordRequiredMsg),
    cpassword: Yup.string().required(confirmPasswordRequiredMsg).oneOf([Yup.ref('password'), null], confirmPasswordNotMatchMsg)
});

export const changePasswordFormValidation = Yup.object().shape({
    new_password: Yup.string().matches(strongPasswordRegex, passwordInvalidMsg).required(passwordRequiredMsg),
    reenter_password: Yup.string().required(confirmPasswordRequiredMsg).oneOf([Yup.ref('new_password'), null], confirmPasswordNotMatchMsg),
    old_password: Yup.string().required(oldPasswordRequiredMsg)
});

export const loginFormValidation = Yup.object().shape({
    email: Yup.string().matches(emailRegex, emailInvalidMsg).required(emailRequiredMsg),
    password: Yup.string().required(passwordRequiredMsg),
});

export const formvalidation = Yup.object().shape({
    first_name: Yup.string().matches(nameRegex, alphabetsAllowMsg)
        .min(2, firstNameMin2CharMsg).max(25, firstNameMax25CharMsg).required(requiredMsg),
    last_name: Yup.string().matches(nameRegex, alphabetsAllowMsg).min(2, lastNameMin2CharMsg).max(25, lastNameMax25CharMsg).required(requiredMsg),
    email: Yup.string().matches(emailRegex, emailInvalidMsg).required(requiredMsg),
    emailConfirmation: Yup.string().email().required(requiredMsg).oneOf([Yup.ref('email'), null], emailConfirmationMsg),
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
    // if (values?.zero_carbon_energy_tariff === "No" && values?.heating_type?.includes("Electricity")) {
    if (values?.heating_type?.includes("Electricity")) {
        if (!values?.electricity_usage_known?.trim()) {
            errors.electricity_usage_known = selectOptionMsg
        }

        if (values?.electricity_usage_known !== "No") {
            if (!values?.electricity_usage_amount?.trim()) {
                errors.electricity_usage_amount = requiredMsg;
            } else if (!numberRegex.test(values?.electricity_usage_amount)) {
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
            } else if (!numberRegex.test(values?.electricity_annual_amount)) {
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
            } else if (!numberRegex.test(values?.on_site_renewable_amount)) {
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
            } else if (!numberRegex.test(values?.natural_gas_usage_amount)) {
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
            } else if (!numberRegex.test(values?.natural_gas_annual_amount)) {
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
            } else if (!numberRegex.test(values?.oil_usage_amount)) {
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
                } else if (!numberRegex.test(values?.oil_annual_amount)) {
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
            } else if (!numberRegex.test(values?.wood_usage_amount)) {
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
                } else if (!numberRegex.test(values?.wood_annual_amount)) {
                    errors.wood_annual_amount = numberAllowMsg;
                }

                if (!values?.wood_annual_unit?.trim()) {
                    errors.wood_annual_unit = selectOptionMsg;
                }
            }
        }
    }

    //// Coal
    if (values?.heating_type?.includes("District heating")) {
        if (!values?.coal_usage_known?.trim()) {
            errors.coal_usage_known = selectOptionMsg;
        }

        if (values?.coal_usage_known !== "No") {
            if (!values?.coal_usage_amount?.trim()) {
                errors.coal_usage_amount = requiredMsg;
            } else if (!numberRegex.test(values?.coal_usage_amount)) {
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
                } else if (!numberRegex.test(values?.coal_annual_amount)) {
                    errors.coal_annual_amount = numberAllowMsg;
                }

                if (!values?.coal_annual_unit?.trim()) {
                    errors.coal_annual_unit = selectOptionMsg;
                }
            }
        }
    }

    //// Other
    if (values?.heating_type?.includes("District heating") || values?.heating_type?.includes("Oil") || values?.heating_type?.includes("Wood")) {
        if (!values?.other_energy_usage?.trim()) {
            errors.other_energy_usage = selectOptionMsg;
        }
        if (values?.other_energy_usage !== "No" && !values?.other_energy_which_and_amount?.trim()) {
            errors.other_energy_which_and_amount = requiredMsg;
        }
    }
    return errors;
}

export const travelformvalidation = Yup.object().shape({

    short_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
        }),
    medium_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
        }),
    long_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
        }),
    extended_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).required(requiredMsg),
        }),

    partner_children_short_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
        }),
    partner_children_medium_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
        }),
    partner_children_long_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
        }),
    partner_children_extended_flights:
        Yup.object().shape({
            economy: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            business: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            firstClass: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
            private: Yup.string().matches(/^[0-9]+$/, numberAllowMsg),
        }),

    proportion_offset_flights: Yup.string().matches(numberRegex, numberAllowMsg).required(requiredMsg),
    partner_offset_flights: Yup.string().matches(numberRegex, numberAllowMsg).nullable(),
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
    }).nullable(),
})


export const forgotPasswordValidation = (values) => {
    const errors = {};

    if (!values.email?.trim()) {
        errors.email = emailRequiredMsg;
    } else if (!emailRegex.test(values?.email)) {
        errors.email = emailInvalidMsg;
    }

    return errors;
};

export const resetPasswordValidation = (values) => {
    const errors = {};

    if (!values.password?.trim()) {
        errors.password = passwordRequiredMsg;
    } else if (values.password.length < 6) {
        errors.password = passwordMin6CharMsg;
    } else if (!strongPasswordRegex?.test(values.password)) {
        errors.password = passwordInvalidMsg;
    }

    if (!values.cpassword?.trim()) {
        errors.cpassword = confirmPasswordRequiredMsg;
    } else if (values.password !== values.cpassword) {
        errors.cpassword = confirmPasswordNotMatchMsg;
    }

    return errors;
};