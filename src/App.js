import React from "react";
import styled from "styled-components";

import HeaderBar from "./components/HeaderBar";
import Cat from "./components/Cat";

class App extends React.Component {
  constructor() {
    super();

    //
    const CryptoKats = new web3.Contract("0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d");

    this.state = {
      cryptoKats: CryptoKats.at("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"),
      loading: true,
      cats: []
    };
  }

  componentDidMount = async () => {
    const { cryptoKats } = this.state;
    for (let i = 0; i < 30; i++)
      cryptoKats.getKat(i, (err, cat) =>
        cryptoKats.ownerOf(i, (err, owner) =>
          this.setState(state => ({
            cats: [
              ...state.cats,
              {
                color: `#${cat[0].toString(16).padStart(6, "0")}`,
                id: i,
                generation: cat[1].toString(),
                owner
              }
            ]
          }))
        )
      );
  };

  handlePurchase = id => {
    this.state.cryptoKats.purchase(id, (err, result) => {
      alert("success!");
    });
  };

  render() {
    const { cats } = this.state;
    return (
      <div>
        <HeaderBar>
          <h1>
            CryptoKats{" "}
            <span role="img" aria-label="Smiling emoji">
              😺
            </span>
          </h1>
        </HeaderBar>
        <main>
          <CatWrapper>
            {cats.map(cat => (
              <Cat {...cat} onClick={this.handlePurchase} />
            ))}
          </CatWrapper>
        </main>
      </div>
    );
  }
}

const CatWrapper = styled.div`
  display: flex;
  margin: -8px;
  flex-wrap: wrap;
`;

export default App;
