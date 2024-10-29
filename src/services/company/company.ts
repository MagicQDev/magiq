import axios from "axios";
export const getCompanyByOwnerId = async (ownerId: number) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/company/${ownerId}`);
    if (res.status !== 200) {
      return [];
    } else {
      const companies = res.data.data as [];
      return companies;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};
