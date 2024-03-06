import { writable } from "svelte/store";
import Tasks from "./Tasks.js"
import {sha3, aes, unaes} from "./crypto_util.js";
import { sendApiRequest } from "./api.js";

export const needLogin = writable(false);
export const message = writable("logging in...")
export const isLoggedIn = writable(false);
export let loginData = JSON.parse(localStorage.getItem("logindata"));
let session = "";
let dataChanged = false;
let data = {};
let saveTimeout;

export async function login() {
    message.set("logging in...");
    if(!loginData) {
        announceFail("login required");
        return;
    }
    let response = await sendApiRequest({
        user: sha3(loginData.user),
        pass: sha3(loginData.pass),
        action: "new_session",
    });
    if(response.error) {
        if(response.error="wrong_data")
            announceFail("wrong password");
        else
            announceFail("server error");
        return;
    }
    session = response.session;
    data = unaes(response.data, loginData.pass);
    Tasks.set(data.tasks || []);
    dataChanged = false;
    needLogin.set(false);
    isLoggedIn.set(true);
    clearTimeout(saveTimeout);
    saveData();
}

export function setLoginData(newData) {
    loginData = newData;
}

Tasks.subscribe(newTasks => {
    dataChanged = true;
    data.tasks = newTasks;
    console.log("registered changes")
});

async function saveData() {
    if(dataChanged && session) {
        let response = await sendApiRequest({
            action: "update",
            user: sha3(loginData.user),
            pass: sha3(loginData.pass),
            session,
            data: aes(data, loginData.pass),
        })
        if(response.error) {
            announceFail("disconnected because of login on another device - please, refresh the page", false);
            return;
        }
        console.log("saved");
        dataChanged = false;
    }
    saveTimeout = setTimeout(saveData, 1000);
}

function announceFail(message_, need_login_=true) {
    console.log("login failed: ", message_);
    session = "";
    needLogin.set(need_login_);
    isLoggedIn.set(false);
    message.set(message_);
}