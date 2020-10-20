class Course {
  constructor(name) {
    this.id = 0;
    this.name = name;
  }

  getAddCourseSQL() {
    let sql = `INSERT INTO COURSES(name) VALUES('${this.name}')`;
    return sql;
  }

  static getCourseByIdSQL(id) {
    let sql = `SELECT * FROM COURSES WHERE id = ${id}`;
    return sql;
  }

  static updateCourseByIdSQL(id, name) {
    let sql = `UPDATE COURSES SET name = '${name}' WHERE id = ${id}`;
    return sql;
  }

  static deleteCourseByIdSQL(id) {
    let sql = `DELETE FROM COURSES WHERE id = ${id}`;
    return sql;
  }

  static getAllCoursesSQL() {
    let sql = `SELECT * FROM COURSES`;
    return sql;
  }
}

export default Course;
