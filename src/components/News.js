import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export default function News(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalise = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        updateNews();
        document.title = "Newsify : " + capitalise(props.category) + " Headlines";
    }, [])

    const fetchData = async () => {
        // console.log(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;
        let data = await fetch(url);
        let result = await data.json();
        setPage(page + 1);
        setArticles(articles.concat(result.articles));
        setTotalResults(result.totalResults)
        // console.log(articles.length + ' ' + totalResults);
    }

    async function updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
        let data = await fetch(url);
        props.changeProgress(50);
        let result = await data.json();
        props.changeProgress(70);
        setArticles(result.articles);
        setTotalResults(result.totalResults);
        setLoading(false);
        props.changeProgress(100);
    }

    return (
        <>
            <h1 style={{ marginTop: "70px" }} className="mb-2 mx-3">Newsify : Top {capitalise(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length} //This is important field to render the next data
                next={fetchData}
                hasMore={totalResults !== articles.length}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row mt-2">
                        {articles.map((ele) => {
                            return <div className="col-md-4 d-flex justify-content-center align-items-center my-3" key={ele.url}>
                                <Newsitem title={ele.title ? ele.title : ""} description={ele.description ? ele.description.slice(0, 90) : ""} imgUrl={ele.urlToImage ? ele.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_GnE4JR24hH9N9HgZaZWYjYR-XZawrqPtQ&usqp=CAU"} newsUrl={ele.url} source={ele.source.name} time={ele.publishedAt} author={ele.author} badgeColor={props.badgeColor} /> </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 10,
    category: "general",
    badgeColor: "danger"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    badgeColor: PropTypes.string
}
