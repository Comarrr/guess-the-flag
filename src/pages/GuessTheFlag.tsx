import GTF from "../components/GTF";
import Navigation from "../components/Navigation";

const GuessTheFlag = () => {
    return (
        <div className="guess-the-flag">
            <Navigation />
            <div >
                <GTF />
            </div>
        </div>
    );
};

export default GuessTheFlag;