export function disabledEventPropagation(e) {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
}

export function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

//MERGES DEFAULT STATE WITH PROVIDER STATE
export const mergeDefaultWProvider = (base, state) => {
  const newMerge = base.map((b) => {
    const match = state?.find((s) => s.id === b.id);
    if (match) {
      const { Icon, Guide, ...s } = { Icon: {}, Guide: {}, ...match };
      return { ...b, ...s };
    } else {
      return b;
    }
  });
  return [...newMerge, ...state.filter((s) => s.isCustom)];
};

export function timeToDecimal(t) {
  var arr = t.split(":");
  var dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
}

export function convertToHHMM(info) {
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info) - hrs) * 60);
  return hrs + ":" + (min < 10 ? "0" : "") + min;
}

// export  function time_convert(num)
//  {
//   var hours = Math.floor(num / 60);
//   var minutes = (num *60)  % 60;
//   return hours + ":" + minutes;
// }

export function money_round(num) {
  return Math.ceil(num * 100) / 100;
}

export function incrementDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  date.setDate(date.getDate() + 1);
  return getFormattedDate(date);
}
export function decrementDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  date.setDate(date.getDate() - 1);
  return getFormattedDate(date);
}

export function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

export function filterGroup(group, showNumber = 4, defValue, defFun = (v) => v > 0) {
  let remainder = showNumber - group.filter((g) => defFun(g[defValue]) || g.isCustom).length;
  return group.filter((g) => {
    if (remainder > 0 && !defFun(g[defValue]) && !g.isCustom) {
      remainder--;
      return true;
    }
    return defFun(g[defValue]) || g.isCustom;
  });
}
