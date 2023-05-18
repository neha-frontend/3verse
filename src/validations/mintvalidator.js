import { MAX_TITLE, REQUIRED, MAX_DESC, MIN_COPIES } from '../constants/validationMessages';
import * as Yup from 'yup';

export const proNFTCreateValidation = ({ NFTtype, maxCopies, isAdmin }) => {
  return Yup.object().shape({
    title: Yup.string().required(REQUIRED).max(20, MAX_TITLE),
    description: Yup.string().required(REQUIRED).max(250, MAX_DESC),
    previewImage: Yup.mixed().required(REQUIRED),
    nftType: Yup.string().required(REQUIRED),
    numberOfCopies: isAdmin
      ? Yup.number().required(REQUIRED).min(1, MIN_COPIES)
      : Yup.number()
          .required(REQUIRED)
          .min(1, MIN_COPIES)
          .max(maxCopies, `Maximum copy allowed to mint is ${maxCopies}`),
    ability: Yup.object().shape({
      affinity:
        NFTtype === 'ability' ? Yup.string().required(REQUIRED) : Yup.string().notRequired(),
      abilityType:
        NFTtype === 'ability' ? Yup.string().required(REQUIRED) : Yup.string().notRequired(),
      energyCost:
        NFTtype === 'ability'
          ? Yup.string()
              .required(REQUIRED)
              .test('energy-cost', 'Energy cost should be more than 0', async (value) => value > 0)
          : Yup.string().notRequired()
    }),
    armor: NFTtype === 'armor' ? Yup.string().required(REQUIRED) : Yup.string().notRequired(),
    skin: NFTtype === 'skin' ? Yup.string().required(REQUIRED) : Yup.string().notRequired()
  });
};
