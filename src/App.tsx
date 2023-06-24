import { useEffect, useState } from "react";
import { getAllPoke, getPoke } from "./utils/pokemon";
import { Card } from "./components/Card";
import { PokeArray, PokemonDetails, PokemonResponse } from "./type";
import { Navvbar } from "./components/Navvbar";

import "./App.css";
import styles from "./components/Button.module.css";

const App: React.FC = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState<PokemonDetails[]>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokeData = async () => {
      // すべてのポケモンデータの作成
      const res = (await getAllPoke(initialURL)) as PokemonResponse;
      // 各ポケモンの詳細なデータを取得
      loadPoke(res.results);
      setLoading(false);
      setNextUrl(res.next); //発火したら次のURLを格納
    };
    fetchPokeData();
  }, []);

  //ポケモンの画像などを読み込む
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

  const handlePrevPage = async () => {
    console.log(prevUrl);
    if (!prevUrl) return;
    setLoading(true); //読み込んだらtrue
    const data = (await getAllPoke(prevUrl)) as PokemonResponse; //nextUrlで次のURLを読み込む
    await loadPoke(data.results);
    setNextUrl(data.next); //発火したら次のURLを格納
    setPrevUrl(data.previous); //発火したら前のURLを格納
    setLoading(false); //読み込んだらtrue
  };

  const handleNextPage = async () => {
    setLoading(true); //読み込んだらtrue
    const data = (await getAllPoke(nextUrl)) as PokemonResponse; //nextUrlで次のURLを読み込む
    console.log(data.results);
    setNextUrl(data.next); //発火したら次のURLを格納
    setPrevUrl(data.previous); //発火したら前のURLを格納

    await loadPoke(data.results);
    setLoading(false); //読み込んだらtrue
  };
  return (
    <>
      <Navvbar />
      {loading ? (
        <span className="Loading">ローディング中</span>
      ) : (
        <>
          <div className="Card__Contaienr">
            {pokeData.map((poke) => {
              return (
                <div key={poke.id}>
                  <Card poke={poke} id={poke.id} />
                </div>
              );
            })}
          </div>
          <div className={styles.BtnWrapper}>
            {prevUrl && (
              <button className={styles.button} onClick={handlePrevPage}>
                前へ
              </button>
            )}
            <button
              className={`${styles.button} ${!prevUrl && styles.button__right}`}
              onClick={handleNextPage}
            >
              次へ
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default App;
