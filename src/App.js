import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [inputAmount, setInputAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function converter() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputAmount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        // console.log(data);
        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
      }
      //checking if sellected currency are thesame then set to currency amount
      if (fromCurrency === toCurrency) return setConverted(inputAmount);

      converter();
    },
    [inputAmount, fromCurrency, toCurrency]
  );

  return (
    <div className="App">
      <input
        type="text"
        value={inputAmount}
        onChange={(e) => setInputAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <p>
        {converted} {toCurrency}
      </p>
    </div>
  );
}

export default App;
