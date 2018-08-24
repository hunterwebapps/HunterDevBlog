import * as React from 'react'
import { func, bool } from 'prop-types'
import * as Yup from 'yup'
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap'
import { Form, Field, withFormik } from 'formik'
import { ErrorBlock } from './FormikFields'

RegisterDialog.propTypes = {
    onHide: func.isRequired,
    show: bool.isRequired,
    register: func.isRequired,
    showLoginDialog: func.isRequired
}

function RegisterDialog({
    errors,
    touched,
    values,
    dirty,
    show,
    isSubmitting,
    onHide,
    status,
    showLoginDialog
}) {
    return (
        <Modal show={show} onHide={onHide} bsSize="small">
            <Form>
                <Modal.Header>
                    <Modal.Title>
                        {'Register'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {status && status.error &&
                        <div className="text-danger text-bold">
                            {status.error}
                        </div>
                    }
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <ControlLabel>Username</ControlLabel>
                                <ErrorBlock
                                    error={errors.Username}
                                    touched={touched.Username}
                                    dirty={dirty}
                                />
                                <Field
                                    type="text"
                                    name="Username"
                                    placeholder="Username..."
                                    className="form-control"
                                    autoFocus
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Email Address</ControlLabel>
                                <ErrorBlock
                                    error={errors.Email}
                                    touched={touched.Email}
                                    dirty={dirty}
                                />
                                <Field
                                    type="email"
                                    name="Email"
                                    placeholder="Email Address..."
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <ErrorBlock
                                    error={errors.Password}
                                    touched={touched.Password}
                                    dirty={dirty}
                                />
                                <Field
                                    type="password"
                                    name="Password"
                                    placeholder="Password..."
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Confirm Password</ControlLabel>
                                <ErrorBlock
                                    error={errors.ConfirmPassword}
                                    touched={touched.ConfirmPassword}
                                    dirty={dirty}
                                />
                                <Field
                                    type="password"
                                    name="ConfirmPassword"
                                    placeholder="Confirm Password..."
                                    className="form-control"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        type="submit"
                        bsStyle="success"
                        disabled={isSubmitting}
                    >
                        {'Register'}
                    </Button>
                    <Button onClick={onHide} bsStyle="default">
                        {'Cancel'}
                    </Button>
                    <Button onClick={showLoginDialog} className="pull-left" bsStyle="warning">
                        {'Login'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        Username: '',
        Password: '',
        ConfirmPassword: '',
        Email: ''
    }),
    validationSchema: Yup.object().shape({
        Username: Yup
            .string()
            .min(6, 'Min 6 Characters')
            .required('Required'),
        Password: Yup
            .string()
            .min(8, 'Min 8 Characters')
            .required('Required'),
        ConfirmPassword: Yup
            .string()
            .oneOf([Yup.ref('Password'), null], 'Passwords Must Match')
            .required(),
        Email: Yup
            .string()
            .email('Invalid Email')
            .required('Required')
    }),
    handleSubmit: (values, bag) => bag.props.register(values, bag)
})(RegisterDialog)