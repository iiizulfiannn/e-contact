import axios, { AxiosPromise } from 'axios';
import { apiInstance } from './base';

const BASE_URL = '/contact';

export type Contact = {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

const getAllContact = (): AxiosPromise<{
  message: string;
  data: Contact[];
}> => {
  return apiInstance.get(BASE_URL);
};

const getContactById = (
  id: string,
): AxiosPromise<{ message: string; data: Contact }> => {
  return apiInstance.get(`${BASE_URL}/${id}`);
};

const saveContact = (body: Contact) => {
  return apiInstance.post(BASE_URL, { ...body });
};

const editContact = ({ id, body }: { id: string; body: Contact }) => {
  return apiInstance.put(`${BASE_URL}/${id}`, { ...body });
};

const deleteContact = (id: string) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const contact = {
  getAllContact,
  getContactById,
  saveContact,
  editContact,
  deleteContact,
};
