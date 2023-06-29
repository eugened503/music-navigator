import { defineStore } from "pinia";
import router from "../router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useStoreMusic } from "../stores/storeMusic";
import { useStoreAPI } from "../stores/storeAPI";
import { useStorePagination } from "../stores/storePagination";

export const useStoreUser = defineStore("storeUser", {
  state: () => {
    return {
      user: null,
      uid: null,
      accessToken: localStorage.getItem("accessToken") || null,
      loaded: false,
      errorCode: null,
    };
  },
  actions: {
    async register(details) {
      this.loaded = true;
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const authCurrentUser = auth.currentUser;
        const userUid = authCurrentUser.uid;
        const accessToken = authCurrentUser.accessToken;

        const { addCollection } = useStoreMusic();
        addCollection(userUid);

        this.user = authCurrentUser;
        this.uid = userUid;
        this.accessToken = accessToken;
        this.loaded = false;
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            this.errorCode = "Email уже используется";
            break;
          case "auth/invalid-email":
            this.errorCode = "Некорректный Email";
            break;
          case "auth/operation-not-allowed":
            this.errorCode = "Операция не разрешена";
            break;
          case "auth/weak-password":
            this.errorCode = "Ненадежный пароль";
            break;
          default:
            this.errorCode = "Что-то пошло не так...";
        }
        this.loaded = false;
      }
    },

    async login(details) {
      this.loaded = true;
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        if (!localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", auth.currentUser.accessToken);
        }
        this.user = auth.currentUser;
        this.accessToken = auth.currentUser.accessToken;
        this.loaded = false;
        router.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            this.errorCode = "Пользователь не найден";
            break;
          case "auth/wrong-password":
            this.errorCode = "Неверный пароль или логин";
            break;
          default:
            this.errorCode = "Что-то пошло не так...";
        }
        this.loaded = false;
      }
    },

    async logout() {
      await signOut(auth);
      //this.user = null;
      //this.uid = null;
      this.accessToken = null;
      localStorage.removeItem("accessToken");
      const { clearStore } = useStoreMusic();
      const { resetData } = useStoreAPI();
      const { resetStore } = useStorePagination();
      clearStore();
      resetData();
      resetStore();
      router.push("/login");
    },

    clearErrorCode() {
      this.errorCode = null;
    },

    fetchUser() {
      auth.onAuthStateChanged(async (user) => {
        //юзер вышел / юзер не зарегистрирован
        if (user === null) {
          this.user = null;
          this.uid = null;
        } else {
          //юзер зарегистрирован
          this.user = user;
          this.uid = auth.currentUser.uid;
          //для входа по логину
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
  getters: {
    getLoaded: (state) => {
      return state.loaded;
    },

    getAccessToken: (state) => {
      return state.accessToken;
    },

    getUid: (state) => {
      return state.uid;
    },

    getErrorCode: (state) => {
      return state.errorCode;
    },
  },
});
