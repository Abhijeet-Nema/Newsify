import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, source, time, author, badgeColor} = this.props;   // Object destructing
        // let title  = this.props.title;  
        // let description  = this.props.description;
        return (
            <div>
                <div className="card" style={{ width: "100%" }}>
                    <span style={{position: "absolute",right: "0%", zIndex: "1"}} className={`py-1 badge bg-${badgeColor}`}>
                    {source}
                    </span>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}[...]</p>
                    <p className="card-text"><small className="text-muted">By "{author?author:"Unknown sources"}" on {new Date(time).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
