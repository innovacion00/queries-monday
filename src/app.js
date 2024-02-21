require("dotenv").config();
const fs = require("fs");
const res = require("./data.json");

const filter = (id, datosMonday) => {
  const datoFiltrado = datosMonday.find((datos) => {
    return datos.column_values.some((datosUsuario) => datosUsuario.text === id);
  });
  return datoFiltrado;
};

const mondayFetch = async (cursor = "") => {
  //! Filtrar datos de columna
  // const query = `query {
  //   boards (ids: 3426311372) {
  //     items_page (
  //       query_params: {
  //         rules: [
  //           {
  //             column_id: "texto0",
  //             compare_value: ["1.235.046.579"],
  //             operator: any_of
  //           },
  //         ],
  //         operator: or
  //       },
  //     ) {
  //       cursor
  //       items {
  //         id
  //         name
  //         column_values {
  //           id
  //         }
  //       }
  //     }
  //   }
  // }`;
  const pulseId = 5315938670;
  // ! Filtrar por id, webhooks
  const query = `query {
    boards (ids: 3426311372) {
      items_page (
               query_params: {ids: ${pulseId}},
             )  {
        cursor
        items {
          id
          name
          column_values { id text value }
        }
      }
    }
  }`;
  // "query {   boards(ids: 3426311372) {  groups(ids: topics) {  items { id  name  column_values {  id  text  value  }  } } } } ";
  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: process.env.MONDAY_APIKEY,
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    const data = await response.json(); // Espera la resolución de la promesa y obtén los datos JSO
    const id = "52.424.404";
    // const datosMonday = data.data.boards[0].items_page.items;
    // console.log(datosMonday);

    fs.writeFileSync("src/data.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
// const usuario = res.data.boards[0].items_page.items[0];
// console.log(usuario.column_values[15].text);
// console.log(usuario.name);
mondayFetch();
