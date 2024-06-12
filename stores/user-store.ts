import { createStore } from 'zustand/vanilla';

export type UserState = {
  nickname: string;
  email: string;
  contact_email: string;
  image_url: string;
};

export type UserActions = {
  updateUserInfo: (
    nickname: string,
    contact_email: string,
    email: string,
    image_url: string,
  ) => void;
  updateNickName: (nickname: string) => void;
  updateEmail: (email: string) => void;
  updateContactEmail: (contact_email: string) => void;
  updateImageURL: (image_url: string) => void;
};

export type UserStore = UserState & UserActions;

export const initCounterStore = (): UserState => {
  return { contact_email: '', email: '', nickname: '', image_url: '' };
};

export const defaultInitState: UserState = {
  nickname: '',
  email: '',
  contact_email: '',
  image_url: '',
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,

    updateUserInfo: (nickname, contact_email, email, image_url) =>
      set(() => ({
        contact_email: contact_email,
        email: email,
        nickname: nickname,
        image_url: image_url,
      })),

    updateNickName: (nickname) => set((state) => ({ ...state, nickname: nickname })),

    updateContactEmail: (contact_email) =>
      set((state) => ({ ...state, contact_email: contact_email })),

    updateEmail: (email) => set((state) => ({ ...state, email: email })),

    updateImageURL: (image_url) => set((state) => ({ ...state, image_url: image_url })),
  }));
};