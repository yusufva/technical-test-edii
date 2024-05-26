import axios from "axios";

export const getBiodata = async (callback, config) => {
    await axios
        .get(import.meta.env.VITE_API_URL + "biodata", config)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        });
};

export const getBiodataDetail = async (id, callback, config) => {
    await axios
        .get(import.meta.env.VITE_API_URL + "biodata/" + id, config)
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};
