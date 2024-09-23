import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  user: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    loadMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    sendMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    appendMessage(state, action: PayloadAction<Message>) {
      // Append a new message without replacing the entire list
      state.messages.push(action.payload);
    },
  },
});

export const { loadMessages, sendMessage, appendMessage } = chatSlice.actions;

export default chatSlice.reducer;
