export const title = "Sara";
export const subtitle = '無密碼式身份認證系統';

export const isSaraEnabled = false;
export const onClickSara = () => {
  const {
    VITE_SARA_INTE_HOST: saraInteHost,
  } = import.meta.env;
  location.assign(saraInteHost);
};

export const menuItems = [];
