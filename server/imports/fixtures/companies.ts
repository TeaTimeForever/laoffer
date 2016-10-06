import { Parties } from '../../../both/collections/parties.collection';
import { CompanyCollection } from "../../../both/collections/company.collection";

export function loadCompanies() {
  if (CompanyCollection.find().cursor.count() === 0) {
    const companies = [
      {
        "registrationNumber": "57f5c32754d16d5a90e9241b",
        "name": "Farmex",
        "phone": "+371 (813) 556-3256"
      },
      {
        "registrationNumber": "57f5c3276892ec1cc51e2811",
        "name": "Supportal",
        "phone": "+371 (850) 550-3516"
      },
      {
        "registrationNumber": "57f5c327969f1428a6dd61f9",
        "name": "Recrisys",
        "phone": "+371 (802) 463-3079"
      },
      {
        "registrationNumber": "57f5c327fefabb97a278ff08",
        "name": "Acumentor",
        "phone": "+371 (860) 459-3687"
      },
      {
        "registrationNumber": "57f5c3272588e929d1e5ed92",
        "name": "Golistic",
        "phone": "+371 (970) 430-2421"
      }
    ];

    companies.forEach((company) => CompanyCollection.insert(company));
  }
}