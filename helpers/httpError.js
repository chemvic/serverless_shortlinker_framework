const errors={
    400: "Bad request",
    401: "Not authorized",
    404: "Not found",
    409: "Conflict",
    500: "Server error"
};

const HttpError=(status, message= errors[status])=>{
    const error = new Error(message);
    error.status= status;
    return error;
};

module.exports = HttpError;