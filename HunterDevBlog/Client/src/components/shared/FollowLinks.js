import * as React from 'react'
import './FollowLinks.css'

FollowLinks.displayName = 'Follow Links'

function FollowLinks() {
    return (
        <div className="follow-links">
            <h1>Follow Me</h1>
            <a
                href="https://www.facebook.com/hunterwebapps"
                data-original-title="Facebook"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-facebook"></i>
            </a>
            <a
                href="https://www.twitter.com/hunterwebapps"
                data-original-title="Twitter"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-twitter"></i>
            </a>
            <a
                href="https://github.com/hunterwebapps"
                data-original-title="Github"
                title="Github"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-github"></i>
            </a>
            <a
                href="https://www.linkedin.com/in/hunterwebapps"
                data-original-title="LinkedIn"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-linkedin"></i>
            </a>
        </div>
    )
}

export default FollowLinks
