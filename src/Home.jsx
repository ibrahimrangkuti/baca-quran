import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    getSurahs();

    const intervalId = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateTime = () => {
    setTime(new Date());
  };

  const getSurahs = async () => {
    try {
      const { data } = await axios.get("https://equran.id/api/v2/surat");
      setSurahs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 ">
          <h1 className="text-4xl font-semibold my-5">Baca Quran Online</h1>
          <p className="mb-5 font-comforta">
            Website ini saya buat dengan ikhlas dan sepenuh hati untuk umat
            islam termasuk diri saya sendiri agar tetap ingat dan baca al -
            quran.
          </p>
        </div>
        <span className="bg-white px-3 py-1 border-[2px] border-black text-xl font-semibold mb-5">
          {time.toLocaleTimeString().split("AM")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-3 pb-6">
        {surahs
          ? surahs.map((surah) => (
              <Link to={`/surat/${surah.nomor}`}>
                <div className="w-full h-40 p-4 cursor-pointer bg-white transition-all duration-300 hover:scale-95 hover:bg-black hover:text-white card-border">
                  <span className="text-left">
                    {surah.nomor}. {surah.namaLatin}
                  </span>
                  <div className="text-right mt-3">
                    <h2 className="text-5xl mb-2">{surah.nama}</h2>
                    <span className="text-sm font-comforta">
                      {surah.tempatTurun} - {surah.arti}
                    </span>
                  </div>
                </div>
              </Link>
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
