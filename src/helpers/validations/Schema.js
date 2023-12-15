import * as Yup from 'yup'
export const formvalidation = Yup.object().shape({
    first_name: Yup.string().min(2).max(25).required("Please enter your first name"),
    last_name: Yup.string().min(2).max(25).required("Please enter your last name"),
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

