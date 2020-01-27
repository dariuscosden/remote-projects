// external dependencies
//
import { schema } from 'normalizr';

export const projectSchema = new schema.Entity('projects');
export const companySchema = new schema.Entity('companies');
export const tagSchema = new schema.Entity('tags');

// company to project
projectSchema.define({ company: companySchema, tags: [tagSchema] });
