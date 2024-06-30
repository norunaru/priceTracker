import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  padding: 0px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteParams {
  coinId: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();

  const state = location.state as RouteState;

  console.clear();
  console.log(location);

  useEffect(() => {
    (async () => {
      const priceData = await axios.get(
        `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
      );
      console.log(priceData.data);

      const infoData = await axios.get(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      console.log(infoData.data);

      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);

  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  return (
    <Container>
      <Header>
        <Title>{state?.name || "loading"}</Title>
      </Header>

      {loading ? <Loader>"loading..."</Loader> : null}
    </Container>
  );
}

export default Coin;
