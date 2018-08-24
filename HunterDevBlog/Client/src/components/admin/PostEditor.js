import * as React from 'react'
import { object, func } from 'prop-types'
import { Row, Col, Button } from 'react-bootstrap'
import { withFormik, Form } from 'formik'
import { Textbox, ErrorBlock, Checkbox } from '../shared/FormikFields'
import * as Yup from 'yup'
import ImageUploader from '../shared/ImageUploader';
import Preview from '../posts/Preview';

PostEditor.displayName = 'Post Editor'

PostEditor.propTypes = {
    post: object,
    createPost: func.isRequired,
    currentUser: object.isRequired
}

function PostEditor({
    errors,
    touched,
    dirty,
    values,
    setValues,
    currentUser,
    isValid,
    isSubmitting
}) {
    const handleImages = images => setValues({ ...values, Images: images })

    return (
        <Form>
            <Row>
                <Textbox
                    name="Title"
                    label="Title"
                    placeholder="Title..."
                    colWidths={{ sm: 6 }}
                    errors={{
                        error: errors.Title,
                        touched: touched.Title,
                        dirty
                    }}
                    autoFocus
                />
            </Row>
            <Row>
                <Textbox
                    name="Subtitle"
                    label="Subtitle"
                    placeholder="Subtitle..."
                    colWidths={{ sm: 6 }}
                    errors={{
                        error: errors.Subtitle,
                        touched: touched.Subtitle,
                        dirty
                    }}
                />
            </Row>
            <Row>
                <Textbox
                    name="Tag"
                    label="Tag"
                    placeholder="Tag..."
                    colWidths={{ sm: 4 }}
                    errors={{
                        error: errors.Tag,
                        touched: touched.Tag,
                        dirty
                    }}
                />
            </Row>
            <Row>
                <Textbox
                    name="Content"
                    label="HTML Content"
                    placeholder="HTML..."
                    colWidths={{ xs: 12 }}
                    errors={{
                        error: errors.Content,
                        touched: touched.Content,
                        dirty
                    }}
                    component="textarea"
                    rows={10}
                />
            </Row>
            <Row>
                <Checkbox
                    name="Featured"
                    label="Featured"
                    colWidths={{ xs: 12 }}
                    checked={values.Featured}
                />
            </Row>
            <Row>
                <ErrorBlock
                    error={errors.Images}
                    touched={touched.Images}
                    dirty={dirty}
                />
                <ImageUploader
                    id="blogPostImages"
                    handleImages={handleImages}
                    images={values.Images}
                />
            </Row>
            <Button
                type="submit"
                bsStyle="success"
                className="pull-right"
                disabled={isSubmitting || !isValid}
            >
                {'Submit Post'}
            </Button>
            <Row>
                <Col sm={8}>
                    <h2>Preview</h2>
                    <Preview post={{
                        ...values,
                        Preview: values.Content.substring(0, values.Content.indexOf('//preview\\')),
                        CreatedBy: currentUser
                    }} />
                </Col>
            </Row>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: ({ post = {} }) => ({
        Title: post.Title || '',
        Subtitle: post.Subtitle || '',
        Content: post.Content || '',
        Featured: post.Featured || true,
        Tag: post.Tag || '',
        Images: post.Images || []
    }),
    validationSchema: Yup.object().shape({
        Title: Yup.string().required('Required'),
        Subtitle: Yup.string().required('Required'),
        Content: Yup.string().matches(/\/\/preview\\/, 'Missing Preview Marker').required('Required'),
        Tag: Yup.string().matches(/^[a-z ]+$/i, 'Invalid Format').required('Required'),
        Images: Yup.array().min(1, 'Min 1 Image').required('Required')
    }),
    handleSubmit: (values, bag) => {
        bag.props.createPost(values, bag)
    }
})(PostEditor)
