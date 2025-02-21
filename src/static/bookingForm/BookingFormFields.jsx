// import {Airlines} from "../Airlines.jsx";
//
// const getFields = (arr, isAirport=false) => {
//     let f = {
//         1: {
//             placeholder: 'Name ',
//             name: 'name',
//             type: 'string',
//             required: true
//         },
//         2: {
//             placeholder: 'Phone (xxx)-xxx-xxxx',
//             name: 'phone',
//             type: 'number',
//             required: true
//         },
//         3: {
//             placeholder: 'Email ',
//             name: 'email',
//             type: 'email',
//         },
//         4: {
//             placeholder: 'How many? ',
//             name: 'howMany',
//             type: 'select',
//             options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
//         },
//         5: {
//             placeholder: 'Pick Up Date',
//             name: 'datePickUp',
//             type: 'dateTimePicker',
//             required: true,
//         },
//         6: {
//             placeholder: 'Airline',
//             name: 'airline',
//             type: 'autocomplete',
//             options: Airlines,
//         },
//         7: {
//             placeholder: 'Flight number',
//             name: 'flightNumber',
//             type: 'string',
//         },
//         8: {
//             placeholder: 'Drop off location ',
//             name: 'dropOffLocation',
//             type: 'string',
//         },
//         9: {
//             placeholder: 'Pick-up location',
//             name: 'pickup',
//             type: 'string',
//         },
//         10: {
//             placeholder: 'How many hours?',
//             name: 'howManyHoursOfService',
//             type: 'select',
//             options: isAirport
//                 ? ['1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6']
//                 : ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6'],
//         },
//         11: {
//             placeholder: 'Chapel',
//             name: 'chapel',
//             type: 'string',
//         }
//     },
//         n = [];
//
//     arr.forEach(item => {n.push(f[item])})
//
//     return n
// }
//
// export const BookingFormFields = [
//     {
//         id: 1,
//         name: 'AIRPORT PICK UP',
//         fields: getFields([1, 2, 3, 4, 5, 6, 7, 8, 10], true),
//     },
//     {
//         id: 2,
//         name: 'WEDDING LUXURY SPRINTER LIMO',
//         fields: getFields([1, 2, 3, 4, 5, 9, 11, 8, 10]),
//     },
//     {
//         id: 3,
//         name: 'SPECIAL EVENTS & HOLIDAYS',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 4,
//         name: 'BACHELORETTE PARTY',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 5,
//         name: 'BACHELOR PARTY',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 6,
//         name: 'EDC',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 7,
//         name: 'NASCAR',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 8,
//         name: 'NASCAR',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 9,
//         name: 'GOLF TOURNAMENT',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 10,
//         name: 'CONCERTS',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 11,
//         name: 'CES',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
//     {
//         id: 12,
//         name: 'FREEMONT EXPERIENCE',
//         fields: getFields([1, 2, 3, 4, 5, 9, 8, 10]),
//     },
// ];
//
// export const Optional = [
//     {
//         placeholder: 'Pick up location',
//         name: 'pickUpLocation',
//         type: 'string',
//     },
//     {
//         placeholder: 'How many?',
//         name: 'howManyReturn',
//         type: 'select',
//         options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
//     },
//     {
//         placeholder: 'Return Date',
//         name: 'datePickUpReturn',
//         type: 'dateTimePicker',
//     },
// ]
//
// /* 702-355-8762 */