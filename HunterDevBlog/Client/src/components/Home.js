import * as React from 'react'
import { } from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { SITE_TITLE, SITE_SLOGAN } from '../constants'
import Featured from './posts/Featured.container';
import FeedContainer from './posts/Feed.container';

import divider from '../images/shape.png'

Home.displayName = 'Home'

function Home() {
    return (
        <Grid>
            <Row>
                <Col xs={12} className="home-text text-center">
                    <h2 style={{ marginTop: '70px' }}>{SITE_TITLE}</h2>
                    <p>{SITE_SLOGAN}</p>
                    <img src={divider} alt="Divider" />
                    <div className="spacer-8"></div>
                    <Featured />
                </Col>
            </Row>
            <Row>
                <Col sm={8} md={9}>
                    <FeedContainer />
                </Col>
                <Col sm={4} md={3}>

                </Col>
            </Row>
        </Grid>
    )
}

export default Home
