export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    const errorResponse = {
        success: false,
        message,
    };

    // if it's a validation error (we passed .format() into ApiError)
    if (err && typeof err === "object" && err.statusCode === 400) {
        errorResponse.errors = err;
    }

    res.status(statusCode).json(errorResponse);
};
