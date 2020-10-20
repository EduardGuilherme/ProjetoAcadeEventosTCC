/*
  COMPLETO
*/

class Institution {
  constructor(name, cep, number) {
    this.id = 0;
    this.name = name;
    this.cep = cep;
    this.number = number;
  }

  getAddInstitutionSQL() {
    let sql = `INSERT INTO INSTITUTIONS(name, cep, number) \
                   VALUES('${this.name}','${this.cep}',${this.number})`;
    return sql;
  }

  static getInstitutionByIdSQL(id) {
    let sql = `SELECT * FROM INSTITUTIONS WHERE id = ${id}`;
    return sql;
  }

  static updateInstitutionByIdSQL(id, name, cep, number) {
    let sql = `UPDATE INSTITUTIONS SET name = '${name}', cep = '${cep}', number = ${number} WHERE id = ${id}`;
    return sql;
  }

  static deleteInstitutionByIdSQL(id) {
    let sql = `DELETE FROM INSTITUTIONS WHERE id = ${id}`;
    return sql;
  }

  static getAllInstitutionsSQL() {
    let sql = `SELECT * FROM INSTITUTIONS`;
    return sql;
  }
}

export default Institution;
