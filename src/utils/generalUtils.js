// import API from "Api";
import screenResolutionConstants from "../constants/screenResolution";

/**
 * @return if user is logged in
 * @author Nikita Mahajan
 */

export function isLoggedIn() {
  // return API.getAccessTokenFromLocalStorage() !== "";
}

/**
 * @return Set protectedRoute
 * @author Nikita Mahajan
 */

export const protectedRoute = [
  "login",
  "forgot-password",
  "reset-password",
  "pharmacy-create-password",
];

export const toggleInArray = (arr, key) => {
  if (arr?.includes(key)) {
    arr = arr.filter((item) => item !== key);
  } else {
    arr.push(key);
  }
  return arr;
};

export const generateDynamicEndpoint = (url, variables) => {
  Object.keys(variables).map((i) => {
    url = url.replace(`{${i}}`, variables[i]);
  });

  return url;
};

export const getClearObject = (obj = {}) => {
  const newObj = {};
  Object.keys(obj).map((key) => {
    const item = obj[key];
    if (typeof item === "boolean") {
      newObj[key] = item;
    } else if (typeof item === "number") {
      newObj[key] = item;
    } else if (typeof item === "string") {
      if (item) {
        newObj[key] = item;
      }
    } else if (Array.isArray(item)) {
      if (item.length) {
        newObj[key] = item;
      }
    } else if (typeof item === "object") {
      // if object is type of date
      if (item instanceof Date) {
        if (!isNaN(item)) {
          newObj[key] = item;
        }
      } else if (Object?.keys(item || {})?.length) {
        newObj[key] = item;
      }
    }
  });
  return newObj;
};

export const capitalizeFirstLetter = (string) => {
  if (string === null || string === "" || string === undefined) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ucwords = (str) => {
  return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
};

export const isEmptyObject = (objectVal) => {
  return (
    Object.keys(objectVal).length === 0 && objectVal.constructor === Object
  ); // 👈 constructor check
};

export const abbreviateNumber = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const setLocalStorage = (key, value) => {
  if (typeof Storage !== "undefined") {
    let storeValue = value;
    if (value?.constructor === Object) {
      storeValue = JSON.stringify(value);
    }
    localStorage.setItem(key, storeValue);
  } else {
    // No web storage Support.
    console.warn("Local storage not supporting");
  }
};

export const getLocalStorage = (key, isObject) => {
  if (!localStorage.hasOwnProperty(key)) {
    //throw Error(`${key} not present in local storage`);
    console.warn(`${key} not present in local storage`);
  }
  let localStorageValue = localStorage.getItem(key);
  return isObject ? JSON.parse(localStorageValue) : localStorageValue;
};

/**
 * Change browser url without page refreshing
 * @param url string full url
 * @author
 * @return (bool) true/false
 */
export const changeBrowserURlWithoutPageRefresh = (url) => {
  if (url != undefined && url != "" && window.history.pushState) {
    window.history.pushState({ path: url }, "", url);
    return true;
  }
  return false;
};

/**
 * Remove the given query string from url string and return it
 *
 * @param  key string parameter name
 * @param  sourceURL string full url
 * @author
 * @return return url string
 */

export const removeParamFromQueryString = (key, sourceURL) => {
  sourceURL = sourceURL || window.location.href;
  var rtn = sourceURL.split("?")[0],
    param,
    params_arr = [],
    queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
};

/**
 * Get removed url params
 *
 * @return {object}
 * @author Nikita Mahajan
 */
export function getRemovedUrlParam(arrayOfKey) {
  let params = new URLSearchParams(window.location.search);
  for (let i = 0; i < arrayOfKey.length; i++) {
    params.delete(arrayOfKey[i]);
  }
  return Array.from(params.keys()).reduce(
    (acc, val) => ({ ...acc, [val]: params.get(val) }),
    {}
  );
}

export function showWebScreen(width) {
  width = width || screenWidth();
  return width > screenResolutionConstants.MOBILE_SCREEN_TILL.width;
}

export function screenWidth() {
  return window.screen.availWidth;
}

/** text function to substring*/
export function getEllipsisName(value, itemlength) {
  return value?.length > itemlength
    ? `${value?.substr(0, itemlength - 3)}...`
    : value;
}


export function formatNumberWithCommasAndDecimal(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// const beoormJson = {
//   "months": {
//     // ... (your provided data)
//   }
// };

export function getIGSTValuesByMonth(jsonData) {
  const months = jsonData.months;
  const igstValuesByMonth = {};
  let tempArr = []

  for (const month in months) {
    if (months.hasOwnProperty(month)) {
      const igstValue = months[month].gst.total;
      // igstValuesByMonth[month] = igstValue;
      tempArr.push(igstValue)
    }
  }

  return tempArr;
}

// const igstValuesByMonth = getIGSTValuesByMonth(beoormJson);
// console.log(igstValuesByMonth);


export function sumTwoNumber(number1, number2){
  const tempNumber1 = parseFloat(number1);
  const tempNumber2 = parseFloat(number2);
  const sum = tempNumber1 + tempNumber2;

  return sum;
}



export function getIGSTTableValuesByMonth(jsonData2B, jsonData3B) {
  const months2B = jsonData2B.months;
  const months3B = jsonData3B.months;
  const igstValuesByMonth = {};
  let tempArr = []
  let tempMonthSum = parseFloat(0);
  let igstSum = parseFloat(0);
  let cgstSum = parseFloat(0);
  let sgstSum = parseFloat(0);
  let cessSum = parseFloat(0);

  for (const month2B in months2B) {
    if (months2B.hasOwnProperty(month2B)) {
      const igstValue2B = months2B[month2B].gst;
      const igstValue3B = months3B[month2B].gst;
      tempMonthSum += parseFloat(divisionTwoNumber(igstValue2B.total, igstValue3B.total));
      igstSum += parseFloat(divisionTwoNumber(igstValue2B.igst, igstValue3B.igst));
      cgstSum += parseFloat(divisionTwoNumber(igstValue2B.cgst, igstValue3B.cgst));
      sgstSum += parseFloat(divisionTwoNumber(igstValue2B.sgst, igstValue3B.sgst));
      cessSum += parseFloat(divisionTwoNumber(igstValue2B.cess, igstValue3B.cess));
      // igstValuesByMonth[month] = igstValue;
      tempArr.push({month: month2B, igstValue2B: igstValue2B, igstValue3B:igstValue3B, totalClaimed: tempMonthSum.toFixed(2), igstSum: igstSum.toFixed(2), cgstSum: cgstSum.toFixed(2), sgstSum: sgstSum.toFixed(2), cessSum: cessSum.toFixed(2)});
    }
  }

  return tempArr;
}


/** get month name*/
export function getMonthYear(value) {
  let tempMonth = value.substring(4, 6);
  let getMonthName = {'01': "Jan", '02': "Feb", '03': "mar", '04': "Apr", '05': "May", '06': "jun", '07': "Jul", '08': "Aug", '09': "Sep", '10': "Oct", '11': "Nov", '12': "Dec" } 
  return value.substring(0,4) +"-"+ getMonthName[tempMonth];
}

export function divisionTwoNumber(number1, number2){
  const tempNumber1 = parseFloat(number1);
  const tempNumber2 = parseFloat(number2);
  const sum = tempNumber1 - tempNumber2;

  return sum.toFixed(2);
}