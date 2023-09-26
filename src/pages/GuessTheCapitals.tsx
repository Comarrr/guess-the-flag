import GTC from "../components/GTC"
import Navigation from "../components/Navigation"

type Props = {}

const GuessTheCapitals = ({}: Props) => {
  return (
    <div className="guess-the-capitals">
        <Navigation />
        <GTC />
    </div>
  )
}

export default GuessTheCapitals