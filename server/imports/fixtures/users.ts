import { CompanyCollection } from "../../../both/collections/company.collection";

export function loadUsers() {
  if ( Meteor.users.find().count() === 0 ) {
    const rawUsers = [
      {
        "email": "Bernard.Cash@lala.lv",
        "name": "Sonya Hensley"
      },
      {
        "email": "Iva.Sanchez@lala.lv",
        "name": "Pittman Hansen"
      },
      {
        "email": "Lily.Holcomb@lala.lv",
        "name": "Ebony Langley"
      },
      {
        "email": "Charles.Chandler@lala.lv",
        "name": "Dana Chase"
      },
      {
        "email": "Connie.Webb@lala.lv",
        "name": "Amie Patton"
      },
      {
        "email": "Adele.Mckay@lala.lv",
        "name": "Chang Rosa"
      },
      {
        "email": "Justice.Cooke@lala.lv",
        "name": "Roberta Perez"
      },
      {
        "email": "Essie.Banks@lala.lv",
        "name": "Berry Petersen"
      },
      {
        "email": "Nixon.Padilla@lala.lv",
        "name": "Trevino Brady"
      },
      {
        "email": "Kimberley.Villarreal@lala.lv",
        "name": "Polly Todd"
      }
    ];

    let users = [];
    CompanyCollection.find({})
      .cursor
      .forEach((c, i) => {
        let index = i * 2;
        users.push(Object.assign(rawUsers[index], {companyId: c._id}));
        users.push(Object.assign(rawUsers[index + 1], {companyId: c._id}));
      });
    users.forEach((user) => {
      let id = Accounts.createUser({
        username: user.email,
        email: user.email,
        password: "qwe"
      });
      Meteor.users.update(id, {
        $set: {
          companyId: user.companyId,
          name: user.name
        }
      });
    });
  }
}