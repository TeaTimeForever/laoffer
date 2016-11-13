import { loadCompanies } from "../fixtures/companies";
import { loadUsers } from "../fixtures/users";
import { CompanyCollection } from "../../../both/collections/company.collection";
import { publishCollections } from "./publish-declarations";

export class Main {
  start(): void {
    this.initFakeData();
    publishCollections();
  }

  initFakeData(): void {
    loadCompanies();
    loadUsers();
  }

  clearAllData(): void {
    CompanyCollection.remove({});
  }
}
