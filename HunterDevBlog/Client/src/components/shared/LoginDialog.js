import * as React from 'react'
import { func, bool } from 'prop-types'
import * as Yup from 'yup'
import { Modal, Button, Row } from 'react-bootstrap'
import { Form, withFormik } from 'formik'
import { Textbox, Checkbox } from './FormikFields'

LoginDialog.propTypes = {
    onHide: func.isRequired,
    show: bool.isRequired,
    login: func.isRequired,
    showRegisterDialog: func.isRequired
}

function LoginDialog({
    errors,
    touched,
    values,
    show,
    onHide,
    isSubmitting,
    isValid,
    status,
    showRegisterDialog,
    dirty
}) {
    return (
        <Modal show={show} onHide={onHide} bsSize="small">
            <Form>
                <Modal.Header>
                    <Modal.Title>
                        {'Login'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {status && status.error &&
                        <div className="text-danger text-bold">
                            {status.error}
                        </div>
                    }
                    <Row>
                        <Textbox
                            label="Username"
                            name="Username"
                            placeholder="Username..."
                            autoFocus
                            colWidths={{ xs: 12 }}
                            errors={{
                                error: errors.Username,
                                touched: touched.Username,
                                dirty
                            }}
                        />
                        <Textbox
                            label="Password"
                            name="Password"
                            type="password"
                            placeholder="Password..."
                            colWidths={{ xs: 12 }}
                            errors={{
                                error: errors.Password,
                                touched: touched.Password,
                                dirty
                            }}
                        />
                        <Checkbox
                            label="Remember Me"
                            name="RememberMe"
                            checked={values.RememberMe}
                            colWidths={{ xs: 12 }}
                        />
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        type="submit"
                        bsStyle="success"
                        disabled={isSubmitting || !isValid}
                    >
                        {'Login'}
                    </Button>
                    <Button onClick={onHide} bsStyle="default">
                        {'Cancel'}
                    </Button>
                    <Button onClick={showRegisterDialog} className="pull-left" bsStyle="warning">
                        {'Register'}
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
        RememberMe: false
    }),
    validationSchema: Yup.object().shape({
        Username: Yup.string().required('Required'),
        Password: Yup.string().required('Required')
    }),
    handleSubmit: (values, bag) => bag.props.login(values, bag)
})(LoginDialog)