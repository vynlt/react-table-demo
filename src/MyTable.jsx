import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment'
import DatePicker from "react-datepicker";

import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { data } from './data.jsx'

class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            pageSize: 5,
            currentPageSize: 5,
        };
    }

    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });
    }

    handlePageNumberChange = (event) => {
        this.handlePageChange(event.target.value)
    }

    handleSizeChange = (event) => {
        this.setState({
            currentPageSize: parseInt(event.target.value),
            pageSize: parseInt(event.target.value)
        })
    }

    createPageChoice = (dataNum) => {
        var elements = [];
        for (var i = 0; i < dataNum; i++) {
            elements.push(<option key={i} value={(i + 1)}>{i + 1}</option>);
        }
        return elements;
    }

    handleFilterChange = () => {

        const resultCount = this.selectTable.getResolvedState().sortedData.length
        if (resultCount === 0)
            this.setState({
                currentPageSize: 1
            });
        else if (resultCount < this.state.pageSize)
            this.setState({
                currentPageSize: resultCount
            });
        else if (resultCount > this.state.pageSize)
            this.setState({
                currentPageSize: this.state.pageSize
            });
    }

    render() {
        const columns = [{
            Header: 'First Name',
            accessor: 'firstName',
            filterMethod: (filter, row) =>
                String(row[filter.id]) === filter.value
        }, {
            Header: 'Last Name',
            accessor: 'lastName',
        },
        {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: 'Date of Birsth',
            accessor: 'dob',
            Cell: props => <span>{moment(props.value).format("DD/MM/YYYY")}</span>,
            filterMethod: (filter, row) => moment(row[filter.id]).format("DD/MM/YYYY") === moment(filter.value).format("DD/MM/YYYY")
            ,
            Filter: ({ filter, onChange }) => {
                return (<div >
                    <DatePicker
                        selected={filter !== undefined ? new Date(filter.value) : undefined}
                        onChange={event => onChange(event)}
                        dateFormat="dd/MM/yyyy"
                    />
                    <button style={{ visibility: filter ? "visible" : "hidden" }} className="clear-button" onClick={() => onChange("")}></button>
                </div>)
            }
        },
        {
            id: 'friendName',
            Header: 'Friend Name',
            accessor: d => d.friend.name
        }, {
            Header: props => <span>Friend Age</span>,
            accessor: 'friend.age'
        },
        {
            Header: "Over 21",
            accessor: "age",
            id: "over",
            Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
            filterMethod: (filter, row) => {
                if (filter.value === "all") {
                    return true;
                }
                if (filter.value === "true") {
                    return row[filter.id] >= 21;
                }
                return row[filter.id] < 21;
            },
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Show All</option>
                    <option value="true">Can Drink</option>
                    <option value="false">Can't Drink</option>
                </select>
        }
        ]
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    filterable
                    showPagination={false}
                    showPageSizeOptions={true}
                    pageSize={this.state.currentPageSize}
                    defaultPageSize={5}
                    page={this.state.activePage - 1}
                    ref={(r) => {
                        this.selectTable = r;
                    }}
                    onFilteredChange={this.handleFilterChange}
                    getTheadFilterThProps={() => { return { style: { position: "inherit", overflow: "inherit" } } }}
                />

                <div className="footer">
                    <div className="page-wrapper">
                        <span>Page</span>
                        <select className="form-control no-full-width" onChange={this.handlePageNumberChange}>
                            {
                                this.createPageChoice(Math.ceil(data.length / this.state.pageSize))
                            }
                        </select>
                    </div>
                    <div className="pagination-wrapper">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={data.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    </div>

                    <div className="item-per-page-wrapper">
                        <span>Item per page</span>
                        <select className="form-control no-full-width" onChange={this.handleSizeChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        <span>{this.state.pageSize * (this.state.activePage - 1) + 1} -
                        {this.state.pageSize * this.state.activePage > data.length ? data.length : this.state.pageSize * this.state.activePage} of {data.length}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyTable;