const checkValidity = (userData) => {
    const check1 = validateUsername(userData.username);
    const check2 = validatePassword(userData.password);

    return { check1, check2 }
}

const validatePassword = (pass) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,@$!%*?&])[A-Za-z\d,@$!%*?&]{8,}$/;

    if (passwordPattern.test(pass)) {
        return true;
    } else {

        const passwordRules = [
            {
                test: (pass) => pass.length >= 8,
                message: 'Password must be 8 characters long'
            },
            {
                test: (pass) => /[A-Z]/.test(pass),
                message: 'Password must have an uppercase alphabet'
            },
            {
                test: (pass) => /[a-z]/.test(pass),
                message: 'Password must have a lowercase alphabet'
            },
            {
                test: (pass) => /\d/.test(pass),
                message: 'Password must have a digit(0-9)'
            },
            {
                test: (pass) => /[,@$?!%&*]/.test(pass),
                message: 'Password must include a special character'
            }
        ]

        const errors = passwordRules
            .filter(rule => !rule.test(pass))
            .map(rule => rule.message);

        return errors;
    }
}

const validateUsername = (name) => {
    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{6,14}$/;

    if (usernamePattern.test(name)) {
        return true;
    }
    return 'Invalid Username';
}

module.exports = checkValidity;