import axios from "axios";

const verifyLogin = async () => {
  const token = localStorage.getItem("tokenApi");

  if (token == null || token == undefined || token == "") {
    return false;
  }

  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/users/tokenverify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export { verifyLogin };
