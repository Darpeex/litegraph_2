// Класс взаимодействия с нашим сервером
class MainApi {
  #url;
  #headers;

  constructor(data) {
    this.#url = data.url; // ссылка на запрос к серверу
    this.#headers = {
      ...data.headers,
    };
  }

  // Проверка статуса запроса
  #handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Возвращает все сохранённые схемы
  getSchemes() {
    // по умолчанию метод get
    return fetch(`${this.#url}/schemes`, {
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  // Открытие выбранной схемы
  openScheme(data) {
    return fetch(`${this.#url}/schemes`, {
      headers: this.#headers,
      body: JSON.stringify(data),
    }).then(this.#handleResponse);
  }

  // Сохранение схемы
  saveScheme(data) {
    return fetch(`${this.#url}/schemes`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(data),
    }).then(this.#handleResponse);
  }

  // Удаление схемы
  deleteScheme(id) {
    return fetch(`${this.#url}/schemes/${id}`, {
      method: 'DELETE',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }
}

export default MainApi;

// Класс MainApi, отвечающий за запросы к серверу
export const mainApi = new MainApi({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
