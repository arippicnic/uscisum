import { useState, useEffect, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { useToasts, Toast } from "@/components/Toast";
import { Loader } from "@/components/Loader";
import { SEO } from "@/components/SEO";
import styles from "@/styles/Main.module.css";

export default function Admin() {
  const [toast, setToast] = useToasts();
  const [psw, spsw] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMark, setMark] = useState("(first: ~ and last: +)");
  const [state, setState] = useState({
    title: "",
    body: "",
  });
  const onChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "body") {
      const replaceData = value
        .replace(/(?:\r\n|\r|\n)/g, "<br>")
        .replace(/[~]/g, `<span class=${styles.contentColor}>`)
        .replace(/[+]/g, `</span>`);
      setMark(replaceData);
    }
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setToast("Creating...");

    const body = JSON.stringify({
      title: state.title,
      body: state.body.replace(/(?:\r\n|\r|\n)/g, "#br"),
    });
    fetch("/api/admin/post", {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.error) return setToast(res.error);
        setToast("Created successfully");
      })
      .catch((err) => {
        console.log(err);
        setToast("Something went wrong");
      });
  };
  const onSignOut = useCallback(async () => {
    await fetch("/api/admin/signOut", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.error) {
          setToast(res.error);
          setLoading(false);
          return;
        }
        localStorage.removeItem("theme");
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        setToast("Something went wrong");
      });
  }, []);

  useEffect(() => {
    const cookie = (name) =>
      `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();
    if (cookie("ADMIN_SESSION")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <SEO author="Admin" />
      {toast ? <Toast>{toast}</Toast> : null}
      {!loggedIn && (
        <form
          className="p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setToast("Login...");
            fetch("/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "*/*",
              },
              body: JSON.stringify({
                password: psw,
              }),
            })
              .then((r) => r.json())
              .then((res) => {
                if (res.error) {
                  setToast(res.error);
                  setLoading(false);
                  return;
                }
                location.reload();
              })
              .catch((err) => {
                console.log(err);
                setToast("Something went wrong");
              });
          }}
        >
          <fieldset disabled={loading}>
            <div className="input-admin">
              <div className="col-span-6 sm:col-span-6">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={psw}
                  onChange={(e) => spsw(e.target.value)}
                  className="input-admin-input p-3 w-full focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="pt-5 text-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </div>
          </fieldset>
        </form>
      )}
      {loggedIn && (
        <div className="articel-card">
          <form onSubmit={onSubmit} className="p-6">
            <fieldset disabled={loading}>
              <div className="input-admin">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block font-medium pb-3 text-gray-500"
                  >
                    Title (formart: singer - song)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={onChange}
                    id="title"
                    className="input-admin-input p-3 w-full focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="body"
                      className="block font-medium pb-3 text-gray-500"
                    >
                      Body (first: ~ and last: +)
                    </label>
                    <TextareaAutosize
                      id="body"
                      name="body"
                      value={state.body}
                      onChange={onChange}
                      className="input-admin-input p-3 w-full focus:outline-none"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mt-9 p-3 input-admin-result">
                      <div dangerouslySetInnerHTML={{ __html: isMark }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5 flex items-center justify-between">
                <button
                  onClick={onSignOut}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  SignOut
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? <Loader /> : "Create"}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
}
