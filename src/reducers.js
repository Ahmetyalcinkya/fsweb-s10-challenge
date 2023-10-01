import { NOT_EKLE, NOT_SIL, FETCH_LOADING, FETCH_ERROR } from "./actions";
const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  loading: true,
  error: "",
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

const reducer = (
  state = baslangicNotlariniGetir(s10chLocalStorageKey),
  action
) => {
  switch (action.type) {
    case NOT_EKLE:
      const newNoteState = {
        ...state,
        notlar: [...state.notlar, action.payload],
        loading: false,
        error: "",
      };
      localStorageStateYaz(s10chLocalStorageKey, newNoteState);
      return newNoteState;
    case NOT_SIL:
      const deletedNoteState = {
        ...state,
        notlar: state.notlar.filter((note) => note.id !== action.payload),
        loading: false,
        error: "",
      };
      localStorageStateYaz(s10chLocalStorageKey, deletedNoteState);
      return deletedNoteState;

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
