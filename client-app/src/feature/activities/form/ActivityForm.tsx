import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/layout/models/activity";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { loadActivity, createActivity, updateActivity, loading, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    city: "",
    date: null,
    description: "",
    venue: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is requied"),
    category: Yup.string().required("The activity category is requied"),
    city: Yup.string().required("The activity city is requied"),
    date: Yup.string().required("The activity date is requied"),
    description: Yup.string().required("The activity description is requied"),
    venue: Yup.string().required("The activity venue is requied"),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  if (loadingInitial) return <LoadingComponent />;
  return (
    <Segment clearing>
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className={"ui form"} onSubmit={handleSubmit} autoComplete="off">
            <Header content="Actvitiy Details" sub color="teal" />
            <MyTextInput name="title" placeholder="title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button disabled={isSubmitting || !isValid || !dirty} loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to={"/activities"} floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
