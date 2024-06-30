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

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const state = location.state as RouteState;

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

      setInfo(infoData.data);
      setPriceInfo(priceData.data);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "loading"}</Title>
      </Header>

      {loading ? <Loader>"loading..."</Loader> : priceInfo?.close}
    </Container>
  );
}

export default Coin;
