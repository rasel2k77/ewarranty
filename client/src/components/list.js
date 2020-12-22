import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderContent from './header_content';
import '../css/style.css';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warrantyCard: [],
            isLoading: true
        }
        this.fetchCards.bind(this);
    }

    componentDidMount() {
        this.fetchCards();
    }

    fetchCards = () => {
        const url = 'http://localhost:3001/cards';
        fetch(url)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    warrantyCard: data,
                    isLoading: false
                }, console.log(data))
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }


    render() {
        return (
            <React.Fragment>
                {
                    this.props.location.action_completed === 'add'
                        ? <div className="alert alert-success" role="alert">Successfully Added</div>
                        : ''
                }

                {
                    this.props.location.action_completed === 'edit'
                        ? <div className="alert alert-success" role="alert">Successfully Updated</div>
                        : ''
                }

                <div className="card">
                    <HeaderContent left_title="E Warranty Cards" right_title="Add Cards" />
                    <div className="card-body">

                        {
                            this.state.warrantyCard.length > 0 ?
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL</th>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Model No</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Purchase Date</th>
                                            <th width="200px">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.warrantyCard.map(card =>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>{card.customer_name}</td>
                                                    <td>{card.product_name}</td>
                                                    <td>{card.model_no}</td>
                                                    <td>{card.phone_no}</td>
                                                    <td>{ card.purchase_date.toLocaleString()}</td>
                                                    <td>
                                                        <Link style={{ marginRight: "10px" }} className="btn btn-success edit" to={"/edit/" + card.id}>Edit</Link>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                :
                                <p className="text-center" style={{ color: "red", fontWeight: "bold" }}>No Warranty information found!</p>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default List;