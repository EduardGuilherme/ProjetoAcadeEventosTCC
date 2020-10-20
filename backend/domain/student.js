class Student {
  constructor(name, image, description, id_account, id_course, id_institution) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.id_account = id_account;
    this.id_course = id_course;
    this.id_institution = id_institution;
  }

  static getAllStudents() {
    let sql = "SELECT * FROM STUDENTS";
    return sql;
  }

  static getStudentById(id) {
    let sql = `SELECT * FROM STUDENTS WHERE id = ${id}`;
    return sql;
  }

  static getStudentByUserId(id) {
    let sql = `SELECT student.name, student.image, student.id_institution, student.id_course, student.id_account,student.id,student.description, account.email, account.password FROM STUDENTS as student LEFT JOIN ACCOUNTS as account on student.id_account = account.id WHERE student.id_account = ${id}`;
    return sql;
  }

  addStudent() {
    let sql = `INSERT INTO STUDENTS(name, image,description, id_account, id_course, id_institution) VALUES ('${this.name}','${this.image}','${this.description}', ${this.id_account},${this.id_course},${this.id_institution})`;
    return sql;
  }

  updateStudentById(id) {
    let sql = `UPDATE STUDENTS SET 
    name='${this.name}',
    image='${this.image}',
    description='${this.description}',
    id_account=${this.id_account},
    id_course=${this.id_course},
    id_institution=${this.id_institution} 
    WHERE id= ${id}`;
    return sql;
  }

  static removeStudentById(id) {
    let sql = `DELETE FROM STUDENTS WHERE id=${id}`;
    return sql;
  }
}

export default Student;
