import { useEffect, useState } from "react";
import "./App.css";
import { getAllPoke, getPoke } from "./utils/pokemon";
import { Card } from "./components/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    const fetchPokeData = async () => {
      // すべてのポケモンデータの作成
      const res: any = await getAllPoke(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPoke(res.results);
      setLoading(false);
    };
    fetchPokeData();
  }, []);

  const loadPoke = async (data) => {
    //20種類のfetchが終わるまで待機
    const _pokeData = await Promise.all(
      data.map((poke) => {
        const pokeRecord = getPoke(poke.url);
        return pokeRecord;
      })
    );
    setPokeData(_pokeData);
  };

  console.log(pokeData);

  return (
    <>
      {loading ? (
        <h1>ローディング中</h1>
      ) : (
        <>
          {pokeData.map((poke, i) => {
            return (
              <>
                <Card key={i} poke={poke} />
              </>
            );
          })}
        </>
      )}
    </>
  );
}

export default App;
