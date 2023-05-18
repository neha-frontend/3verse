/* eslint-disable no-constant-condition */
import * as Yup from 'yup';

import {
  MIN_COPIES,
  REQUIRED,
  START_DATE_ERROR
} from '../constants/validationMessages';

export const Validation = (AuctionSelected, numberOfCopies, auctionStartDate) =>
  Yup.object().shape({
    price: Yup.number()
      .required(REQUIRED)
      .typeError('Enter a valid value')
      .positive('Please enter positive value'),
    endDate:
      AuctionSelected &&
      Yup.date()
        .required(REQUIRED)
        .min(auctionStartDate, 'End date cant be before start Date'),
    startDate:
      AuctionSelected &&
      Yup.string()
        .required(REQUIRED)
        .test('not empty', 'Start time cant be empty', function (value) {
          if (!value) {
            return '';
          } else {
            return value;
          }
        })
        .test('start_time_test', START_DATE_ERROR, function (value) {
          if (new Date(new Date().getTime() + 5 * 60000)) {
            return value;
          }
        })
        .test(
          'greater_time_test',
          'Start time must be greater than present time',
          function (value) {
            const datew = new Date(value).getTime();
            const today = new Date().getTime();
            if (datew > today) {
              return value;
            }
          }
        ),
    noOfCopies: Yup.number()
      .required(REQUIRED)
      .min(1, MIN_COPIES)
      .max(numberOfCopies, `Maximum copy allowed is ${numberOfCopies}!`)
  });
