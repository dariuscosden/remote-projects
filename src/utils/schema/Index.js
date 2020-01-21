// external dependencies
//
import { schema } from 'normalizr';

export const contractSchema = new schema.Entity('contracts');
export const companySchema = new schema.Entity('companies');
export const tagSchema = new schema.Entity('tags');

// company to contract
contractSchema.define({ company: companySchema, tags: [tagSchema] });
