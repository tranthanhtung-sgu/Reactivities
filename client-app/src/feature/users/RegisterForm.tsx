import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationsError from "../errors/ValidationError";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ displayName: "", username: "", email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => {
          setErrors({ error }); 
          console.log(error);
        })
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required("Name cannot be empty"),
        username: Yup.string().required("Username cannot be empty"),
        email: Yup.string().required("Email cannot be empty").email("Invalid Email address"),
        password: Yup.string().required("Password cannot be empty"),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header content="Sign up to Facebook" as="h2" color="teal" textAlign="center" />
          <MyTextInput name="displayName" placeholder="Display name" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationsError  errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            content="Register"
            type="submit"
            positive
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
