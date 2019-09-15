const csvToJson = (data, keys, sep = ",") => {
  let res = [];
  let error = false;
  const lines = data.split("\n");

  lines.map(l => {
    const values = l.split(sep);
    let obj = {};

    error = values.length !== keys.length;

    keys.map((k, i) => {
      obj[k] = values[i];
    });
    res = [...res, obj];
  });

  return {
    data: res,
    error: error
  };
};

export default csvToJson;
