import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const FETCH_LOADING = "Yükleniyor";
export const FETCH_ERROR = "Error bildiriyor.";

export function notEkle(not) {
  toast.success("Başarıyla eklendi.");
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  toast.success("Başarıyla silindi.");
  return { type: NOT_SIL, payload: notId };
}

export function fetchLoading() {
  toast.info("İşlem gerçekleştiriliyor...");
  return { type: FETCH_LOADING };
}
export const fetchError = (message) => {
  return { type: FETCH_LOADING, payload: message };
};

export const notEkleAPI = (yeniNot) => (dispatch) => {
  dispatch(fetchLoading());
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEkle(res.data.json));

        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchError(error.response.message));
    });
};

export const notSilAPI = (id) => (dispatch) => {
  dispatch(fetchLoading());
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(res.data.data));
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchError(error.response.message));
    });
};
