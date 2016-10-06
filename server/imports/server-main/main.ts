import { loadCompanies } from "../fixtures/companies";
import { loadUsers } from "../fixtures/users";

export class Main {
  start(): void {
    this.initFakeData();
  }

  initFakeData(): void {
    loadCompanies();
    loadUsers();
  }
}
