import React from 'react';

const NewsItem =(props)=> {
  
    let { title, description, imageurl, newsurl, author, date, source } = props
    return (
      <div>
        <div className="card m-3">
          <div  style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className="badge rounded-pill bg-danger" >{source}<span className="visually-hidden">News Source</span>
            </span>
          </div>
          {/* style={{width: "18rem"}} */}
          <img src={imageurl} style={{ height: "250px" }} className="card-img-top" alt="..." />
          <div className="card-body">

            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small>{!author ? "Unknown" : author} - <strong>{new Date(date).toGMTString()}</strong> </small></p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
