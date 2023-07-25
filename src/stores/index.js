import { writable, get, derived } from 'svelte/store';
import http from '../services/http';
import { router } from 'tinro';

function setCurrentArticlesPage() {}
function setArticles() {}
function setLoadingArticle() {}
function setArticleContent() {}
function setComments() {}
function setAuth() {
  let initValues = {
    id: '',
    email: '',
    Authorization: '', // access_token
  };

  const { subscribe, set, update } = writable({ ...initValues });

  const refresh = async () => {
    try {
      const authenticationUser = await http.post({ path: '/auth/refresh' });
      set(authenticationUser);
      isRefresh.set(true);
    } catch (err) {
      auth.resetUserInfo();
      isRefresh.set(false);
    }
  };

  const resetUserInfo = () => set({ ...initValues });

  const login = async (email, password) => {
    try {
      const options = {
        path: '/auth/login',
        data: {
          email: email,
          pwd: password,
        },
      };

      const result = await http.post(options);
      set(result);
      isRefresh.set(true);
      router.goto('/articles');
    } catch (err) {
      alert('오휴가 발생하였습니다. 로그인을 다시 시도해 주세요.');
    }
  };

  const logout = async () => {
    try {
      const options = {
        path: '/auth/logout',
      };

      await http.delete(options);
      set({ ...initValues });
      isRefresh.set(false);
      router.goto('/');
    } catch (err) {
      alert('오류가 발생하였습니다. 다시 시도해주세요');
    }
  };

  const register = async (email, password) => {
    try {
      const options = {
        path: '/auth/register',
        data: {
          email: email,
          pwd: password,
        },
      };

      await http.post(options);
      alert('가입이 완료되었습니다.');
      router.goto('/login');
    } catch (err) {
      alert('오류가 발생하였습니다. 다시 시도해주세요');
    }
  };

  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
  };
}
function setArticlesMode() {}
function setIsLogin() {
  const checkLogin = derived(auth, ($auth) => !!$auth.Authorization);
  return checkLogin;
}

export const currentArticlesPage = setCurrentArticlesPage();
export const articles = setArticles();
export const loadingArticle = setLoadingArticle();
export const articleContent = setArticleContent();
export const comments = setComments();
export const auth = setAuth();
export const articlesMode = setArticlesMode();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);
