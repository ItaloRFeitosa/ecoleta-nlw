import Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return await knex("items").del()
        .then(async () => {
            // Inserts seed entries
            return await knex("items").insert([
              { title: 'Lâmpadas', image: "lampadas.svg" },
              { title: 'Pilhas e Baterias', image: "baterias.svg" },
              { title: 'Papéis e Papelão', image: "papeis-papelao.svg" },
              { title: 'Resíduos Eletrônicos', image: "eletronicos.svg" },
              { title: 'Resíduos Orgânicos', image: "organicos.svg" },
              { title: 'Óleo de Cozinha', image: "oleo.svg" },
            ]);
          });
};
