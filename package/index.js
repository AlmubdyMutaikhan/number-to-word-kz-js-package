const numberToTextKZ = (value) => {
  const birlikter = {
    0: "",
    1: "бір",
    2: "екі",
    3: "үш",
    4: "төрт",
    5: "бес",
    6: "алты",
    7: "жеті",
    8: "сегіз",
    9: "тоғыз",
  };

  const ondyktar = {
    0: "",
    1: "он",
    2: "жиырма",
    3: "отыз",
    4: "қырық",
    5: "елу",
    6: "алпыс",
    7: "жетпіс",
    8: "сексен",
    9: "тоқсан",
  };

  const darezhe = {
    2: "мың",
    3: "миллион",
    4: "миллиард",
  };

  const stringifyDigit = ({ index, digit }) => {
    switch (index) {
      case 1:
        return birlikter[parseInt(digit)];
      case 2:
        return ondyktar[parseInt(digit)];
      case 3:
        return `${birlikter[parseInt(digit)]} ${
          parseInt(digit) === 0 ? " " : "жүз"
        }`;
      default:
        return "NULL";
    }
  };

  try {
    if (isNaN(parseInt(value))) {
      throw new Error(`Value is not recognized as a number: ${value}`);
    } else {
      let isNull = false;
      const price = value
        .toString()
        .split(" ")
        .filter((d) => d !== "")
        .join("");
      const len = price.length;
      const digits = [];
      let resText = "";

      for (let i = len; i >= 0; i -= 3) {
        const begin = i - 3 > 0 ? i - 3 : 0;
        const end = i;
        digits.unshift(price.slice(begin, end));
      }

      for (let j = 0; j < digits.length; j++) {
        if (digits[j] !== "") {
          const len = digits[j].length - 1;

          for (let i = len; i >= 0; i--) {
            const digit = stringifyDigit({
              index: i + 1,
              digit: digits[j][len - i],
            });

            resText += digit + " ";
          }

          if (digits.length - j > 1) {
            if (digits[j] === "000" && isNull) {
              continue;
            } else {
              isNull = true;
              resText += darezhe[digits.length - j] + " ";
            }
          }
        }
      }

      resText = resText
        .split(" ")
        .filter((d) => d !== "")
        .join(" ");

      return resText;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports = numberToTextKZ;
