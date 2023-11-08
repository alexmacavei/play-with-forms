import { ValueUrl } from './value-url.model';

export const statuses: ValueUrl[] = [{ url: 'active' }, { url: 'draft' }];

export type InternalNotes = Partial<{
  status: ValueUrl;
  notes: { [key: string]: string };
}>;
