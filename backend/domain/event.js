class Event {
  constructor(
    name,
    image,
    start_date,
    final_date,
    start_time,
    status_event,
    description,
    id_institution,
    id_student
  ) {
    this.name = name;
    this.image = image;
    this.start_date = start_date;
    this.final_date = final_date;
    this.status_event = status_event;
    this.start_time = start_time;
    this.description = description;
    this.id_institution = id_institution;
    this.id_student = id_student;
  }



  static getAllEvents() {
    let sql =
      "SELECT event.id, event.name, event.image, event.start_date, event.final_date,event.start_time, event.status_event,event.description, student.name as student_name, institution.cep, institution.name as institution_name FROM EVENTS as event LEFT JOIN STUDENTS as student on event.id_student = student.id LEFT JOIN INSTITUTIONS as institution on event.id_institution = institution.id";
    return sql;
  }

  static getEventById(id) {
    let sql = `SELECT event.id, event.name, event.image, event.start_date, event.final_date,event.start_time, event.status_event,event.description, student.name as student_name,student.description as student_description, institution.cep, institution.number, institution.name as institution_name FROM EVENTS as event LEFT JOIN STUDENTS as student on event.id_student = student.id LEFT JOIN INSTITUTIONS as institution on event.id_institution = institution.id WHERE event.id=${id}`;
    return sql;
  }

  static getEventByStatus(id) {
    let sql = `SELECT event.id, event.name, event.image, event.start_date, event.final_date,event.start_time, event.status_event,event.description, student.name as student_name,student.description as student_description, institution.cep, institution.number, institution.name as institution_name FROM EVENTS as event LEFT JOIN STUDENTS as student on event.id_student = student.id LEFT JOIN INSTITUTIONS as institution on event.id_institution = institution.id WHERE event.status_event = ${id}`;
    return sql;
  }

  addEvent() {
    let sql = `INSERT INTO EVENTS(name, image, start_date, final_date, start_time, status_event, description, id_institution, id_student) VALUES('${this.name}','${this.image}','${this.start_date}', '${this.final_date}','${this.start_time}',${this.status_event},'${this.description}',${this.id_institution},${this.id_student})`;
    return sql;
  }

  static updateEventById(id) {
    let sql = `UPDATE EVENTS SET name='${this.name}',image='${this.image}',start_date='${this.start_date}',final_date='${this.final_date}',start_time=${this.start_time},status_event='${this.status_event}',description='${this.description}',id_institution=${this.id_institution},id_student=${this.id_student}`;
    return sql;
  }

  static removeEventById(id) {
    let sql = `DELETE FROM EVENTS WHERE id=${id}`;
    return sql;
  }

  static updateStatusEvent(id, status) {
    let sql = `UPDATE EVENTS SET status_event = ${status} WHERE id = ${id}`;
    return sql;
  }
}
export default Event;
