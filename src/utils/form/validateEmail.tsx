export const validateEmail = (mail: string) => {
  let isMailValidated = false;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(mail)) {
    isMailValidated = true;
  }
  return { isMailValidated };
};
