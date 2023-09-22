const axios = require('axios');

const { BookingRepository } = require('../repository/index');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const respose = await axios.get(getFlightRequestURL);
            const flightData  = respose .data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats >flightData.seats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats');
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const  bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            console.log(updateFlightRequestURL);
            await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});
            return finalBooking;

            // console.log("from Booking Service " , flight.data.data);
            // return flights.data.data;
        }
             catch(error){
                console.log(error);
             if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                    throw error;
                }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService