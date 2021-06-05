import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, GridColumn, Image } from "semantic-ui-react";
// import { Card, Container, Grid, GridRow, Header, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/layout/models/profile";

interface Props {
  profile: Profile;
}

function ProfileCard({ profile }: Props) {
  return (
    <>
      <Card style={{ width: 400, borderRadius: 10 }}>
        <Card.Content>
          <Grid columns={2}>
            <GridColumn width="6">
              <Image
                as={Link}
                to={`/profiles/${profile.username}`}
                size="small"
                circular
                src={profile.image || "/assets/user.png"}
              />
            </GridColumn>
            <GridColumn width="10">
              <Card.Description as={"h2"} style={{ marginBottom: 20 }}>
                <Link to={`/profiles/${profile.username}`}>{profile.displayName}</Link>
              </Card.Description>
              <Card.Description style={{ marginBottom: 10 }}>
                <i className="fas fa-user-friends"> </i>&nbsp; &nbsp; Steve wants to add you to the group{" "}
                <strong>best friends</strong>
              </Card.Description>
              <Card.Description>
                <i className="fas fa-user-friends"></i>&nbsp; &nbsp; Steve wants to add you to the group{" "}
                <strong>best friends</strong>
              </Card.Description>
            </GridColumn>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <div className="ui three buttons">
            <Button style={{ width: 100, marginRight: 10, borderRadius: 5 }} color="blue">
              <i className="fab fa-facebook-messenger"></i> Nhắn tin
            </Button>
            <Button
              style={{ width: 150, marginRight: 10, borderRadius: 5, backgroundColor: "#f0f2f5", color: "black" }}
              color="grey"
            >
              <i className="fas fa-user-plus"></i> Thêm bạn bè
            </Button>
            <Button style={{ width: 30, marginRight: 10, borderRadius: 5, backgroundColor: "#f0f2f5", color: "black" }}>
              <i className="fas fa-ellipsis-h"></i>
            </Button>
          </div>
        </Card.Content>
      </Card>
      {/* <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
            <Card.Header>{profile.displayName}</Card.Header>
            <Card.Description>Bio here</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Icon name='user' />
            20 followers
          </Card.Content> */}
    </>
  );
}

export default observer(ProfileCard);
