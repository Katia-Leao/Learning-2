console.log("=== CADASTRO ===");

// Recuperar o botão no HTML
const btn = document.querySelector("button");

// Atribuir um evento ao botão
btn.onclick = () => {
  const fields = document.querySelectorAll("input");

  //Para selecionar um elemento específico
  //const model = document.querySelector("#model")

  const data = {};

  fields.forEach((field) => {
    console.log(field.id, field.value);
    data[field.id] = field.value;
  });

  console.log(data);
  console.log(JSON.stringify(data));

  const endpoint = `http://localhost:1234/`;

  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "content-type": "application/json",
    }),
  };

  fetch(endpoint, config)
    .then((res) => {
      if (res.ok) location.href = "/vehicles";
    })
    .catch(() => console.error("FALHA AO CADASTRAR"));
};
