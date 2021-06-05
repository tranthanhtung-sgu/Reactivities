import React from "react";
import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/layout/models/activity";

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {
  return (
    <>
      <Segment textAlign="center" style={{ border: "none" }} attached="top" secondary inverted color="teal">
        {attendees?.length} {attendees?.length === 1 ? "Person" : "People"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees?.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.username}>
              {attendee.username === host?.username && (
                <Label style={{ position: "absolute" }} color="orange" ribbon="right">
                  Host
                </Label>
              )}
              <a style={{float: "left", marginRight: '10px'}} href={`/profiles/${attendee.username}`}>
                <Image size="tiny" src={attendee.image || "/assets/user.png"} />
              </a>
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
