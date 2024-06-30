import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    padding: 20px;
    transition: color 0.3s ease-in-out;
    display: flex;
    align-items: center;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Coins = () => {
  // const [coins, setCoins] = useState<ICoins[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get("https://api.coinpaprika.com/v1/coins");
  //     console.log(response.data.slice(0, 100));
  //     setCoins(response.data.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        {" "}
        <Title>코인</Title>
      </Header>

      {isLoading ? (
        <Loader>"loading..."</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                {" "}
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
