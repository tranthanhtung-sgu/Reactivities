import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
            {activity.isCancelled && (
              <Label attached="top" color="red" size='medium' content="Cancelled" style={{ textAlign: "center" }} />
            )}
          <Item>
            <Item.Image style={{marginBottom: 3}} size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by {activity.host?.username}</Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange" content="You are hosting this activity" />
                </Item.Description>
              )}
              {!activity.isHost && activity.isGoing && (
                <Item.Description>
                  <Label basic color="green" content="You are going this activity" />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(activity.date!, "dd MMM yyyy")}
        </span>
        <span>
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="teal" />
      </Segment>
    </Segment.Group>
  );
}
