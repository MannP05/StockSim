import React, {useState, useEffect} from "react";

export default function Search() {
    const [data, setData] = useState([{}])
  
  useEffect(() => {
      fetch('nasdaq_list').then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
    }, [])
    return (
        <div>
            <h2>Input stock information</h2>
            <input type="text" placeholder="Enter stock"></input>
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                data.map((item, i) => (
                    <p key={i}>{item.symbolCode}, Low:{item.low}, High:{item.high}</p>
                ))
            )}
        </div>
    );
}