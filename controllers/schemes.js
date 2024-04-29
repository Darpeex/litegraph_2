const db = require('../db'); // файл с подключением к БД

class SchemeController {
  // возвращает все схемы
  async getSchemes(req, res) {
    // SQL-запрос: все схемы из таблицы scheme
    const schemes = await db.query('SELECT * FROM scheme');
    res.json(schemes.rows);
  }

  // переименовывает схему
  async renameScheme(req, res) {
    const { _id, schemename } = req.body;
    // SQL-запрос: обновляем scheme - таблица, schemename - поля, $1, $2 - значения из массива, RETURNING * - возвращает измененного пользователя
    const scheme = await db.query('UPDATE scheme set schemename = $1 where _id = $2 RETURNING *', [schemename, _id]);
    res.json(scheme.rows[0]);
  }

  // добавляет схему в БД
  async createScheme(req, res) {
    const { schemeJSON, schemeName } = req.body; // данные из тела запроса
    // SQL-запрос: scheme - таблица, (schemeJSON, schemeName) - поля, ($1, $2) - значения из массива [schemeJSON, schemeName]
    const newScheme = await db.query(`INSERT INTO scheme (schemeJSON, schemeName) values ($1, $2) RETURNING *`, [
      schemeJSON,
      schemeName,
    ]);
    res.json(newScheme.rows[0]);
  }

  // удаляет схему по идентификатору
  async deleteScheme(req, res) {
    const { _id } = req.params;
    const scheme = await db.query('DELETE FROM scheme where _id = $1', [_id]);
    res.json(scheme.rows);
  }
}

module.exports = new SchemeController();
