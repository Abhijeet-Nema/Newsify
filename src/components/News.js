import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"



export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: "general",
        badgeColor: "danger"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        badgeColor: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = "Newsify : " + this.capitalise(this.props.category) + " Headlines";
    }

    capitalise = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    componentDidMount() {
        this.updateNews();
    }

    // nextPage = async () => {
    //     await this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }

    // previousPage = async () => {
    //     await this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    fetchData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        let result = await data.json();
        this.setState({
            articles: this.state.articles.concat(result.articles),
            totalResults: result.totalResults
        });
        // console.log(this.state.articles.length + ' ' + this.state.totalResults);
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        this.props.changeProgress(50);
        let result = await data.json();
        this.props.changeProgress(70);
        this.setState({
            articles: result.articles,
            totalResults: result.totalResults,
            loading: false
        });
        this.props.changeProgress(100);
    }

    render() {
        return (
            <>
                <h1 className="mt-3 mb-2 mx-3">Newsify : Top {this.capitalise(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchData}
                    hasMore={this.state.totalResults !== this.state.articles.length}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row mt-2">
                            {this.state.articles.map((ele) => {
                                return <div className="col-md-4 d-flex justify-content-center align-items-center my-3" key={ele.url}>
                                    <Newsitem title={ele.title ? ele.title : ""} description={ele.description ? ele.description.slice(0, 90) : ""} imgUrl={ele.urlToImage ? ele.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR721OdHYrYJGVTCT4Mn83ygjxdV0tWLSh9Ew&usqp=CAU"} newsUrl={ele.url} source={ele.source.name} time={ele.publishedAt} author={ele.author} badgeColor={this.props.badgeColor} /> </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
