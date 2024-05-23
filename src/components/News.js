import React,{useState,useEffect} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const capitalizeFLetter=(string)=>{
        return (string.charAt(0).toUpperCase() +
            string.slice(1));
    }

    const updatenews = async () => {
       
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(60);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        
        props.setProgress(100);
    }

    useEffect(() => {
        document.title= `${capitalizeFLetter(props.category)} - News Monkey`;
        updatenews();
        // eslint-disable-next-line
    },[]);
    

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`; //to get rid of error and fecthing data twice
        setpage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setloading(false)   
    };


    //https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0c492642670f4490b7d2d899bfc95d7e&page=${state.page}&pageSize=${props.pageSize}
    // handleprevClick = async () => {
    //     setstate({page: state.page - 1})
    //     updatenews()
    // }

    // handlenextClick = async () => {
    //     if (state.page + 1 > Math.ceil(state.totalResults / props.pageSize)) {

    //     }
    //     else {
    //         setstate({page: state.page + 1})
    //        updatenews()
    //     }

    // }

    
        return (
            <>
                <div className="text-center mb-3">
                    <h1 className='mt-5'>News Monkey - Top Headlines for {capitalizeFLetter(props.category)}</h1>
                    {loading && <Spinner />}
                </div>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >

                    <div className="container my-3 ">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url} >
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : "Unknown Title"} description={element.description ? element.description.slice(0, 80) : " "} imageurl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg"}
                                        newsurl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={state.page <= 1} type="button" className="btn btn-dark" onClick={handleprevClick} >&larr; Prev</button>
                    <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handlenextClick}>Next &rarr;</button>
                </div> */}
            </>
        );
    
}
News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9
}
News.propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.string.isRequired
}

export default News;
