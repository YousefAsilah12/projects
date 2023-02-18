export const getUser = () => {
  let data;

  data = JSON.parse(localStorage.getItem('user'));
  if (data) {
    return data;
  }
  return false
}