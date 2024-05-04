export default {
  // ra: {
  // 		action: {
  // 				edit: '',
  // 		}
  // },
  resources: {
    users: {
      name: "Клиент |||| Клиенты",
      fields: {
        phone: "Телефон",
        id: "Телефон",
        name: "Имя",
        username: "Пользователь",
        note: "Примечание",
        telegram: "Телеграм",
      },
    },
    messages: {
      name: "Сообщение |||| Сообщения",
      fields: {
        userId: "Клиент",
        message: "Сообщение",
        date: "Дата",
      },
    },
  },
  server: {
    res: {
      201: "Сообщение отправлено",
      207: "Сообщения были отправлены не всем клиентам",
      400: "Ошибка отправки сообщения",
    },
  },
  custom: {
    action: {
      add: "Добавить",
      addBots: "Добавить Ботов",
      assignBots: "Назначит работу",
      sendMessage: "Отправить сообщение",
      bulkSendMessage: "Отправить всем",
      send: "Отправить",
      cancel: "Отмена",
    },
    fields: {
      chat: "Чат",
      summary: "Сводка",
    },
    labels: {
      putBots: "Вставьте ботов сюда",
      message: "Cообщение",
      writeMessage: "Напишите сообщение",
    },
  },
};
