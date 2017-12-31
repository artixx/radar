# RADAR

Сканирует двач по запросу и возвращает отформатированные данные.

# МЕТОДЫ

* `GET /:имя_доски/threads` - возвращает все треды c доски
* `GET /:имя_доски/threads-light` - облегчённый вариант предыдущей комманды,
возвращает последние 33 треда, делает это быстро
* `GET /:имя_доски/threads/:номер_треда` - возвращает выбранный тред подробно со всеми постами

# ФОРМАТЫ ОТВЕТА
Тред:

    id: number,
    postsCount: number,
    dislikes: number,
    likes: number,
    timestamp: number,
    subject: string,
    comment: string,
    files: array,

Пост:

    id: number,
    dislikes: number,
    likes: number,
    timestamp: number,
    subject: string,
    comment: string,
    files: array,

Файл

    path: string,
    name: string,
    md5: string,
    type: number,

# АВТОРИЗАЦИЯ

Хедер `Authorization` с токеном. 
Задаётся в конфиге. Если не указан - не проверяется.


# КОНФИГУРАЦИЯ

* `port: 3000` - порт
* `token: null` - токен для авторизации

```
Файл конфигурации: `app/config/environment/config.json`. Изначально его нет,
папка и файл создаются автоматически при старте программы или при запуске
скрипта `npm run config`.

Дефолтные значения находятся в `app/config/default.json`. Если в `config.json` 
не указано какое-либо значение используется дефолтное из `default.json`.

Если при старте программы указана `NODE_ENV`, то из `environment` берётся конфиг
`${NODE_ENV}.json`. Если его там нет, возникает ошибка.
```
