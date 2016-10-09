
import { User } from "../../../both/models/user";
import { UserCollection } from "../../../both/collections/user.collection";
import { CompanyCollection } from "../../../both/collections/company.collection";

export function loadUsers() {
  if (UserCollection.find().cursor.count() === 0) {
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

    let users: User[] = [];
    CompanyCollection.find({})
      .cursor
      .forEach((c, i) => {
        let index = i*2;
        users.push(Object.assign(rawUsers[index], {companyId: c._id}));
        users.push(Object.assign(rawUsers[index+1], {companyId: c._id}));
      });

    users.forEach((user) => UserCollection.insert(user));
  }
}