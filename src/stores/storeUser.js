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
      //userLoaded: false,
      loaded: false,
    };
  },
  actions: {
    async register(details) {
      //this.userLoaded = false;
      this.loaded = true;
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email уже используется");
            break;
          case "auth/invalid-email":
            alert("Некорректный Email");
            break;
          case "auth/operation-not-allowed":
            alert("Операция не разрешена");
            break;
          case "auth/weak-password":
            alert("Ненадежный пароль");
            break;
          default:
            alert("Что-то пошло не так...");
        }
        this.loaded = false;

        return;
      }

      const authCurrentUser = auth.currentUser;
      const userUid = authCurrentUser.uid;
      const accessToken = authCurrentUser.accessToken;

      const { addCollection } = useStoreMusic();
      addCollection(userUid);

      this.user = authCurrentUser;
      this.uid = userUid;
      this.accessToken = accessToken;
      //this.userLoaded = true;
      this.loaded = false;
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    },

    async login(details) {
      this.loaded = true;
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Пользователь не найден");
            break;
          case "auth/wrong-password":
            alert("Неверный пароль или логин");
            break;
          default:
            alert("Что-то пошло не так...");
        }
        this.loaded = false;
        return;
      }

      if (!localStorage.getItem("accessToken")) {
        localStorage.setItem("accessToken", auth.currentUser.accessToken);
      }
      this.user = auth.currentUser;
      this.accessToken = auth.currentUser.accessToken;
      this.loaded = false;
      router.push("/");
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

    fetchUser() {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          this.user = null;
          this.uid = null;
        } else {
          this.user = user;
          this.uid = auth.currentUser.uid;
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
  },
});
