# Tables:

## Cabins

id
name - string
description - string
image - string
maxCapacity - number
regularPrice - number
discount - number

createdAt
updatedAt

## Guests

id
fullname - string
email - string
nationality - string
countryFlag - string
nationalId - string

## Settings

id
minBookingLength - number - default: 3
maxBookingLength - number - default: 90
maxGuestsPerBooking - number - default: 8
breakfastPrice - number - default: 15

## Bookings

id
startDate - Date
endDate - Date
numNights - number
numberGuests - number
cabinPrice - number
extrasPrice - number
totalPrice - number
status - string
hasBreakfast - boolean
isPaid - boolean
observations - string
cabinId - Cabins table - ID
guestId - Guests table - ID
