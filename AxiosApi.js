import axios from "axios";
import * as Carousel from "./Carousel.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");

axios.defaults.headers.common["x-api-key"] =
  "live_VDabjFusTD4Vv1FD1OZPEGCmdvaU23Ec9ULu8tI3vo3NH5M3SUlV7kB4CYcJwjhS";
