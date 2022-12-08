import { useState } from "react";
import { useQuery } from "react-query";
import { Character } from "./Character";

export default function Characters() {
    const [page, setPage] = useState(1);

    const fetchCharacters = async ({queryKey}) => {
        // for pagination we need a dynamic link
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
        return response.json();
    };
    
    // useQuery( unique query key, function we want to call in order to fetch the data)
    // we add an array, so each page should have an unique key (characters 2. characters 3, etc.)
    const {data, status} = useQuery(["characters", page], fetchCharacters);
    // console.log('Data', data); // data.results to get hte API data

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (status === 'error') {
        return <div>Error</div>
    }

    return (
        <div className="characters">
            {data.results.map((character) => {
                return <Character character={character} />
            })}
            <div>
                <button 
                    disabled={page === 1} 
                    onClick={() => setPage((old) => old - 1)}
                >
                    Previous
                </button>
                {/* // if data.info.next = null -> we are on the last page and the button should be disabled */}
                <button
                    disabled={!data.info.next}
                    onClick={() => setPage((old) => old + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}