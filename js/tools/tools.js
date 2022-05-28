// Formato para la moneda $ //
const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };
  
  // Formato para el % //
  
  const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
    });
  };