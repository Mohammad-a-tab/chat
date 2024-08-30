import {createSlice} from "@reduxjs/toolkit";
import {faker} from "@faker-js/faker";
import {AWS_S3_REGION, S3_BUCKET_NAME} from "../../config";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      state.direct_chat.conversations = action.payload.conversations.map((el) => {
        const user = el.participants.find(
            (elm) => elm.id.toString() !== user_id
        );
        return {
          id: el.id,
          user_id: user?.id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          img: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
          msg: el.messages.slice(-1)[0].text,
          time: "9:36",
          unread: 0,
          pinned: false,
          about: user?.about,
        };
      });
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;

      const users = state.direct_chat.conversations.map(
          (el) => {
            if (el?.id !== this_conversation.id) {
              return el;
            } else {
              return this_conversation.participants.filter(
                  (elm) => elm.id.toString() !== user_id
              );
            }
          }
      );

      if (!state.direct_chat.conversations) {
        state.direct_chat.conversations = [];
      }

      for (const data of users) {
        for (const user of data) {
          const userExists = state.direct_chat.conversations.some(conversation => conversation.user_id === user?.id);

          if (!userExists) {
            const conversation = {
              id: this_conversation.id,
              user_id: user?.id,
              name: `${user?.firstName} ${user?.lastName}`,
              online: user?.status === "Online",
              img: user.avatar ? user.avatar : faker.image.avatar(),
              msg: user.bio ? user.bio : faker.music.songName(),
              time: faker.random.numeric(),
              unread: 0,
              pinned: false,
            };

            state.direct_chat.conversations.push(conversation);
          }
        }
      }
    },

    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;

      let user = {};

      user = this_conversation.participants.find(
          (elm) => elm.id.toString() !== user_id
      );
      if (user) {
        state.direct_chat.conversations = state.direct_chat.conversations.filter(
            (el) => el?.id !== this_conversation.id
        );
        state.direct_chat.conversations = [];
        state.direct_chat.conversations.push({
          id: this_conversation.id,
          user_id: user?.id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          img: user.avatar ? user.avatar : faker.image.avatar(),
          msg: user.bio ? user.bio : faker.music.songName(),
          time: faker.random.numeric(),
          unread: 0,
          pinned: false,
        });
      } else {
        state.direct_chat.conversations = [];
      }
    },

    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el.id,
        type: "msg",
        subtype: 'img',
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
};
export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };
};
export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};


export const FetchCurrentMessages = ({messages}) => {
  return async(dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({messages}));
  }
}

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({message}));
  }
}