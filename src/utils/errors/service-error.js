const { ststusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        messsage='Something went wrong',
        explainantion='Service layer error',
        statusCode=statusCode.INTERNAL_SERVER_ERROR
    ){
        super()
        this.name = 'ServiceError';
        this.mesaage = messages;
        this.explainantion = explainantion;
        this.statusCode = statusCode
    }

 }

 module.exports = ServiceError;

