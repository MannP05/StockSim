
// App.js
import React, {useState, useEffect} from "react";

export default function App() {
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
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((item, i) => (
          <p key={i}>{item.symbolCode}, Low:{item.low}, High:{item.high}</p>
        ))
      )}


      {/* <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Stock Table
        </h1>
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Symbol</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-gray-400 italic"
                >
                  No data available
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div> */}
    </div>
  );
}
