import io from "socket.io-client";
import { API_BASE_URL } from "../utils/constants";

const socket = io("http://localhost:5000");

export default socket;
