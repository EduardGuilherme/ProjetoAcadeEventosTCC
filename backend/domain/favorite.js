class Favorite {
    constructor(id_user, id_event) {
        this.id_user = id_user;
        this.id_event = id_event;
    }

    //event.id, event.name, event.image, event.start_date, event.final_date,event.start_time, event.status_event,event.description,
    //student.name as student_name, institution.cep, institution.name as institution_name
    static getAllFavoritesById(user_id) {
        let sql = `SELECT favorite.id_user, favorite.id_event, event.id, event.name, event.image, event.start_date, event.id_institution, institution.cep, institution.name as institution_name FROM FAVORITES as favorite LEFT JOIN EVENTS as event on favorite.id_event = event.id LEFT JOIN INSTITUTIONS as institution on event.id_institution = institution.id WHERE id_user=${user_id}`
        return sql;
    }

    addFavorite() {
        let sql = `INSERT INTO FAVORITES(id_user, id_event) VALUES(${this.id_user}, ${this.id_event})`
        return sql;
    }
}
export default Favorite;