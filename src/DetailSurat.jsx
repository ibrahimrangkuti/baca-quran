import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function DetailSurat() {
  const { nomor } = useParams();
  const [surah, setSurah] = useState([]);
  const [ayats, setAyats] = useState([]);

  useEffect(() => {
    getDetailSurah();
  }, [nomor]);

  const getDetailSurah = async () => {
    try {
      const { data } = await axios.get(
        `https://equran.id/api/v2/surat/${nomor}`
      );
      console.log(data.data);
      setSurah(data.data);
      setAyats(data.data.ayat);
    } catch (error) {}
  };

  return (
    <>
      <Link to={"/"}>
        <button className="flex items-center gap-2 mb-5 bg-white hover:bg-black hover:text-white px-3 py-2 ring-1 ring-black">
          <AiOutlineArrowLeft />
          Beranda
        </button>
      </Link>
      <div className="w-full h-auto py-12 bg-white border-[2px] border-black mb-10">
        <div className="flex items-center justify-center gap-4">
          <span className="text-3xl">{surah.namaLatin}</span>
          <span className="text-4xl">{surah.nama}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-comforta">
            {surah.tempatTurun} • {surah.arti} • {surah.jumlahAyat} Ayat
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {ayats
          ? ayats.map((ayat) => (
              <div className="w-full h-auto p-4 bg-white transition-all duration-300 hover:bg-black hover:text-white card-border group">
                <span className="text-left">
                  {nomor}:{ayat.nomorAyat}
                </span>
                <h2 className="text-4xl text-right my-3 mb-5 cursor-pointer">
                  {ayat.teksArab}
                </h2>
                <span className="font-medium">{ayat.teksLatin}</span>
                <div className="w-full h-[1px] bg-black group-hover:bg-white my-3"></div>
                <p className="text-base font-comforta">{ayat.teksIndonesia}</p>
              </div>
            ))
          : null}
      </div>
      <footer className="text-center text-black mt-10 py-4 border-t border-slate-200">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://www.instagram.com/ranqkuty"
            className="font-semibold underline"
          >
            ibrahimrangkuti
          </a>
        </p>
      </footer>
    </>
  );
}
