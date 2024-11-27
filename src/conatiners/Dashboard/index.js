import { useEffect, useRef, useState } from "react";
import { collection } from "firebase/firestore";
import { doc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { ref, set, update } from "firebase/database";

const Dashboard = (props) => {
  const { authData, db, rdb } = props;

  const nameInputRef = useRef();
  const copyInputRef = useRef();

  const [json, setJson] = useState("{}");
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
        setApis(list);
        if (name && copyInputRef?.current?.focus) {
          copyInputRef?.current?.focus();
        }
      }
    } catch (e) {
      console.log(e, e.message);
    }
  };

  const checkJSONSize = (obj) => {
    const size = new TextEncoder().encode(JSON.stringify(obj)).length;
    const kiloBytes = size / 1024;
    if (kiloBytes > 50) {
      return false;
    }
    return true;
  };

  const onCreateProject = async () => {
    try {
      const updatedJson = JSON.parse(JSON.stringify(eval("(" + json + ")")));
      if (isValidJSON(updatedJson)) {
        if (!checkJSONSize(updatedJson)) {
          alert(
            "Error! \n We are only allowing JSON size less than 50kb per api."
          );
        } else {
          let names = apis.map((_) => _.name);
          if (!names.includes(name)) {
            if (names?.length + 1 > 20) {
              alert("Sorry, we are only allowing 20 API per individual.");
            } else {
              const response = await set(
                ref(rdb, `${authData?.uid}/api/${name}`),
                updatedJson
              );
              await setDoc(doc(db, "users", authData?.uid, "projects", name), {
                name,
                url:
                  "https://json-dump-fd6aa-default-rtdb.firebaseio.com/" +
                  `${authData?.uid}/api/${name}.json`,
              });
              setSelectedApi({
                name,
                url:
                  "https://json-dump-fd6aa-default-rtdb.firebaseio.com/" +
                  `${authData?.uid}/api/${name}.json`,
              });
            }
          } else {
            const response = await update(
              ref(rdb, `${authData?.uid}/api/${name}`),
              updatedJson
            );
            await updateDoc(doc(db, "users", authData?.uid, "projects", name), {
              name,
              url:
                "https://json-dump-fd6aa-default-rtdb.firebaseio.com/" +
                `${authData?.uid}/api/${name}.json`,
            });
            setSelectedApi({
              name,
              url:
                "https://json-dump-fd6aa-default-rtdb.firebaseio.com/" +
                `${authData?.uid}/api/${name}.json`,
            });
          }
          onFetchAPIs();
        }
      } else {
        alert(
          "Invalid JSON Format! \n Currently we are only accepting valid JSON and editing the JSON not supported."
        );
      }
    } catch (e) {
      alert(
        "Invalid JSON Format! \n Currently we are only accepting valid JSON and editing the JSON not supported."
      );
      console.log(e, e.message);
    }
  };

  const isValidJSON = (text) => {
    try {
      JSON.stringify(text);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  };

  const onFetchJSON = async (api) => {
    try {
      const response = await fetch(api.url);
      if (!response.ok) {
        alert("Someting went wrong!");
      }
      const jsonObj = await response.json();
      setName(api.name);
      setSelectedApi(api);
      setJson(JSON.stringify(jsonObj));
    } catch (e) {
      alert("Someting went wrong!");
    }
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(selectedApi?.url);
  };

  return (
    <div className=" flex pl-4 pr-4 pt-20 pb-20 md:pl-20 md:pr-20 md:pt-32 md:pb-4  flex-col">
      <span className="md:text-2xl font-medium text-lg ">
        Howdy! <span className="text-red">{authData?.displayName}</span>
      </span>
      <div className="md:grid mt-10 md:grid-cols-5 md:grid-flow-row md:gap-4 w-full">
        <div className="md:col-span-1 h-64 p-2 border-borderGrey border rounded-lg">
          <div className="flex-row flex items-center justify-between">
            <span className="text-md font-semibold">API LIST</span>
            <span
              onClick={() => {
                if (nameInputRef?.current?.focus) {
                  nameInputRef?.current?.focus();
                }
                setSelectedApi({});
                setName("");
                setJson("{}");
              }}
              className="text-md text-red cursor-pointer font-semibold"
            >
              &#10010; ADD
            </span>
          </div>
          <div className="flex h-52 overscroll-x-auto overflow-auto flex-col">
            {apis?.length ? (
              apis.map((api, apiKey) => (
                <span
                  onClick={() => onFetchJSON(api)}
                  key={apiKey}
                  className={`text-sm hover:bg-lightRed hover:text-red cursor-pointer mt-1 p-1 rounded-sm ${
                    selectedApi?.name == api.name
                      ? "text-red font-semibold bg-lightRed"
                      : "text-black"
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
        <div className="md:col-span-4">
          <div className="md:mt-0 mt-8 grid grid-cols-9 grid-glow-row gap-1 w-full">
            <input
              ref={nameInputRef}
              placeholder="API Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="md:col-span-8 col-span-6 border-borderGrey border rounded-lg p-1 outline-outlineRed"
            />
            <button
              onClick={onCreateProject}
              className="justify-center flex flex-row md:col-span-1 col-span-3 group hover:bg-red bg-white border border-borderRed md:pb-2 md:pt-2 md:pl-2 md:pr-2 pb-1 pt-1 pl-1 pr-1 rounded-lg flex flex-row item-center"
            >
              <span className="text-md text-red group-hover:text-white text-center">
                Send &#10148;
              </span>
            </button>
          </div>
          <textarea
            className="w-full mt-2 h-56 border-borderGrey border rounded-lg p-1 outline-outlineRed"
            placeholder="Enter Valid JSON"
            onChange={(e) => setJson(e.target.value)}
            value={json}
          ></textarea>
          <div className="grid grid-cols-12 grid-flow-row gap-1">
            <span className="md:col-span-1 col-span-2 text-lg">URL :</span>
            <input
              ref={copyInputRef}
              placeholder="Enter API Name & JSON above then hit send to get output URL"
              value={selectedApi.url}
              onChange={(e) => {}}
              className="md:col-span-10 col-span-7 border-borderGrey border rounded-lg p-1 outline-outlineRed"
            />
            <button
              onClick={onCopy}
              className="flex flex-row justify-center md:col-span-1 col-span-3 group hover:bg-red text-center bg-white border border-borderRed md:pb-1 md:pt-1 md:pl-1 md:pr-1 pb-1 pt-1 pl-2 pr-2 rounded-lg flex flex-row item-center"
            >
              <span className="text-md text-red group-hover:text-white ">
                Copy
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
