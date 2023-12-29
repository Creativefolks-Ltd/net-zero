import * as Yup from 'yup';

//// General Form Validations
const requiredMsg = "This field is required";
const selectOptionMsg = "Please select one option";
const numberAllowMsg = "Only numbers are allowed";

export const formvalidation = Yup.object().shape({
    first_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "First name must be at least 2 characters").max(25, "First name must be at most 25 characters").required("Please enter your first name"),
    last_name: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(2, "Last name must be at least 2 characters").max(25, "Last name must be at most 25 characters").required("Please enter your last name"),
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter valid email address').required('Please enter your email'),
    emailConfirmation: Yup.string().email().required('Email Confirmation is required').oneOf([Yup.ref('email'), null], 'Email Confirmation must match with email'),
    password: Yup.string().min(6).required("Please enter your password"),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Confirm password must match with password"),
    year_of_birth: Yup.string().required("Please enter your birth year"),
    country_of_residence: Yup.string().required("Please enter your residence country'name"),
    num_of_homes: Yup.string().required("Please select number of your homes"),
    first_home_country: Yup.string().required("Please select your first home country'name"),
    second_home_country: Yup.string().required("Please select your second home country'name"),
    third_home_country: Yup.string().required("Please select your third home country'name"),
    fourth_home_country: Yup.string().required("Please select your fourth home country'name"),
    fifth_home_country: Yup.string().required("Please select your fifth home country'name"),
    living_with_partner: Yup.string().required("Please select one option"),
    num_of_children_under_18: Yup.string().required("This field is required"),
    other_dependants: Yup.string().required("This field is required"),
    other_dependants_details: Yup.string().required("This field is required"),
    forest_or_farmland_details: Yup.string().min(5, "Min length must be atleast 5 character").max(1000, "Max length must be 1000 character"),
})

//// Home Form Validations ////
export const homeFormvalidation = Yup.object().shape({
    location: Yup.string().required(selectOptionMsg),
    heating_type: Yup.array().required(requiredMsg),
    zero_carbon_energy_tariff: Yup.string().required(requiredMsg),

    //// Electricity
    electricity_usage_known: Yup.string().required(selectOptionMsg),

    // If  electricity_usage_known !== "No" 
    electricity_usage_amount: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).when('electricity_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
    electricity_usage_unit: Yup.string().when('electricity_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  electricity_usage_known === "Yes, for part of the year" 
    electricity_usage_time_period: Yup.string().when('electricity_usage_known', (value, schema) => {
        return value?.toString() === "Yes, for part of the year" ? schema.required(requiredMsg) : schema;
    }),

    // If  electricity_usage_known === "No" 
    electricity_annual_spend: Yup.string().when('electricity_usage_known', (value, schema) => {
        return value?.toString() === "No" ? schema.required(requiredMsg) : schema;
    }),

    // If  electricity_annual_spend !== "No" 
    electricity_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('electricity_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
    }),
    electricity_annual_unit: Yup.string().when('electricity_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
    }),

    electricity_supplier: Yup.string().required(requiredMsg),

    // onSite
    on_site_renewable_energy: Yup.string().required(selectOptionMsg),

    // If on_site_renewable_energy !== "No"
    on_site_renewable_amount: Yup.string().matches(/^[0-9]+$/, numberAllowMsg).when('on_site_renewable_energy', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
    on_site_renewable_unit: Yup.string().when('on_site_renewable_energy', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),


    //// Gas
    natural_gas_usage_known: Yup.string().required(selectOptionMsg),
    // If  natural_gas_usage_known !== "No" 
    natural_gas_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('natural_gas_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
    natural_gas_usage_unit: Yup.string().when('natural_gas_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  natural_gas_usage_known === "Yes, for part of the year" 
    natural_gas_usage_time_period: Yup.string().when('natural_gas_usage_known', (value, schema) => {
        return value?.toString() === "Yes, for part of the year" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  natural_gas_usage_known === "No" 
    natural_gas_annual_spend: Yup.string().when('natural_gas_usage_known', (value, schema) => {
        return value?.toString() === "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  natural_gas_annual_spend !== "No" 
    natural_gas_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('natural_gas_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
    }),
    natural_gas_annual_unit: Yup.string().when('natural_gas_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
    }),

    gas_consumption_offset: Yup.string().required(selectOptionMsg),


    //// Oil
    oil_usage_known: Yup.string().required(selectOptionMsg),
    // If  oil_usage_known !== "No" 
    oil_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('oil_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
    oil_usage_unit: Yup.string().when('oil_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  oil_usage_known === "No" 
    oil_annual_spend: Yup.string().when('oil_usage_known', (value, schema) => {
        return value?.toString() === "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  oil_annual_spend !== "No" 
    oil_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('oil_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
    }),
    oil_annual_unit: Yup.string().when('oil_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
    }),


    // Wood
    wood_usage_known: Yup.string().required(selectOptionMsg),
    // If  wood_usage_known !== "No" 
    wood_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('wood_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
    wood_usage_unit: Yup.string().when('wood_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  wood_usage_known === "No" 
    wood_annual_spend: Yup.string().when('wood_usage_known', (value, schema) => {
        return value?.toString() === "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  wood_annual_spend !== "No" 
    wood_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('wood_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
    }),
    wood_annual_unit: Yup.string().when('wood_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
    }),


    // Coal
    coal_usage_known: Yup.string().required(selectOptionMsg),
    // If  coal_usage_known !== "No" 
    coal_usage_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('coal_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(requiredMsg) : schema;
    }),
    coal_usage_unit: Yup.string().when('coal_usage_known', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  coal_usage_known === "No" 
    coal_annual_spend: Yup.string().when('coal_usage_known', (value, schema) => {
        return value.toString() === "No" ? schema.required(selectOptionMsg) : schema;
    }),

    // If  coal_annual_spend !== "No" 
    coal_annual_amount: Yup.string().nullable().matches(/^[0-9]+$/, numberAllowMsg).when('coal_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(requiredMsg) : schema;
    }),
    coal_annual_unit: Yup.string().when('coal_annual_spend', (value, schema) => {
        return value?.toString() === "Yes" ? schema.required(selectOptionMsg) : schema;
    }),


    // Other
    other_energy_usage: Yup.string().required(selectOptionMsg),
    other_energy_which_and_amount: Yup.string().when('other_energy_usage', (value, schema) => {
        return value?.toString() !== "No" ? schema.required(selectOptionMsg) : schema;
    }),
})

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

   
    // Food Form 
    // vehicle_detail: Yup.string().required(requiredMsg),

});


