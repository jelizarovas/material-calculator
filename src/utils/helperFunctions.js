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
  if (!base || state === undefined) return {};
  const newMerge = base.map((b) => {
    const match = state?.find((s) => s.id === b.id);
    if (match) {
      const { Icon, Guide, ...s } = { Icon: {}, Guide: {}, ...match };
      return { ...b, ...s };
    } else {
      return b;
    }
  });
  return [...newMerge, ...state?.filter((s) => s.isCustom)];
};

export function timeToDecimal(t) {
  if (!t) return 0;
  if (typeof t === "string") {
    var arr = t.split(":");
    var dec = parseInt((arr[1] / 6) * 10, 10);
    return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
  }
  return 0;
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
  if (!group || !Array.isArray(group)) return [];
  let remainder = showNumber - group?.filter((g) => defFun(g[defValue]) || g.isCustom).length;
  return group?.filter((g) => {
    if (remainder > 0 && !defFun(g[defValue]) && !g.isCustom) {
      remainder--;
      return true;
    }
    return defFun(g[defValue]) || g.isCustom;
  });
}

export const trimCanvas = (function () {
  function rowBlank(imageData, width, y) {
    for (var x = 0; x < width; ++x) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }

  function columnBlank(imageData, width, x, top, bottom) {
    for (var y = top; y < bottom; ++y) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }

  return function (canvas) {
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var top = 0,
      bottom = imageData.height,
      left = 0,
      right = imageData.width;

    while (top < bottom && rowBlank(imageData, width, top)) ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;

    var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    var copy = canvas.ownerDocument.createElement("canvas");
    var copyCtx = copy.getContext("2d");
    copy.width = trimmed.width;
    copy.height = trimmed.height;
    copyCtx.putImageData(trimmed, 0, 0);

    return copy;
  };
})();
