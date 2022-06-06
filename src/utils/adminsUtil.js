const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateText = (text) => {
    return text !== '' && text.length >= 2;
}

const ValidateRole = (role) => {
    return role !== '' && (role.toLowerCase() === "admin" || role.toLowerCase() === "member");
}

export {validateEmail, validateText, ValidateRole};