process.on("message", () => {
  const cant = Number(process.argv[2]);
  const lista = [];
  const valores = {};
  for (let i = 0; i < cant; i++) {
    const num = Math.floor(Math.random() * 1000) + 1;
    lista.push(num);
  }

  for (num of lista) {
    if (num in valores) {
      ++valores[num];
    } else {
      valores[num] = 1;
    }
  }
  process.send(valores);
});
