import { loadCompanies } from "../fixtures/companies";
import { loadUsers } from "../fixtures/users";
import { CompanyCollection } from "../../../both/collections/company.collection";

export class Main {
  start(): void {
    // this.clearAllData();
    this.initFakeData();
  }

  initFakeData(): void {
    loadCompanies();
    loadUsers();
  }

  clearAllData(): void {
    CompanyCollection.remove({});
  }
}
