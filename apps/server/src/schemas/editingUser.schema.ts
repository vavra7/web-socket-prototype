import { StartEdit } from 'shared';
import { object, ObjectSchema, string } from 'yup';

const editStartPayload: ObjectSchema<StartEdit> = object({
  quoteId: string().required(),
  signum: string().required()
});

export const editingUserSchema = {
  editStartPayload
};
