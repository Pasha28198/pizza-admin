import React, { useState } from "react";

import axios from 'axios';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container,
  Tooltip
} from 'reactstrap';
import "./style.scss";

/**
 * Password pattern
 * ^	The password string will start this way.
 * (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character.
 * (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character.
 * (?=.*[0-9])	The string must contain at least 1 numeric character.
 * (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict.
 * (?=.{8,})	The string must be eight(8) characters or longer.
 */
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&amp;\*])(?=.{8,})");
const allRequired = "All(*) fields required";
const defaultValues = {
  password: "",
  cp: ""
}

const ChangePassword = ({

}) => {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [values, setValues] = useState(defaultValues);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const isValidPassword = () => {
    if (!values.password) {
      setError(allRequired);
      return;
    } else if (!values.cp) {
      setError(allRequired);
      return;
    }

    if (!strongRegex.test(values.password)) {
      setError("Password must be strong. please check password type");
      return false;
    }

    if (values.password !== values.cp) {
      setError("Password and Confirm password not matched");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value || "";
    setValues({
      ...values,
      [target.name]: value.trim(),
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!isValidPassword()) {
      return;
    }

    setLoader(true);
    const token = localStorage.getItem('accessToken');
    await axios({
      method: 'post',
      url: `https://data.diggiart.com/api/admin/update/password`,
      data: JSON.stringify(values),
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    }).then(({ status, data = {} }) => {
      if (status === 200) {
        setSuccessMsg(data.msg);
        setValues(defaultValues);
        setLoader(false);
        return;
      }

      setLoader(false);
    }).catch(error => {
      let errorMessage = error.message;
      if (error.response && error.response.data) {
        const result = error.response.data || {};
        errorMessage = result.msg;
      }

      setError(errorMessage);
      setLoader(false);
    });
  }

  return (
    <div className="change_password">
      <Container>
        <Row>
          <Col md={{offset: 3, size: 6}} className="col">
            <h2 className="title">Change password</h2>
            <div className="cp_body">
              <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="password">New password<sup>*</sup></Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter new password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cp">Confirm password<sup>*</sup></Label>
                  <Input
                    type="password"
                    name="cp"
                    id="cp"
                    placeholder="Enter confirm password"
                    value={values.cp}
                    onChange={handleChange}
                  />
                </FormGroup>
                <p><span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">Password contains ?</span></p>
                <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle} className="password_pattern_style_tooltip">
                  <ul className="password_pattern_style">
                    <li>It must contain at least 1 lowercase alphabetical character.</li>
                    <li>It must contain at least 1 uppercase alphabetical character.</li>
                    <li>It must contain at least 1 numeric character.</li>
                    <li>It must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict.</li>
                    <li>It must be eight(8) characters or longer.</li>
                  </ul>
                </Tooltip>
                {
                  error &&
                  <Alert color="danger">
                    {error}
                  </Alert>
                }

                {
                  successMsg &&
                  <Alert color="success">
                    {successMsg}
                  </Alert>
                }

                <div className="submit_action">
                  <Button
                    type="submit" color="primary"
                    disabled={isLoading}
                  >
                    {
                      isLoading ?
                        "Loading..."
                        : "Submit"
                    }
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ChangePassword;
