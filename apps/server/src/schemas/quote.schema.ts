import { QuoteUpdateInput } from 'shared';
import * as yup from 'yup';

const editInput = yup.object().shape<Record<keyof QuoteUpdateInput, yup.AnySchema>>({
  description: yup.string().required()
});

export const quoteSchema = {
  editInput
};
