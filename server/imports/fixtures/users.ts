import { Parties } from "../../../both/collections/parties.collection";
import { UserCollection } from "../../../both/collections/user.collection";
import { CompanyCollection } from "../../../both/collections/company.collection";

export function loadUsers() {
  if (UserCollection.find().cursor.count() === 0) {
    const users = [
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

    CompanyCollection.find({}).cursor.forEach(company => console.log(company));
    // users.forEach((company) => UserCollection.insert(company));
  }
}