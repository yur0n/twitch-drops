export default {
  // ra: {
  // 		action: {
  // 				edit: '',
  // 		}
  // },
  resources: {
    users: {
      name: "Client |||| Clients",
      fields: {
        phone: "Phone",
        id: "Phone",
        name: "Name",
        username: "Username",
        note: "Note",
        telegram: "Telegram",
      },
    },
    messages: {
      name: "Message |||| Messages",
      fields: {
        message: "Message",
        date: "Date",
      },
    },
  },
  server: {
    res: {
      200: "Success",
      201: "Added successfully",
      206: "Token not provided",
      207: "Error adding",
      400: "Server error",
    },
  },
  custom: {
    action: {
      create: "Create",
      createJob: "Create Job",
      showProgress: "Show Progress",
      add: "Add",
      addBots: "Add Bots",
      cancel: "Cancel",
    },
    fields: {
      chat: "Chat",
      summary: "Summary",
    },
    labels: {
      newJob: "New Job",
      addName: "Name",
      chooseGame: "Choose Game",
      noDrops: "No Active Drops",
      addNote: "Note",
      putBots: "Put bots here",
    },
  },
};
