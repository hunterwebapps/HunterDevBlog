import * as React from 'react'
import { arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { GetTags } from '../../store/main.reducer';
import AllTagsPresentation from './AllTags.presentation'

AllTags.displayName = 'All Tags Container'

AllTags.propTypes = {
    tags: arrayOf(string).isRequired
}

const mapStateToProps = state => ({
    tags: GetTags(state)
})

function AllTags({ tags }) {
    return <AllTagsPresentation tags={tags} />
}

export default connect(mapStateToProps, {})(AllTags)
