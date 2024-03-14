import React, { useState, useEffect } from "react";
import { fetcher } from "../api/apiClient";
import { API_ENDPOINT } from "../api/endPoint";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { RiCheckboxCircleFill} from "react-icons/ri";

interface Language {
  lang: string;
}

const LanguageSelector: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [showPairs, setShowPairs] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<any>('Select Language');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(API_ENDPOINT + `lang`);
        setLanguages(response.data);
      } catch (error: any) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  const toggleShowPairs = () => {
    setShowPairs(!showPairs);
  };

  const onHover = (language: string) => {
    return (
      selectedLanguages === language ? <RiCheckboxCircleFill /> :''
    );
  };

  return (
    <div className="parent" style={{ background: '#ADD8E6', padding: '.7rem', width: '14rem' }}>
      <div style={{ width: '12rem', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', border: '1px solid black', cursor: 'pointer', padding: '0.5rem', justifyContent: 'space-around', borderRadius: '0.5rem', background: 'white' }}
          onClick={toggleShowPairs}
        >
          <span style={{ marginRight: '0.5rem' }}><HiOutlineGlobeAlt /></span>
          <span>{selectedLanguages}</span>
          <span >{showPairs ? <BsChevronUp /> : <BsChevronDown />}</span>
        </div>
        {showPairs && (
          <div style={{ border: '1px solid black', padding: '0.5rem', borderRadius: '0.5rem', background: 'white', marginTop: '0.2rem' }}>
            {languages.map((language) => (
              <span
                key={language.lang}
                onClick={() => {
                  setSelectedLanguages(language.lang)
                  setShowPairs(!showPairs)
                }}
                style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-around', alignItems: 'center' }}
                onMouseEnter={() => setSelectedLanguages(language.lang)}
                onMouseLeave={() => setSelectedLanguages('Select Language')}
              >
                {language.lang}
                <div style={{ marginLeft: '0.5rem' }}>{onHover(language.lang)}</div>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
