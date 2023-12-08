import * as Yup from 'yup';
export const signUpSchema = Yup.object({
    // name:Yup.string().min().max(25).required("Please enter your  first name"),
    fname:Yup.string().min(2).max(25).required("Please enter your first name"),
    lname:Yup.string().min(2).max(25).required("Please enter your last name"),
    email:Yup.string().email().required("Please enter your email"),
    confirm_email:Yup.string().email().required().oneOf([Yup.ref("confirm_email"),null],"email must match"),
    password:Yup.string().min(6).required("Please enter your password"),
    confirm_password:Yup.string().required().oneOf([Yup.ref("password"),null],"Password must match"),
    year:Yup.string().required("Please enter the date year"),
    selectedCountry:Yup.string().required("Please select the residence"),
    homes:Yup.string().required("Please select the no. of home"),
    no_of_child:Yup.string().required("This field is required"),
    input_9:Yup.string().required("This field is required"),
    textarea:Yup.string().required("This textarea is required"),

}) 