import { Component } from "react";
import NavBar from "../NavBar/index";
import Credit from "../Credit/index";
import Debit from "../Debit/index";
import ModalForAdd from "../ModalForAdd/index";
import RecentTransaction from "../RecentTransaction/index";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";

import "./index.css";

class Dashboard extends Component {
  state = {
    isLoading: true,
    name: "",
    email: "",
    credit: 0,
    debit: 0,
    transactions: [],
  };

  getProfileDetails = async (user_id) => {
    const url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
    };
    const response = await fetch(url, options);
    const body = await response.json();
    // console.log(body);
    const { users } = body;
    const { email, name } = users[0];
    this.setState({ email: email, name: name, isLoading: false });
  };

  getCreditDebitTotal = async (user_id) => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const { totals_credit_debit_transactions } = data;
    // console.log(totals_credit_debit_transactions);
    let credit = 0;
    let debit = 0;
    totals_credit_debit_transactions.forEach((element) => {
      if (element.type === "credit") {
        credit = credit + element.sum;
      } else {
        debit = debit + element.sum;
      }
    });

    this.setState({ credit: credit, debit: debit });
  };

  getLatestTransactions = async (user_id) => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=0";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const { transactions } = data;
    const sortedTransactions = transactions.sort((a, b) => {
      let da = new Date(a.date);
      let db = new Date(b.date);
      return db - da;
    });

    this.setState({ transactions: sortedTransactions });
  };

  componentDidMount = () => {
    const user_id = Cookies.get("user_id");
    this.getProfileDetails(user_id);
    this.getCreditDebitTotal(user_id);
    this.getLatestTransactions(user_id);
  };

  dataFromModal = (addedTrans) => {
    console.log("from Modal");
    console.log("from", addedTrans);
    this.setState({ transactions: addedTrans });
  };

  render() {
    const { isLoading, email, name, credit, debit, transactions } = this.state;

    console.log("transactions", transactions);
    const slicedData = transactions.slice(0, 3);
    return (
      <div className="dashboard-bg-container">
        {isLoading ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={50}
            width={50}
            className="loader"
          />
        ) : (
          <>
            <NavBar name={name} email={email} />
            <div className="dashboard-right-container">
              <div className="dashboard-upper-section">
                <h1 className="dashboard-heading">Accounts</h1>
                <ModalForAdd dataFromModal={this.dataFromModal} />
              </div>

              <div className="dashboard-lower-section">
                <div className="dashboard-debit-credit-container">
                  <Credit credit={credit} />
                  <Debit debit={debit} />
                </div>
                <p className="para">Last Transactions</p>
                <ul className="latest-transactions-card">
                  {slicedData.map((each) => (
                    <RecentTransaction
                      each={each}
                      key={each.id}
                      dataFromModal={this.dataFromModal}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Dashboard;
