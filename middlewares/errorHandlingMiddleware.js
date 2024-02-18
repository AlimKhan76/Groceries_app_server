const errorHandler = (err, req, res, next) => {
    console.log("Middleware Error Handling Running");
    const errorStatusCode = err.statusCode ? err.statusCode : 500;
    const errorMessage = err.message || 'Something went wrong';
    console.log(errorMessage)
    return res.status(errorStatusCode).
        send({
            message: errorMessage,
        })
}

module.exports = { errorHandler };