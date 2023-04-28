import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Field, Form, Header, Btn, BtnLabel } from './Searchbar.styled';

const FormSchema = Yup.object().shape({
  keyword: Yup.string().required('Required field!'),
});

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={{
          keyword: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values, actions) => {
          onSubmit({ ...values });
          actions.resetForm();
        }}
      >
        <Form>
          <Btn type="submit">
            <BtnLabel>Search</BtnLabel>
          </Btn>

          <Field name="keyword" placeholder="Search images and photos" />
        </Form>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
