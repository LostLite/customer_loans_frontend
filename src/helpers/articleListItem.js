import React from 'react'

export default function ArticleListItem(props) {
    return (
        <div className="post card" key={props.id}>
            <div className="card-content">
                <span className="card-title">{props.title}</span>
                <p>
                    {props.body}
                </p>
            </div>
        </div>
    )
}
