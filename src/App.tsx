import { useEffect, useState } from "react";
import "./App.css";
import { getAllPoke, getPoke } from "./utils/pokemon";
import { Card } from "./components/Card";
import { PokeArray, PokemonDetails, PokemonResponse } from "./type";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const fetchPokeData = async () => {
      // すべてのポケモンデータの作成
      const res = (await getAllPoke(initialURL)) as PokemonResponse;
      // 各ポケモンの詳細なデータを取得
      loadPoke(res.results);
      setLoading(false);
    };
    fetchPokeData();
  }, []);

  const loadPoke = async (data: PokeArray) => {
    //20種類のfetchが終わるまで待機
    const _pokeData: PokemonDetails[] = await Promise.all(
      data.map((poke) => {
        const pokeRecord = getPoke(poke.url);
        return pokeRecord as unknown as PokemonDetails;
      })
    );
    setPokeData(_pokeData);
  };

  return (
    <>
      {loading ? (
        <h1>ローディング中</h1>
      ) : (
        <div className="Card__Contaienr">
          {pokeData.map((poke) => {
            return (
              <div key={poke.id}>
                <Card poke={poke} id={poke.id} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
