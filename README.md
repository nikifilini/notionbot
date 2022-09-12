# Телеграм бот для создания задач в notion

.env файл:

```dotenv
NOTION_TOKEN=****************
DB_ID=***********

NOTION_STATUS_NAME=In progress
NOTION_STATUS_FIELD=Status
NOTION_NAME_FIELD=Name

TELEGRAM_TOKEN=********************
```

Айди базы получается из ссылки - `https://www.notion.so/<workspace>/<db id>?v=<useless data>`

Задача создается если тегнуть бота в реплае на сообщение, из которого нужно создать задачу
