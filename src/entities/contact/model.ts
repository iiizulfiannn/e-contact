/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, Contact, RootState, useAppSelector } from 'shared';

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

type ContactState = {
  listContact: Contact[];
  selectedContact: Contact;
  statusList: Status;
  statusDetail: Status;
  statusAdd: Status;
  statusUpdate: Status;
  statusDelete: Status;
  errorList: string | null;
  errorDetail: string | null;
  errorAdd: string | null;
  errorUpdate: string | null;
  errorDelete: string | null;
};

export const initialState = {
  listContact: [],
  selectedContact: {} as Contact,
  statusList: 'idle',
  statusDetail: 'idle',
  statusAdd: 'idle',
  statusUpdate: 'idle',
  statusDelete: 'idle',
  errorList: null,
  errorDetail: null,
  errorAdd: null,
  errorUpdate: null,
  errorDelete: null,
} as ContactState;

const getAllContact = createAsyncThunk('contact/getAllContact', async () => {
  const response = await API.contact.getAllContact();
  return response.data;
});

const getContactById = createAsyncThunk(
  'contact/getContactById',
  async (id: string) => {
    const response = await API.contact.getContactById(id);
    return response.data;
  },
);

const saveContact = createAsyncThunk(
  'contact/saveContact',
  async (body: Contact) => {
    const response = await API.contact.saveContact(body);
    return response.status;
  },
);

const editContact = createAsyncThunk(
  'contact/editContact',
  async ({ id, body }: { id: string; body: Contact }) => {
    const response = await API.contact.editContact({ id, body });
    return response.status;
  },
);

const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (id: string) => {
    const response = await API.contact.deleteContact(id);
    return response.status;
  },
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetAddStatus: state => {
      state.statusAdd = 'idle';
      state.errorAdd = null;
    },
    resetUpdateStatus: state => {
      state.statusUpdate = 'idle';
      state.errorUpdate = null;
    },
    resetDeleteStatus: state => {
      state.statusDelete = 'idle';
      state.errorDelete = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllContact.pending, state => {
        state.statusList = 'pending';
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.statusList = 'succeeded';
        state.listContact = action.payload.data;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.statusList = 'failed';
        state.errorList = action.error.message || 'An error occurred';
      })
      .addCase(getContactById.pending, state => {
        state.statusDetail = 'pending';
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.statusDetail = 'succeeded';
        state.selectedContact = action.payload.data;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.statusDetail = 'failed';
        state.errorDetail = action.error.message || 'An error occurred';
      })
      .addCase(saveContact.pending, state => {
        state.statusAdd = 'pending';
      })
      .addCase(saveContact.fulfilled, state => {
        state.statusAdd = 'succeeded';
      })
      .addCase(saveContact.rejected, (state, action) => {
        state.statusAdd = 'failed';
        console.log('saveContact ', JSON.stringify(action));
        state.errorAdd = action.error.message || 'An error occurred';
      })
      .addCase(editContact.pending, state => {
        state.statusUpdate = 'pending';
      })
      .addCase(editContact.fulfilled, state => {
        state.statusUpdate = 'succeeded';
      })
      .addCase(editContact.rejected, (state, action) => {
        state.statusUpdate = 'failed';
        state.errorUpdate = action.error.message || 'An error occurred';
      })
      .addCase(deleteContact.pending, state => {
        state.statusDelete = 'pending';
      })
      .addCase(deleteContact.fulfilled, state => {
        state.statusDelete = 'succeeded';
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.statusDelete = 'failed';
        state.errorDelete = action.error.message || 'An error occurred';
      });
  },
});

const getListContact = () =>
  useAppSelector((state: RootState) => state.contact.listContact);
const getSelectedContact = () =>
  useAppSelector(state => state.contact.selectedContact);
const getStatusList = () => useAppSelector(state => state.contact.statusList);
const getStatusDetail = () =>
  useAppSelector(state => state.contact.statusDetail);
const getStatusAdd = () => useAppSelector(state => state.contact.statusAdd);
const getStatusUpdate = () =>
  useAppSelector(state => state.contact.statusUpdate);
const getStatusDelete = () =>
  useAppSelector(state => state.contact.statusDelete);

export const contactModel = {
  ...contactSlice,
  selectors: {
    getListContact,
    getSelectedContact,
    getStatusList,
    getStatusDetail,
    getStatusAdd,
    getStatusUpdate,
    getStatusDelete,
  },
  getAllContact,
  getContactById,
  saveContact,
  editContact,
  deleteContact,
};
