import React from 'react';
import Axios from 'axios';
import HeaderContent from './header_content';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer_name: '',
            product_name: '',
            model_no: '',
            address: '',
            purchase_date: '',
            phone_no: '',
            id: this.props.match.params.id,
            isEdit: false,
            errorMessage: '',
            error: false
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.id != undefined) {
            this.fetchCardsData();
        }
    }

    fetchCardsData = () => {
        if (this.state.id) {
            const url = 'http://localhost:3001/cards/edit/' + this.state.id;
            fetch(url)
                .then(response => response.json())
                .then(data =>
                    this.setState({
                        customer_name: data[0].customer_name,
                        product_name: data[0].product_name,
                        model_no: data[0].model_no,
                        address: data[0].address,
                        purchase_date: data[0].purchase_date,
                        phone_no: data[0].phone_no,
                        isEdit: true
                    }, console.log(this.state.isEdit))
                )
                .catch(error => this.setState({ error, isEdit: false }));
        }
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    handleFormSubmit(event) {
        event.preventDefault();
        if (this.state.customer_name != '' && this.state.product_name != '' && this.state.model_no != '') {
            let books = {
                customer_name: this.state.customer_name,
                product_name: this.state.product_name,
                model_no: this.state.model_no,
                address: this.state.address,
                purchase_date: this.state.purchase_date,
                phone_no: this.state.phone_no,
                isEdit: this.state.isEdit,
                id: this.state.id
            }

            Axios.post('http://localhost:3001/cards/add', books)
                .then((data) => {
                    this.props.history.push({ pathname: '/', action_completed: this.state.isEdit ? 'edit' : 'add' })
                })
                .catch((response) => {
                    this.setState({ error: true })
                });
        } else {
            alert('Please fill up the input fields');
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.error
                        ? <div class="alert alert-danger" role="alert">Something Error. Please submit again</div>
                        : ''
                }
                <div className="card">
                    <HeaderContent left_title="Add Card information here" />
                    <div className="card-body">
                        <form onSubmit={this.handleFormSubmit} method="post">
                            <div className="form-group">
                                <label>Customer Name:</label>
                                <input type="text" value={this.state.customer_name} onChange={e => this.setState({ customer_name: e.target.value })} className="form-control" name="customer_name" />
                            </div>

                            <div className="form-group">
                                <label>Product Name:</label>
                                <input type="text" value={this.state.product_name} onChange={e => this.setState({ product_name: e.target.value })} className="form-control" name="product_name" />
                            </div>

                            <div className="form-group">
                                <label>Model No:</label>
                                <input type="text" value={this.state.model_no} onChange={e => this.setState({ model_no: e.target.value })} className="form-control" name="model_no" />
                            </div>

                            <div className="form-group">
                                <label>Phone No:</label>
                                <input type="number" min="4" max="10" value={this.state.phone_no} onChange={e => this.setState({ phone_no: e.target.value })} className="form-control" name="phone_no" />
                            </div>

                            <div className="form-group">
                                <label>Purchase Date:</label>
                                <input type="date" value={this.state.purchase_date.toLocaleString()} onChange={e => this.setState({ purchase_date: e.target.value })} className="form-control" name="purchase_date" />
                            </div>

                            <div className="form-group">
                                <input style={{ marginRight: "20px" }} type="button" onClick={this.handleBack} className="btn btn-success" value="Back" />
                                <input type="submit" onClick={e => this.handleFormSubmit(e)} className="btn btn-info" value={this.state.isEdit ? 'Update' : 'Save'} />
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Add;