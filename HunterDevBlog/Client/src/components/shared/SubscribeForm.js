import * as React from 'react'
import { object, func } from 'prop-types'
import { Button, FormGroup, InputGroup } from 'react-bootstrap'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'

SubscribeForm.displayName = 'Subscribe Form'

SubscribeForm.propTypes = {
    Subscribe: func,
    user: object
}

const mapDispatchToProps = {
}

function SubscribeForm({ user = {}, errors, touched, dirty }) {
    if (user.Subscribed) return <span />
    return (
        <Form>
            <FormGroup>
                <InputGroup>
                    {!user.Email &&
                        <Field
                            name="email"
                            placeholder="EMAIL ADDRESS..."
                            type="text"
                            className="form-control"
                            style={{ fontWeight: 'normal' }}
                            errors={{
                                error: errors.email,
                                touched: touched.email,
                                dirty
                            }}
                        />
                    }
                    <InputGroup.Button>
                        <Button
                            type="submit"
                            className="cs-btn"
                            style={{ padding: '6px 10px' }}
                        >
                            {'Subscribe'}
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default connect(null, mapDispatchToProps)(
    withFormik({
        mapPropsToValues: ({ user = {} }) => ({
            email: user.Email || ''
        }),
        isInitialValid: false,
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid Email').required('Required')
        }),
        handleSubmit: (values, bag) => {
            const email = values.email || bag.props.user.Email
            bag.props.Subscribe(email, bag)
        }
    })(SubscribeForm)
)
