import * as Yup from 'yup';

import {
  END_DATE_ERROR,
  MAX_COPIES,
  MIN_COPIES,
  MIN_PRICE,
  POSITIVE_VALUE,
  REQUIRED,
  START_DATE_ERROR,
  TYPE_ERROR
} from '../constants/validationMessages';

export const putOnSaleValidator = (nftType, activeTab, copies, auctionStartDate = '') =>
  Yup.object().shape({
    noOfCopies:
      activeTab === 'fixed' &&
      nftType !== 'g-mech' &&
      Yup.number()
        .required(REQUIRED)
        .min(1, MIN_COPIES)
        .typeError(TYPE_ERROR)
        .positive(POSITIVE_VALUE)
        .test('copy-check', `${MAX_COPIES} ${copies}`, async (value) => value <= copies),
    price:
      activeTab === 'fixed' &&
      Yup.number()
        .required(REQUIRED)
        .typeError(TYPE_ERROR)
        .test('price-check', MIN_PRICE, async (value) => value > 0),
    auctionPrice:
      activeTab === 'auction' &&
      Yup.number()
        .required(REQUIRED)
        .typeError(TYPE_ERROR)
        .test('auctionPrice-check', MIN_PRICE, async (value) => value > 0),
    startDate:
      activeTab === 'auction' &&
      Yup.date()
        .required(REQUIRED)
        // .test('auctionPrice-check', REQUIRED, async (value) => value !== 0)
        .min(new Date(new Date().getTime() + 4 * 60000), START_DATE_ERROR),
    endDate:
      activeTab === 'auction' &&
      Yup.date()
        .required(REQUIRED)
        // .test('auctionPrice-check', REQUIRED, async (value) => value === 0)
        .min(auctionStartDate, END_DATE_ERROR)
  });
