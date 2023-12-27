import * as Yup from 'yup'
export const formvalidation = Yup.object().shape({
    // General Form //
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


    // Home Form //
    location: Yup.string().required("This field is required"),
    heating_type: Yup.string().required("This field is required"),
    electricity_usage_known: Yup.string().required("Please select one option"),
    electricity_usage_amount: Yup.number().required('This field is required'),
    electricity_usage_unit: Yup.string().required('Please select one option'),
    electricity_usage_time_period: Yup.string().required('This field is required'),
    electricity_supplier: Yup.string().required('This field is required'),
    on_site_renewable_energy: Yup.string().required("Please select one option"),
    on_site_renewable_amount: Yup.number().required('This field is required'),
    on_site_renewable_unit: Yup.string().required('Please select one option'),
    natural_gas_usage_known: Yup.string().required('Please select one option'),
    natural_gas_usage_amount: Yup.number().required('This field is required'),
    natural_gas_usage_unit: Yup.string().required('Please select one option'),
    natural_gas_usage_time_period: Yup.string().required('This field is required'),
    gas_consumption_offset: Yup.string().required("Please select one option"),
    oil_usage_known: Yup.string().required("Please select one option"),
    oil_usage_amount: Yup.number().required('This field is required'),
    oil_usage_unit: Yup.string().required('Please select one option'),
    wood_usage_known: Yup.string("Please select one option"),
    wood_usage_amount: Yup.number().required('This field is required'),
    wood_usage_unit: Yup.string().required('Please select one option'),
    coal_usage_known: Yup.string().required('Please select one option'),
    coal_usage_unit: Yup.string().required('Please select one option'),
    other_energy_usage: Yup.string().required('Please select one option'),
    other_energy_which_and_amount: Yup.string().required('This field is required'),


    // Travel Form 
    short_flights: Yup.string().required('This field is required'),
    medium_flights: Yup.string().required('This field is required'),
    long_flights: Yup.string().required('This field is required'),
    extended_flights: Yup.string().required('This field is required'),
    proportion_offset_flights: Yup.number().required('This field is required'),
    how_many_cars: Yup.number().required('Please select one option'),
    cars_detail: Yup.string().required('This field is required'),

    // Food Form 
    vehicle_detail: Yup.string().required('This field is required'),

});


