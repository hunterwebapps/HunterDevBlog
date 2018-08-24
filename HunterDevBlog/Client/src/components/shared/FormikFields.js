import * as React from 'react'
import { Col, FormGroup, ControlLabel } from 'react-bootstrap'
import { Field } from 'formik';

export const Textbox = ({ colWidths, label, placeholder, type, errors, ...rest }) =>
    <Col {...colWidths}>
        <FormGroup>
            {label && <ControlLabel>{label}</ControlLabel>}
            {errors &&
                <ErrorBlock
                    error={errors.error}
                    touched={errors.touched}
                    dirty={errors.dirty}
                />
            }
            <Field
                placeholder={placeholder || label + '...'}
                type={type || 'text'}
                className="form-control"
                {...rest}
            />
        </FormGroup>
    </Col>

export const Checkbox = ({ colWidths, label, ...rest }) =>
    <Col {...colWidths}>
        <FormGroup>
            <ControlLabel>
                <Field
                    type="checkbox"
                    {...rest}
                />
                {` ${label}`}
            </ControlLabel>
        </FormGroup>
    </Col>

export const Radio = ({ colWidths, label, ...rest }) =>
    <Col {...colWidths}>
        <FormGroup>
            <ControlLabel>
                <Field
                    type="radio"
                    {...rest}
                />
                {` ${label}`}
            </ControlLabel>
        </FormGroup>
    </Col>

export const Select = ({ colWidths, label, children, errors, ...rest }) =>
    <Col {...colWidths}>
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            {errors &&
                <ErrorBlock
                    error={errors.error}
                    touched={errors.touched}
                    dirty={errors.dirty}
                />
            }
            <Field
                className="form-control"
                component="select"
                {...rest}
            >
                {children}
            </Field>
        </FormGroup>
    </Col>

export const ErrorBlock = ({ error, touched, dirty }) =>
    ((dirty === undefined || dirty)

        && touched && error &&

        <span className="form-error text-danger text-bold">{' ' + error}</span>) || <span />