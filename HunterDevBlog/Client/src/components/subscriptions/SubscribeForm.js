import * as React from 'react'
import { func } from 'prop-types'
import { Button } from 'react-bootstrap'
import { Form, withFormik } from 'formik'
import * as Yup from 'yup'
import { Textbox } from '../shared/FormikFields'
import { connect } from 'react-redux'
import { Subscribe } from '../../store/modules/users/users.actions';
import './SubscribeForm.css'

SubscribeForm.displayName = 'Subscribe Form'

SubscribeForm.propTypes = {
    Subscribe: func.isRequired
}

const mapDispatchToProps = {
    Subscribe
}

function SubscribeForm({ errors, touched, dirty, isSubmitting, isValid }) {
    return (
        <div className="subscribe-form">
            <h1>Subscribe</h1>
            <p>Stay up to date!<br />Get all the latest & greatest posts delivered straight to your inbox.</p>
            <Form>
                <Textbox
                    name="EmailAddress"
                    placeholder="EMAIL ADDRESS..."
                    errors={{
                        error: errors.EmailAddress,
                        touched: touched.EmailAddress
                    }}
                />
                <Button
                    block
                    bsStyle="primary"
                    className="cs-btn"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {'Subscribe'}
                </Button>
            </Form>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(
    withFormik({
        mapPropsToValues: () => ({
            EmailAddress: ''
        }),
        validationSchema: Yup.object().shape({
            EmailAddress: Yup.string().email('Invalid Email').required('Required')
        }),
        handleSubmit: (values, bag) => bag.props.Subscribe(values.EmailAddress, bag)
    })(SubscribeForm)
)