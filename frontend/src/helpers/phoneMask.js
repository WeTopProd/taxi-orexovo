const getInputNumbersValue = function (input) {
  // Return stripped input value — just numbers
  return input.value.replace(/\D/g, '');
};

export const onPhonePaste = function (e) {
  const input = e.target,
    inputNumbersValue = getInputNumbersValue(input);
  const pasted = e.clipboardData || window.clipboardData;
  if (pasted) {
    const pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
      // formatting will be in onPhoneInput handler
      input.value = inputNumbersValue;
    }
  }
};

export const onPhoneInput = function (e) {
  let input = e.target,
    inputNumbersValue = getInputNumbersValue(input),
    selectionStart = input.selectionStart,
    formattedInputValue = '';

  if (!inputNumbersValue) {
    return (input.value = '');
  }

  if (input.value.length !== selectionStart) {
    // Editing in the middle of input, not last symbol
    if (e.data && /\D/g.test(e.data)) {
      // Attempt to input non-numeric symbol
      input.value = inputNumbersValue;
    }
    return;
  }

  let firstSymbols = '+7';
  if (inputNumbersValue[0] === '9') firstSymbols = '+79';

  formattedInputValue = input.value = firstSymbols;
  if (inputNumbersValue.length > 1) {
    formattedInputValue += inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 5) {
    formattedInputValue += inputNumbersValue.substring(4, 7);
  }
  if (inputNumbersValue.length >= 8) {
    formattedInputValue += inputNumbersValue.substring(7, 9);
  }
  if (inputNumbersValue.length >= 10) {
    formattedInputValue += inputNumbersValue.substring(9, 11);
  }

  input.value = formattedInputValue;
};

export const onPhoneKeyDown = function (e) {
  // Clear input after remove last symbol
  const inputValue = e.target.value.replace(/\D/g, '');
  if (e.keyCode === 8 && inputValue.length === 1) {
    e.target.value = '';
  }
};
