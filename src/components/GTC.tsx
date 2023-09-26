
import Title from "./Title";

interface CountryData {
  translations: {
    fra: {
      common: string;
    };
  };
  flags: {
    svg: string;
  };
  capital: string;
}

const GTC = ({}: CountryData) => {


  return (
    <div className="gtf">
      <Title>GUESS THE CAPITAL</Title>
      <div className="gtf-game">
      </div>
    </div>
  );
};

export default GTC;

