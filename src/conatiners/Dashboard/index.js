import { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { doc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { ref, set, update } from "firebase/database";

import "./index.css";

const Dashboard = (props) => {
  const { authData, db, rdb } = props;

  const [json, setJson] = useState();
  const [apis, setApis] = useState([]);
  const [name, setName] = useState("");
  const [selectedApi, setSelectedApi] = useState({});

  useEffect(() => {
    onFetchAPIs();
  }, []);

  const onFetchAPIs = async () => {
    try {
      const response = await getDocs(
        collection(db, "users", authData?.uid, "projects")
      );
      if (response.size) {
        let list = [];

        response.forEach((d) => {
          list = [...list, d.data()];
        });
        console.log(list);
        setApis(list);
      }
    } catch (e) {
      console.log(e, e.message);
    }
  };

  const onCreateProject = async () => {
    try {
      if (!apis.map((_) => _.name).includes(name)) {
        console.log(json, name);

        const response = await set(
          ref(rdb, `${authData?.uid}/api/${name}`),
          json
        );
        console.log(response);
        await setDoc(doc(db, "users", authData?.uid, "projects", name), {
          name,
          url:
            "https://json-dump-fd6aa-default-rtdb.firebaseio.com/" +
            `${authData?.uid}/api/${name}`,
        });
      } else {
        const response = await update(
          ref(rdb, `${authData?.uid}/api/${name}`),
          json
        );
        console.log(response);
        await updateDoc(doc(db, "users", authData?.uid, "projects", name), {
          name,
          url:
            "https://json-dump-fd6aa-default-rtdb.firebaseio.com/" +
            `${authData?.uid}/api/${name}`,
        });
      }
      onFetchAPIs();
    } catch (e) {
      console.log(e, e.message);
    }
  };

  const isValidJSON = (text) => {
    try {
      JSON.parse(text);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  };

  return (
    <div className="dashboard">
      <span className="subHeading">
        Howdy! <span className="redText">{authData?.displayName}</span>
      </span>
      <div className="apis">
        <div className="apiList column">
          <div className="row jcsb">
            <span className="text bold">API LIST</span>
            <span
              onClick={() => {
                setSelectedApi({});
                setName("");
                setJson();
              }}
              className="iconPlus bold cp"
            >
              &#10010; ADD
            </span>
          </div>
          <div className="column">
            {apis?.length ? (
              apis.map((api, apiKey) => (
                <span
                  onClick={() => {
                    setName(api.name);
                    setSelectedApi(api);
                    setJson({
                      id: 1,
                      name: "Sahil",
                      age: 28,
                    });
                  }}
                  key={apiKey}
                  className={`apiItem text mt5 cp ${
                    selectedApi?.name == api.name ? "selected" : null
                  }`}
                >
                  {api.name}
                </span>
              ))
            ) : (
              <span className="tac nodata">No API found</span>
            )}
          </div>
        </div>
        <div className="apiData column">
          <div className="row jcsb">
            <input
              placeholder="API Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <button onClick={onCreateProject} className="cta cp">
              <span className="iconSend">&#10148;</span>
            </button>
          </div>
          <textarea
            placeholder="Enter Valid JSON"
            onChange={(e) => {
              console.log(e.target.value);
              if (!e.target.value) {
                setJson("");
              } else if (isValidJSON(e.target.value)) {
                setJson(JSON.parse(e.target.value));
              } else {
                // alert(
                //   "Invalid JSON Format! \n Currently we are only accepting valid JSON and editing the JSON not supported."
                // );
              }
            }}
            value={
              isValidJSON(json) ? JSON.stringify(json, undefined, 2) : json
            }
          ></textarea>
          <span className="text">
            URL : https://json-dump-fd6aa-default-rtdb.firebaseio.com/
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
