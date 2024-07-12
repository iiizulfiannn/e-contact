import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import { contactModel, initialState } from '../model';
import { Contact } from 'shared';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from 'shared/api/base';
import { AnyAction } from '@reduxjs/toolkit';

const mock = new MockAdapter(apiInstance);

describe('Contact Redux Slice', () => {
  const dummyContact: Contact = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    photo: 'somephoto.jpg',
  };

  const createStore = (initialState: any) =>
    configureStore({
      reducer: {
        contact: contactModel.reducer,
      },
      // middleware: [thunk],
      preloadedState: { contact: initialState },
    });

  it('should handle fulfilled getAllContact', async () => {
    const data = { message: 'success', data: [dummyContact] };
    mock.onGet('/contact').reply(200, data);

    const store = createStore(initialState);
    await store.dispatch(contactModel.getAllContact() as unknown as AnyAction);

    const state = store.getState().contact;
    expect(state.listContact).toEqual(data.data);
    expect(state.statusList).toBe('succeeded');
  });

  it('should handle fulfilled getContactById', async () => {
    const data = { message: 'success', data: dummyContact };
    mock.onGet(`/contact/1`).reply(200, data);

    const store = createStore(initialState);
    await store.dispatch(
      contactModel.getContactById('1') as unknown as AnyAction,
    );

    const state = store.getState().contact;
    expect(state.selectedContact).toEqual(data.data);
    expect(state.statusDetail).toBe('succeeded');
  });

  it('should handle fulfilled saveContact', async () => {
    mock.onPost('/contact').reply(201);

    const store = createStore(initialState);
    await store.dispatch(
      contactModel.saveContact(dummyContact) as unknown as AnyAction,
    );

    const state = store.getState().contact;
    expect(state.statusAdd).toBe('succeeded');
  });

  it('should handle fulfilled editContact', async () => {
    mock.onPut(`/contact/1`).reply(201);

    const store = createStore(initialState);
    await store.dispatch(
      contactModel.editContact({
        id: '1',
        body: dummyContact,
      }) as unknown as AnyAction,
    );

    const state = store.getState().contact;
    expect(state.statusUpdate).toBe('succeeded');
  });

  it('should handle fulfilled deleteContact', async () => {
    mock.onDelete(`/contact/1`).reply(204);

    const store = createStore(initialState);
    await store.dispatch(
      contactModel.deleteContact('1') as unknown as AnyAction,
    );

    const state = store.getState().contact;
    expect(state.statusDelete).toBe('succeeded');
  });
});
