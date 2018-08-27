import * as React from 'react'
import { } from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { SITE_TITLE, SITE_SLOGAN } from '../constants'
import Featured from './posts/Featured.container'
import FeedContainer from './posts/Feed.container'

import divider from '../images/shape.png'
import Sidebar from './shared/Sidebar'

Home.displayName = 'Home'

function Home() {
    return (
        <Grid>
            <Row>
                <Col xs={12} className="home-text text-center">
                    <h2 style={{ marginTop: '50px' }}>{SITE_TITLE}</h2>
                    <p>{SITE_SLOGAN}</p>
                    <img src={divider} alt="Divider" />
                    <div className="spacer-5"></div>
                    <Featured />
                </Col>
            </Row>
            <Row>
                <Col md={8} lg={9}>
                    <FeedContainer />
                </Col>
                <Col md={4} lg={3}>
                    <Sidebar recentCount={5} />
                </Col>
            </Row>
        </Grid>
    )
}

export default Home
