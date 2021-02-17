import React, { Component } from 'react'
import ChildDB from '../components/ChildDB';
import MessageDB from '../components/MessageDB';
import axios from "axios";

import faunadb from 'faunadb'

import '../css/index.css'
import Container from 'react-bootstrap/Container'

const client = new faunadb.Client({ secret: `${process.env.REACT_APP_FAUNADB_KEY}` })
const q = faunadb.query

//const ChildPage = () => {
class ChildPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isDataFetched: false
    };
  }

  async componentDidMount() {
    this.setState({child: null});
    this.getChildByBeneficiary(this.props.beneficiary_id)
  }

  getChildByBeneficiary(customer_id) {

    axios.get('https://grace.converteverywhere.com/benefactor/' + customer_id + '/beneficiaries').then(d => {
        const childIDs = d.data.beneficiaries;
        //do_some_faunadb_stuff(childIDs);
        // for now we only want the first content

        client.query(
          q.Get(
          q.Match(
            q.Index('childByBeneficiary'), childIDs[0].id)))

          .then(response => {
            const child = response.data
            console.log(child)
            this.setState({
              name: response.data.name,
              isDataFetched: true,
              child: response.data
            })
            return child
          })
          .catch(error => console.warn('error', error.message))

        console.log(d.data.beneficiaries)
    });



  }
  render() {

    if(!this.state.isDataFetched) return null;
    const {child} = this.state || {};

    return (
      <>
        <Container>
          <ChildDB
            child={child}
          />
        </Container>
        <Container>
            <MessageDB
                child={child}
                firstName={this.props.first_name}
                lastName={this.props.last_name}
            />
        </Container>
      </>
    )
  }


}

export default ChildPage
