# Бэкенд Диплома Movies Explorer API

***Дипломная работа от ["Яндекс Практикум"](https://practicum.yandex.ru/web/)***

----
## 🖌 Описание проекта:
Репозиторий для дипломной работы Movies Explorer, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями.

----
## ⛏ Функциональность: 
* Роуты для пользователей:
  + GET /users/me — возвращает информацию о пользователе
  + PATCH /users/me — обновляет информацию о пользователе
* Роуты для фильмов: 
  + GET /movies — возвращает все фильмы из базы
  + POST /movies — создаёт фильм
  + DELETE /movies/:movieId — удаляет фильм по _id 

----
## 💣 Стэк технологий:
* JavaScript:
  + Промисы (Promise)
  + Асинхронность и оптимизация
  + Rest API
* Node.js
* Express
* MongoDB
* Сelebrate
* Winston

----
## 🔮 Цель проекта:
* Взаимодействие с Express и MongoDB
* Описания схем и моделей
* Описания контроллеров и роутов
* CORS. Обработка ошибок.

----
## 📁 Директории:
* `/routes` — папка с файлами роутера  
* `/controllers` — папка с файлами контроллеров пользователя и фильмов
* `/models` — папка с файлами описания схем пользователя и фильмов
* `/errore` - папка с файлами описания ошибок

----
## 🚀 Запуск проекта:

#### Клонировать репозиторий:
```
git clone https://github.com/EkaterinaVokin/movies-explorer-api.git
```
#### Установить зависимости:

```
npm install
```
#### Запустить приложение:

```
npm run start
```
#### Запустить сервер с hot-reload:

```
npm run dev
```
----
## 🌏 Ссылки:
* IP 62.84.113.13
* ['Frontend'](https://movies.project.nomoredomains.club) or ['Frontend'](http://movies.project.nomoredomains.club)
* ['Backend'](https://api.movies.project.nomoredomains.club)
