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
      userLoaded: false,
      loginLoaded: false,
    };
  },
  actions: {
    async register(details) {
      this.userLoaded = false;
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }

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
      this.userLoaded = true;

      localStorage.setItem("accessToken", accessToken);

      router.push("/");
    },

    async login(details) {
      this.loginLoaded = true;
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      if (!localStorage.getItem("accessToken")) {
        localStorage.setItem("accessToken", auth.currentUser.accessToken);
      }
      this.user = auth.currentUser;
      this.accessToken = auth.currentUser.accessToken;
      this.loginLoaded = false;
      router.push("/");
    },

    async logout() {
      await signOut(auth);
      this.user = null;
      this.uid = null;
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
    getLoginLoaded: (state) => {
      return state.loginLoaded;
    },
    getAccessToken: (state) => {
      return state.accessToken;
    },
  },
});
