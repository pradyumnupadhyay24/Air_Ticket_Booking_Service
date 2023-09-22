const { ststusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        messsage='Something went wrong',
        explainantion='Service layer error',
        statusCode=statusCode.INTERNAL_SERVER_ERROR
    ){
        super()
        this.name = 'ServiceError';
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

 module.exports = ServiceError; module.exports = ServiceError;

module.exports = ServiceError;
