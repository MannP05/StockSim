import React, { useState, useEffect } from "react";

export default function StockSearch() {
  const [allStocks, setAllStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/nasdaq_list");
      const data = await response.json();
      if (Array.isArray(data)) {
        setAllStocks(data);
        setFilteredStocks(data);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value.toUpperCase());

    if (value.trim() === "") {
      setFilteredStocks(allStocks);
    } else {
      const filtered = allStocks.filter(
        (stock) =>
          stock.symbolCode.includes(value.toUpperCase()) ||
          (stock.name && stock.name.toUpperCase().includes(value.toUpperCase()))
      );
      setFilteredStocks(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setFilteredStocks(allStocks);
  };

  const toggleSelectStock = (stock) => {
    setSelectedStocks((prev) => {
      const isSelected = prev.some((s) => s.symbolCode === stock.symbolCode);
      if (isSelected) {
        return prev.filter((s) => s.symbolCode !== stock.symbolCode);
      } else {
        return [...prev, stock];
      }
    });
  };

  const calculateRangePercentage = (low, high) => {
    if (!low || !high || parseFloat(low) === parseFloat(high)) return 0;
    const lowNum = parseFloat(low);
    const highNum = parseFloat(high);
    return ((lowNum - Math.min(lowNum, highNum)) / (highNum - lowNum)) * 100 || 0;
  };

  const calculatePortfolioValue = () => {
    return selectedStocks
      .reduce((sum, stock) => sum + parseFloat(stock.high || stock.close || 0), 0)
      .toFixed(2);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setPortfolioValue(calculatePortfolioValue());
  }, [selectedStocks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl md:text-5xl">📈</span>
                <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  StockSim
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 font-light">
                Master the market with real-time stock data and portfolio tracking
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Search Section */}
          <div className="card p-8 mb-8 animate-slide-up backdrop-blur-sm bg-white/10 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🔍</span> Search Stocks
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                className="input-field flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                placeholder="Search by symbol (AAPL, MSFT, etc.)"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchInput && (
                <button
                  className="btn-primary"
                  onClick={handleClearSearch}
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-sm text-gray-300 mt-4">
              📊 Showing <span className="font-semibold text-purple-400">{filteredStocks.length}</span> stocks
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card p-6 backdrop-blur-sm bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 animate-slide-up">
              <p className="text-gray-300 text-sm font-medium">Total Stocks</p>
              <p className="text-3xl font-bold text-indigo-400 mt-2">{allStocks.length}</p>
            </div>
            <div className="card p-6 backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-gray-300 text-sm font-medium">Selected</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">{selectedStocks.length}</p>
            </div>
            <div className="card p-6 backdrop-blur-sm bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-white/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-gray-300 text-sm font-medium">Portfolio Value</p>
              <p className="text-3xl font-bold text-pink-400 mt-2">${portfolioValue}</p>
            </div>
          </div>

          {/* Results Section */}
          <div className="card p-8 backdrop-blur-sm bg-white/10 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-2xl">📊</span> Available Stocks
              {selectedStocks.length > 0 && (
                <span className="ml-2 px-3 py-1 bg-pink-500/30 text-pink-300 rounded-full text-sm font-medium">
                  {selectedStocks.length} selected
                </span>
              )}
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>
                </div>
                <p className="text-gray-300 font-medium">Loading stocks...</p>
              </div>
            ) : filteredStocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-gray-300 text-lg font-medium">
                  No stocks found matching "{searchInput}"
                </p>
                <p className="text-gray-400 text-sm mt-2">Try different keywords</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {filteredStocks.map((stock, index) => {
                  const isSelected = selectedStocks.some(
                    (s) => s.symbolCode === stock.symbolCode
                  );
                  return (
                    <div
                      key={index}
                      onClick={() => toggleSelectStock(stock)}
                      className={`group cursor-pointer p-5 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 backdrop-blur-sm ${
                        isSelected
                          ? "bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border-indigo-400 shadow-lg shadow-indigo-500/20"
                          : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-indigo-400/50"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-indigo-400">
                            {stock.symbolCode}
                          </h3>
                          {stock.name && (
                            <p className="text-xs text-gray-400 mt-1 truncate">
                              {stock.name}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="flex items-center justify-center w-6 h-6 bg-indigo-500 rounded-full">
                            <span className="text-white font-bold text-sm">✓</span>
                          </div>
                        )}
                      </div>

                      {/* Price Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Low</span>
                          <span className="text-sm font-semibold text-gray-300">
                            ${parseFloat(stock.low).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">High</span>
                          <span className="text-sm font-semibold text-gray-300">
                            ${parseFloat(stock.high).toFixed(2)}
                          </span>
                        </div>
                        {stock.close && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Close</span>
                            <span className="text-sm font-semibold text-gray-300">
                              ${parseFloat(stock.close).toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price Range Bar */}
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${calculateRangePercentage(
                              stock.low,
                              stock.high
                            )}%`,
                          }}
                        ></div>
                      </div>

                      {/* Range */}
                      <p className="text-xs text-gray-400 text-center">
                        Range: ${(parseFloat(stock.high) - parseFloat(stock.low)).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Stocks Panel */}
          {selectedStocks.length > 0 && (
            <div className="mt-8 card p-8 backdrop-blur-sm bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 animate-slide-up">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>⭐</span> Your Selected Stocks ({selectedStocks.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedStocks.map((stock, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 group"
                  >
                    <span>{stock.symbolCode}</span>
                    <span
                      className="text-xs cursor-pointer opacity-70 group-hover:opacity-100 font-bold"
                      onClick={() => toggleSelectStock(stock)}
                    >
                      ✕
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-gray-300">
                  Total Combined Value:{" "}
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                    ${portfolioValue}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}