import React from 'react'
import Deck from './Deck'

export function Matchlist(props) {

const [matches, seMatches] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await Deck();
      console.log(data)
      seMatches(data);
    }

    fetchData();
  }, [data.length > 0])


    return (
        <>
            
        </>
    )
}
