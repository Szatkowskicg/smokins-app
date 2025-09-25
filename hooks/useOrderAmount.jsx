import { useState } from "react";

export const useOrderAmount = () => {
  const [orderAmount, setOrderAmount] = useState("");
  const [points, setPoints] = useState(0);

  const handleOrderAmountChange = (value) => {
    const formattedValue = value.replace(",", ".");
    setOrderAmount(formattedValue);

    if (formattedValue === "" || isNaN(parseFloat(formattedValue))) {
      setPoints(0);
    } else {
      const amountInNumber = parseFloat(formattedValue);
      const calculatedPoints = Math.round(amountInNumber * 2);
      setPoints(calculatedPoints);
    }
  };

  return {
    orderAmount,
    points,
    handleOrderAmountChange,
  };
};
