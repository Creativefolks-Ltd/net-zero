const Validation = (form_element) => {    
    let value = form_element.value;
    let rule = form_element.validations;

    if (!rule.required) {
        return {
            valid: true,
            error_msg: "",
        };
    }

    value = typeof value === "object" ? JSON.stringify(value) : value;
    value = typeof value === "boolean" ? JSON.stringify(value) : value;

    if (rule.required) {
        if (value == null || (typeof value === "string" && value.trim() === "") || (typeof value === "number" && value === "")) {
            return {
                valid: false,
                error_msg: "This field is required!",
            };
        }
    }

    // If filed is email
    if (rule.email) {
        const is_email = value.match(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!is_email) {
            return {
                valid: false,
                error_msg: "Email format is incorrect.",
            };
        }
    }
    if (rule.string) {
        const is_string = /^[A-Za-z]+$/.test(value)
        if (!is_string) {
            return {
                valid: false,
                error_msg: "Please enter string value.",
            };
        }
    }
    if (rule.number) {
        const is_number = /^[0-9]+$/.test(value)
        if (!is_number) {
            return {
                valid: false,
                error_msg: "Please enter numeric value.",
            };
        }
    }
    // Validate min length
    if (rule.min_length) {
        if (value.length < rule.min_length) {
            return {
                valid: false,
                error_msg: "Field length minimum " + rule.min_length + "!",
            };
        }
    }
    // Validate min length
    if (rule.min_length) {
        if (value.length < rule.min_length) {
            return {
                valid: false,
                error_msg: "Field length minimum " + rule.min_length + "!",
            };
        }
    }
    // Validate Phone Number length
    if (rule.phone_length) {
       
        if (value.length > rule.phone_length) {
            return {
                valid: false,
                error_msg: "Field length minimum " + rule.min_length + "!",
                //error_msg: "Invalid phone format. ex: " + form_element.placeholder,
            };
        }
    }

    if (rule.typeahead) {
        if (value === "[]") {
            return {
                valid: false,
                error_msg: "This field is required!",
            };
        }
    }

    return {
        valid: true,
        error_msg: "",
    };
};
export default Validation;