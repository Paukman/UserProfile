import React, { useContext } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Row
} from "reactstrap";
import DatePicker from "react-datepicker";
import { HexColorPicker } from "react-colorful";

import { UserContext } from "./UserProvider";

const UserPage = () => {
  const { user } = useContext(UserContext);
  const {
    userState,
    handleOnBlur,
    handleOnDateChange,
    handleOnColorChange,
    handleOnNameChange,
    updateEditMode,
    undoChanges
  } = user;

  const { currentState: state, editMode, prevStateAvilable } = userState;

  return (
    <div>
      <Jumbotron>
        {userState.isBirthdayToday ? (
          <h1 className="display-3">Happy Birthday!</h1>
        ) : null}
        <Form>
          <FormGroup row className="input-group">
            <Label className="input-group-label" for="name" sm={2} size="lg">
              Name
            </Label>
            <Col sm={10}>
              <Input
                className="input-group-input"
                plaintext={!editMode}
                disabled={!editMode}
                name="name"
                bsSize="lg"
                value={state.name}
                onBlur={() => handleOnBlur()}
                onChange={e => {
                  handleOnNameChange(e.target.value);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="input-group">
            <Label className="input-group-label" for="color" sm={2}>
              Favourite color
            </Label>
            <Col sm={10}>
              {editMode ? (
                <HexColorPicker
                  name="color"
                  color={state.color}
                  onBlur={handleOnBlur}
                  onChange={color => {
                    handleOnColorChange(color);
                  }}
                />
              ) : (
                <Input
                  className="input-group-color"
                  readOnly
                  disabled
                  name="color"
                  bsSize="lg"
                  value={state.color}
                  onChange={() => {}}
                  style={{
                    backgroundColor: state.color,
                    color: state.invertedColor
                  }}
                />
              )}
            </Col>
          </FormGroup>
          <FormGroup row className="input-group">
            <Label className="input-group-label" for="birthday" sm={2}>
              Birthday
            </Label>
            <Col sm={10}>
              {editMode ? (
                <DatePicker
                  className="input-group-input"
                  selected={state.birthday}
                  disabled={!editMode}
                  onBlur={handleOnBlur}
                  onChange={date => handleOnDateChange(date)}
                  dateFormat="MMMM d, yyyy"
                />
              ) : (
                <Input
                  className="input-group-input"
                  readOnly
                  plaintext
                  disabled
                  name="Birthday"
                  bsSize="lg"
                  value={state.formattedBirthday}
                  onChange={() => {}}
                />
              )}
            </Col>
          </FormGroup>
          <FormGroup className="input-group-buttons">
            <Button
              style={{
                backgroundColor: state.color,
                color: state.invertedColor,
                marginRight: "10px"
              }}
              onClick={() => updateEditMode()}
            >
              {!editMode ? "Edit" : "Save changes"}
            </Button>
            {prevStateAvilable && !editMode ? (
              <Button
                style={{
                  backgroundColor: state.color,
                  color: state.invertedColor
                }}
                onClick={() => undoChanges()}
              >
                Undo
              </Button>
            ) : null}
          </FormGroup>
        </Form>
      </Jumbotron>
    </div>
  );
};

export default UserPage;
