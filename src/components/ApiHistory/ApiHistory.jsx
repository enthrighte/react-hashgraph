import React, { Component } from "react";
import "./ApiHistory.scss";

class ApiHistory extends Component {
    render() {
        const messages = this.props.apiHistory.map((msg, index) => (
            <p key={index}>{msg.data}</p>
        ));

        return (
            <div className="ApiHistory">
                <h2>ApiHistory</h2>
                {messages}
            </div>
        );
    }
}

export default ApiHistory;