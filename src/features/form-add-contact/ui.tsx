import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Contact, Space, lib } from 'shared';
import * as yup from 'yup';

type FormAddContactProps = {
  initialState?: Contact;
  onSubmit: (data: Contact) => void;
};

const schema = yup.object().shape({
  firstName: yup.string().required('* Required'),
  lastName: yup.string().required('* Required'),
  age: yup
    .number()
    .required('* Required')
    .typeError('* Age must be a number')
    .positive('* Age must be greater than zero'),
  photo: yup
    .string()
    .required('* Required')
    .test('Is right format URL', '* URL image not right', value =>
      lib.isFullURLImage(value),
    ),
});

export const FormAddContact = ({
  initialState,
  onSubmit,
}: FormAddContactProps) => {
  return (
    <Formik<Contact>
      initialValues={
        initialState
          ? { ...initialState }
          : { age: 0, firstName: '', lastName: '', photo: '' }
      }
      validationSchema={schema}
      onSubmit={onSubmit}>
      {({
        handleBlur,
        handleChange,
        values,
        errors,
        touched,
        handleSubmit,
      }) => {
        return (
          <View style={styles.form}>
            <TextInput
              label="First Name"
              placeholder="ex. Zulfian"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              error={errors?.firstName && touched?.firstName ? true : false}
              mode="outlined"
            />
            <HelperText
              type="error"
              visible={errors?.firstName && touched?.firstName ? true : false}>
              {errors.firstName}
            </HelperText>
            <TextInput
              label="Last Name"
              placeholder="ex. Arafat"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              error={errors?.lastName && touched?.lastName ? true : false}
              mode="outlined"
            />
            <HelperText
              type="error"
              visible={errors?.lastName && touched?.lastName ? true : false}>
              {errors.lastName}
            </HelperText>
            <TextInput
              label="Age"
              placeholder="ex. 27"
              value={values.age === 0 ? '' : values.age.toString()}
              keyboardType="number-pad"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              error={errors?.age && touched?.age ? true : false}
              mode="outlined"
            />
            <HelperText
              type="error"
              visible={errors?.age && touched?.age ? true : false}>
              {errors.age}
            </HelperText>
            <TextInput
              label="URL Photo"
              placeholder="ex. https://api.ex.com/Starcrasher.png"
              value={values.photo}
              onChangeText={handleChange('photo')}
              onBlur={handleBlur('photo')}
              error={errors?.photo && touched?.photo ? true : false}
              mode="outlined"
              multiline
              numberOfLines={3}
            />
            <HelperText
              type="error"
              visible={errors?.photo && touched?.photo ? true : false}>
              {errors.photo}
            </HelperText>
            <Space size="sm" />
            <Button
              onPress={() => handleSubmit()}
              mode="contained"
              icon="content-save"
              uppercase>
              {initialState ? 'Update' : 'Save'}
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: { padding: 16 },
});
