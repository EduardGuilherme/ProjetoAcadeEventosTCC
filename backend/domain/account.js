/**
 *
 * COMPLETO
 */

class Account {
  constructor(email, password, is_administrator) {
    this.id = 0;
    this.email = email;
    this.password = password;
    this.is_administrator = false;
  }

  static getAccountByEmail(email) {
    let sql = `SELECT * FROM ACCOUNTS WHERE email = '${email}' `;
    return sql;
  }

  addAccount() {
    let sql = `INSERT INTO ACCOUNTS(email, password, is_administrator) VALUES ('${this.email}', '${this.password}', ${this.is_administrator})`;
    return sql;
  }

  updateAccount(id) {
    let sql = `UPDATE ACCOUNTS SET email = '${this.email}', password = '${this.password}' WHERE accounts.id = ${id};`;
    return sql;
  }
}

export default Account;
