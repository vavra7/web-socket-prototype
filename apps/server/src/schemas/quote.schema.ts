import { QuoteUpdateInput } from 'shared';
import { object, ObjectSchema, string } from 'yup';

const editInput: ObjectSchema<QuoteUpdateInput> = object({
  description: string().required()
});

export const quoteSchema = {
  editInput
};
