import { StartEdit } from 'shared';
import * as yup from 'yup';

const editStartPayload = yup.object().shape<Record<keyof StartEdit, yup.AnySchema>>({
  quoteId: yup.string().required(),
  signum: yup.string().required()
});

export const editingUserSchema = {
  editStartPayload
};
